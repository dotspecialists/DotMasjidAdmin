"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { editMasjid, setMasjid } from "@/api";
import { randString } from "@/utils/helper";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  website: z.string(),
  city: z.string().min(1, { message: "City is required!" }),
  state: z.string().min(1, { message: "State is required!" }),
  timezone: z.string().min(1, { message: "Timezone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  photo: z
    .union([
      z.instanceof(File, { message: "Photo must be a valid file!" }),
      z.string().min(1, { message: "Photo URL is required!" }), // For existing photos as a string
    ])
    .nullable(),
});

type Inputs = z.infer<typeof schema>;

const MasjidForm = ({
  type,
  onClose,
  data,
}: {
  type: "create" | "update";
  onClose?: VoidFunction;
  data?: any;
}) => {
  const gData = data;
  const [img, setImg] = useState<any>(null);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (typeof gData?.photo === "string") {
      setValue("photo", gData?.photo);
      let fileName = gData.photo.split("/");
      let name = fileName[fileName?.length - 1];
      setImg({
        name,
      });
    }
  }, [gData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log("🚀 ~ handleFileChange ~ file:", file);
    if (file) {
      setValue("photo", file); // Manually set the file value
      setImg(file);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    let photoType = data.photo instanceof File;
    if (gData?.masjidId) {
      let newData = { ...data, masjidId: gData.masjidId };

      editMasjid(
        newData,
        photoType ? "multipart/form-data" : "application/json"
      )
        .then((res) => {
          console.log("🚀 ~ editMasjid ~ res:", res);
          onClose?.();
        })
        .catch((err) => {
          console.log("🚀 ~ editMasjid ~ err:", err);
        });
    } else {
      var formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) =>
        formData.append(key, value)
      );
      formData.append("masjidId", randString(10));
      setMasjid(formData)
        .then((res) => {
          console.log("🚀 ~ setMasjid ~ res:", res);
          onClose?.();
        })
        .catch((err) => {
          console.log("🚀 ~ setMasjid ~ err:", err);
        });
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type.toUpperCase()} Masjid</h1>
      <span className="text-xs text-gray-400 font-medium">
        Masjid Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Website"
          name="website"
          defaultValue={data?.website}
          register={register}
          error={errors?.website}
        />
        <InputField
          label="City"
          name="city"
          // type="password"
          defaultValue={data?.city}
          register={register}
          error={errors?.city}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="State"
          name="state"
          defaultValue={data?.state}
          register={register}
          error={errors.state}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Timezone"
          name="timezone"
          defaultValue={data?.timezone}
          register={register}
          error={errors.timezone}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="photo"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>{img?.name || "Upload Masjid photo"} </span>
          </label>
          <input
            type="file"
            id="photo"
            {...register("photo")}
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.photo?.message && (
            <p className="text-xs text-red-400">
              {errors.photo.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default MasjidForm;
