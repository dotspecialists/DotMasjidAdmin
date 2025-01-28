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
import { editPrayers, setPrayers } from "@/api";

dayjs.extend(customParseFormat);

const schema = z.object({
  masjidId: z.string().min(1, { message: "Masjid id is required" }),
  date: z.string().length(10, { message: "Invalid Time, use format HH:mm:ss" }),
  fajr: z.string().length(8, { message: "Invalid Time, use format HH:mm:ss" }),
  zuhr: z.string().length(8, { message: "Invalid Time, use format HH:mm:ss" }),
  asr: z.string().length(8, { message: "Invalid Time, use format HH:mm:ss" }),
  maghrib: z
    .string()
    .length(8, { message: "Invalid Time, use format HH:mm:ss" }),
  isha: z.string().length(8, { message: "Invalid Time, use format HH:mm:ss" }),
});

type Inputs = z.infer<typeof schema>;

const PrayerForm = ({
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
      setValue("fajr", data?.fajr);
      setValue("zuhr", data?.zuhr);
      setValue("asr", data?.asr);
      setValue("maghrib", data?.maghrib);
      setValue("isha", data?.isha);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (gData?.id) {
      let newData = { ...data, id: gData?.id };
      try {
        const res = await editPrayers(newData);
        console.log("🚀 ~ editPrayers ~ res:", res);
        onClose?.();
      } catch (err) {
        console.log("🚀 ~ editPrayers ~ err:", err);
      }
    } else {
      try {
        const res = await setPrayers(data);
        console.log("🚀 ~ onSubmit ~ res:", res);
        onClose?.();
      } catch (err) {
        console.log("🚀 ~ onSubmit ~ err:", err);
      }
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type.toUpperCase()} Prayer</h1>
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
      <span className="text-xs text-gray-400 font-medium">Prayer Times</span>
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
        <TimePicker
          label="Fajr"
          onChange={(time, timeString) => {
            console.log("🚀 ~ timeString:", timeString);
            //@ts-ignore
            setValue("fajr", timeString);
          }}
          placeholder="Fajr time"
          defaultValue={data?.fajr && dayjs(data?.fajr, "HH:mm:ss")}
          // defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          error={errors.fajr}
        />
        <TimePicker
          label="Zuhr"
          onChange={(time, timeString) => {
            //@ts-ignore
            setValue("zuhr", timeString);
          }}
          placeholder="Zuhr time"
          defaultValue={data?.zuhr && dayjs(data?.zuhr, "HH:mm:ss")}
          error={errors.zuhr}
        />
        <TimePicker
          label="Asr"
          onChange={(time, timeString) => {
            //@ts-ignore
            setValue("asr", timeString);
          }}
          placeholder="Asr time"
          defaultValue={data?.asr && dayjs(data?.asr, "HH:mm:ss")}
          error={errors.asr}
        />
        <TimePicker
          label="Maghrib"
          onChange={(time, timeString) => {
            //@ts-ignore
            setValue("maghrib", timeString);
          }}
          placeholder="Maghrib time"
          defaultValue={data?.maghrib && dayjs(data?.maghrib, "HH:mm:ss")}
          error={errors.maghrib}
        />
        <TimePicker
          label="Isha"
          onChange={(time, timeString) => {
            //@ts-ignore
            setValue("isha", timeString);
          }}
          placeholder="Isha time"
          defaultValue={data?.isha && dayjs(data?.isha, "HH:mm:ss")}
          error={errors.isha}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default PrayerForm;
