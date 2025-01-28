"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TimePicker from "../TimePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Dropdown from "../Dropdown";
import { useSelector } from "react-redux";
import { IReduxSlice } from "@/redux/types";
import { useEffect } from "react";
import DatePicker from "../DatePicker";
import { editNews, editPrayers, setNews, setPrayers } from "@/api";
import InputField from "../InputField";

dayjs.extend(customParseFormat);

const schema = z.object({
  masjidId: z.string().min(1, { message: "Masjid id is required" }),
  date: z.string().length(10, { message: "Invalid Time, use format HH:mm:ss" }),
  newsTitle: z.string().min(1, { message: "Title is requires" }),
  newsDescription: z.string().min(1, { message: "Description is requires" }),
  newsLink: z.string().url(),
});

type Inputs = z.infer<typeof schema>;

const NewsForm = ({
  type,
  onClose,
  data,
}: {
  type: "create" | "update";
  onClose?: VoidFunction;
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const gData = data;
  const masjids = useSelector((state: IReduxSlice) => state.masjid.data);
  useEffect(() => {
    if (data?.id) {
      setValue("masjidId", data?.masjid?.id?.toString());
      setValue("date", data?.date);
      setValue("newsTitle", data?.newsTitle);
      setValue("newsDescription", data?.newsDescription);
      setValue("newsLink", data?.newsLink);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (gData?.id) {
      let newData = { ...data, id: gData?.id };
      try {
        const res = await editNews(newData);
        console.log("🚀 ~ editNews ~ res:", res);
        onClose?.();
      } catch (err) {
        console.log("🚀 ~ editNews ~ err:", err);
      }
    } else {
      try {
        const res = await setNews(data);
        console.log("🚀 ~ setNews ~ res:", res);
        onClose?.();
      } catch (err) {
        console.log("🚀 ~ setNews ~ err:", err);
      }
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type.toUpperCase()} News</h1>
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
        News Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <DatePicker
          disabled={type === "update"}
          label="Date"
          onChange={(time, dateString) => {
            console.log("🚀 ~ dateString:", dateString);
            //@ts-ignore
            setValue("date", dateString);
          }}
          placeholder="Date"
          defaultValue={data?.date && dayjs(data?.date, "YYYY-MM-DD")}
          defaultOpenValue={data?.date && dayjs(data?.date, "YYYY-MM-DD")}
          // defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          error={errors.date}
        />
        <InputField
          label="Title"
          name="newsTitle"
          defaultValue={data?.newsTitle}
          register={register}
          error={errors?.newsTitle}
        />
        <InputField
          label="Description"
          name="newsDescription"
          defaultValue={data?.newsDescription}
          register={register}
          error={errors?.newsDescription}
        />
        <InputField
          label="Link"
          name="newsLink"
          defaultValue={data?.newsLink}
          register={register}
          error={errors?.newsLink}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default NewsForm;
