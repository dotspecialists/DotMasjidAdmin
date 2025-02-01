"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { editMasjid, setMasjid, setPrayersByCSV } from "@/api";
import { randString } from "@/utils/helper";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IReduxSlice } from "@/redux/types";
import Dropdown from "../Dropdown";

const schema = z.object({
  masjidId: z.string().min(1, { message: "Masjid id is required" }),
  csv: z.instanceof(File, { message: "Invalid file!" }),
});

type Inputs = z.infer<typeof schema>;

const CsvForm = ({
  type,
  onClose,
  data,
}: {
  type: "create";
  onClose?: VoidFunction;
  data?: any;
}) => {
  const [csv, setCSV] = useState<any>(null);
  const masjids = useSelector((state: IReduxSlice) => state.masjid.data);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const fileInputRef = useRef(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log("🚀 ~ handleFileChange ~ file:", file);
    if (file) {
      setValue("csv", file); // Manually set the file value
      setCSV(file);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    setPrayersByCSV(data)
      .then((res) => {
        console.log("🚀 ~ setPrayersByCSV ~ res:", res);
        onClose?.();
      })
      .catch((err) => {
        console.log("🚀 ~ setPrayersByCSV ~ err:", err);
      });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type.toUpperCase()} Prayer</h1>
      <span className="text-xs text-gray-400 font-medium">Select Masjid</span>
      <div className="flex justify-between flex-wrap gap-4">
        <Dropdown
          // disabled={type === "update"}
          label="Masjid"
          name="masjidId"
          options={masjids}
          register={register}
          error={errors.masjidId}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="csv"
          >
            <Image src="/csv.png" alt="" width={28} height={28} />
            <span>{csv?.name || "Upload CSV file"} </span>
          </label>
          <input
            type="file"
            id="csv"
            accept=".csv"
            {...register("csv")}
            onChange={handleFileChange}
            className="hidden"
          />
          {errors.csv?.message && (
            <p className="text-xs text-red-400">
              {errors.csv.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">Create</button>
    </form>
  );
};

export default CsvForm;
