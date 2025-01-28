"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import {
  editEvent,
  editMasjid,
  editProgram,
  setEvent,
  setMasjid,
  setProgram,
} from "@/api";
import { randString } from "@/utils/helper";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import { IReduxSlice } from "@/redux/types";
import DatePicker from "../DatePicker";
import dayjs from "dayjs";
import Checkbox from "../Checkbox";

const weekDaysSchema = z.object({
  monday: z.boolean().default(false),
  tuesday: z.boolean().default(false),
  wednesday: z.boolean().default(false),
  thursday: z.boolean().default(false),
  friday: z.boolean().default(false),
  saturday: z.boolean().default(false),
  sunday: z.boolean().default(false),
});

const schema = weekDaysSchema.extend({
  photo: z
    .union([
      z.string().min(1, { message: "Photo URL is required!" }), // URL for photo
      z.instanceof(File, { message: "Photo must be a valid file!" }), // File for upload
    ])
    .optional(),
  masjidId: z.string().min(1, { message: "Masjid id is required" }),
  name: z.string().min(1, { message: "Name is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  linkUrl: z
    .string()
    .url({ message: "Link URL must be a valid URL!" })
    .min(1, { message: "Link URL is required!" }),
  startDate: z
    .string()
    .length(10, { message: "Invalid Date, use format YYYY-MM-DD" }),
  endDate: z
    .string()
    .length(10, { message: "Invalid Date, use format YYYY-MM-DD" }),
});

type Inputs = z.infer<typeof schema>;

const ProgramForm = ({
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
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  useEffect(() => {
    if (data?.id) {
      console.log("🚀 ~ useEffect ~ data?.schedule:", data?.schedule);
      setValue("masjidId", data?.masjid?.id?.toString());
      setValue("startDate", data?.startDate);
      setValue("endDate", data?.endDate);
      setValue("monday", data?.schedule?.monday);
      setValue("tuesday", data?.schedule?.tuesday);
      setValue("wednesday", data?.schedule?.wednesday);
      setValue("thursday", data?.schedule?.thursday);
      setValue("friday", data?.schedule?.friday);
      setValue("saturday", data?.schedule?.saturday);
      setValue("sunday", data?.schedule?.sunday);
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
      let newData = {
        ...data,
        id: gData.id,
        monday: Boolean(data.monday),
        tuesday: Boolean(data.tuesday),
        wednesday: Boolean(data.wednesday),
        thursday: Boolean(data.thursday),
        friday: Boolean(data.friday),
        saturday: Boolean(data.saturday),
        sunday: Boolean(data.sunday),
      };
      //@ts-ignore
      editProgram(
        newData,
        photoType ? "multipart/form-data" : "application/json"
      )
        .then((res) => {
          console.log("🚀 ~ editProgram ~ res:", res);
          onClose?.();
        })
        .catch((err) => {
          console.log("🚀 ~ editProgram ~ err:", err);
        });
    } else {
      let newData = {
        ...data,
        monday: Boolean(data.monday),
        tuesday: Boolean(data.tuesday),
        wednesday: Boolean(data.wednesday),
        thursday: Boolean(data.thursday),
        friday: Boolean(data.friday),
        saturday: Boolean(data.saturday),
        sunday: Boolean(data.sunday),
      };
      var formData = new FormData();
      Object.entries(newData).forEach(([key, value]: any) =>
        formData.append(key, value)
      );
      setProgram(formData)
        .then((res) => {
          console.log("🚀 ~ setProgram ~ res:", res);
          onClose?.();
        })
        .catch((err) => {
          console.log("🚀 ~ setProgram ~ err:", err);
        });
    }
  });
  const handleCheckboxChange = (day: string, isChecked: boolean) => {
    console.log("🚀 ~ handleCheckboxChange ~ day, isChecked:", day, isChecked);
    //@ts-ignore
    setValue(day, isChecked);
  };

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
        Program Information
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
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <DatePicker
          label="Start Date"
          onChange={(time, dateString) => {
            console.log("🚀 ~ dateString:", dateString);
            //@ts-ignore
            setValue("startDate", dateString);
          }}
          placeholder="Start Date"
          defaultValue={data?.startDate && dayjs(data?.startDate, "YYYY-MM-DD")}
          defaultOpenValue={
            data?.startDate && dayjs(data?.startDate, "YYYY-MM-DD")
          }
          error={errors.startDate}
        />
        <DatePicker
          label="End Date"
          onChange={(time, dateString) => {
            console.log("🚀 ~ dateString:", dateString);
            //@ts-ignore
            setValue("endDate", dateString);
          }}
          placeholder="End Date"
          defaultValue={data?.endDate && dayjs(data?.endDate, "YYYY-MM-DD")}
          defaultOpenValue={data?.endDate && dayjs(data?.endDate, "YYYY-MM-DD")}
          error={errors.endDate}
        />
        <InputField
          label="Link"
          name="linkUrl"
          defaultValue={data?.linkUrl}
          register={register}
          error={errors?.linkUrl}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex space-x-4">
          {days.map((day: string) => (
            <Checkbox
              key={day}
              title={day}
              //@ts-ignore
              value={getValues()[day]}
              onChange={(d, e) => handleCheckboxChange(d, e)}
            />
          ))}
        </div>
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

export default ProgramForm;
