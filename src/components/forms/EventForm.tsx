"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { editEvent, editMasjid, setEvent, setMasjid } from "@/api";
import { randString } from "@/utils/helper";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import { IReduxSlice } from "@/redux/types";
import DatePicker from "../DatePicker";
import dayjs from "dayjs";

const schema = z.object({
  photo: z
    .union([
      z.string().min(1, { message: "Photo URL is required!" }), // URL for photo
      z.instanceof(File, { message: "Photo must be a valid file!" }), // File for upload
    ])
    .optional(),
  masjidId: z.string().min(1, { message: "Masjid id is required" }),
  eventDate: z
    .string()
    .length(10, { message: "Invalid Time, use format HH:mm:ss" }),
  eventLocation: z.string().min(1, { message: "Event location is required!" }),
  eventDescription: z
    .string()
    .min(1, { message: "Event description is required!" }),
  eventCost: z.union([
    z.number().min(1, { message: "Event cost is required!" }),
    z.string().min(1, { message: "Event cost is required!" }),
  ]),
  registerationLink: z
    .string()
    .url({ message: "Registration link must be a valid URL!" })
    .optional(),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
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
  const masjids = useSelector((state: IReduxSlice) => state.masjid.data);
  useEffect(() => {
    if (data?.id) {
      setValue("masjidId", data?.masjid?.id?.toString());
      setValue("eventDate", data?.eventDate);
    }
  }, []);

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
    if (gData?.id) {
      let newData = { ...data, id: gData.id };
      //@ts-ignore
      editEvent(newData, photoType ? "multipart/form-data" : "application/json")
        .then((res) => {
          console.log("🚀 ~ editEvent ~ res:", res);
          onClose?.();
        })
        .catch((err) => {
          console.log("🚀 ~ editEvent ~ err:", err);
        });
    } else {
      var formData = new FormData();
      Object.entries(data).forEach(([key, value]: any) =>
        formData.append(key, value)
      );
      setEvent(formData)
        .then((res) => {
          console.log("🚀 ~ setEvent ~ res:", res);
          onClose?.();
        })
        .catch((err) => {
          console.log("🚀 ~ setEvent ~ err:", err);
        });
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type.toUpperCase()} Masjid</h1>
      <span className="text-xs text-gray-400 font-medium">Select Masjid</span>
      <div className="flex justify-between flex-wrap gap-4">
        <Dropdown
          disabled={type === "update"}
          label="Masjid"
          name="masjidId"
          defaultValue={data?.masjid?.name}
          options={masjids}
          register={register}
          error={errors.masjidId}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Event Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <DatePicker
          // disabled={type === "update"}
          label="Date"
          onChange={(time, dateString) => {
            console.log("🚀 ~ dateString:", dateString);
            //@ts-ignore
            setValue("eventDate", dateString);
          }}
          placeholder="Event Date"
          defaultValue={data?.eventDate && dayjs(data?.eventDate, "YYYY-MM-DD")}
          defaultOpenValue={
            data?.eventDate && dayjs(data?.eventDate, "YYYY-MM-DD")
          }
          // defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          error={errors.eventDate}
        />
        <InputField
          label="Description"
          name="eventDescription"
          defaultValue={data?.eventDescription}
          register={register}
          error={errors?.eventDescription}
        />
        <InputField
          label="Location"
          name="eventLocation"
          defaultValue={data?.eventLocation}
          register={register}
          error={errors?.eventLocation}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Cost"
          name="eventCost"
          defaultValue={data?.eventCost}
          register={register}
          error={errors?.eventCost}
        />
        <InputField
          label="Registration Link"
          name="registerationLink"
          defaultValue={data?.registerationLink}
          register={register}
          error={errors.registerationLink}
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

export default EventForm;
