"use client";

import { deleteMasjid, deleteProgram } from "@/api";
import { deleteEvent, deleteNews, deletePrayers } from "@/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const MasjidForm = dynamic(() => import("./forms/MasjidForm"), {
  loading: () => <h1>Loading...</h1>,
});
const PrayerForm = dynamic(() => import("./forms/PrayerForm"), {
  loading: () => <h1>Loading...</h1>,
});
const NewsForm = dynamic(() => import("./forms/NewsForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/EventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ProgramForm = dynamic(() => import("./forms/ProgramForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    data?: any,
    onClose?: VoidFunction
  ) => JSX.Element;
} = {
  masjid: (type, data, onClose) => (
    <MasjidForm type={type} data={data} onClose={onClose} />
  ),
  prayer: (type, data, onClose) => (
    <PrayerForm type={type} data={data} onClose={onClose} />
  ),
  news: (type, data, onClose) => (
    <NewsForm type={type} data={data} onClose={onClose} />
  ),
  event: (type, data, onClose) => (
    <EventForm type={type} data={data} onClose={onClose} />
  ),
  program: (type, data, onClose) => (
    <ProgramForm type={type} data={data} onClose={onClose} />
  ),
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  onFinish,
}: {
  table:
    | "masjid"
    | "prayer"
    | "news"
    | "event"
    | "program"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
  onFinish?: VoidFunction;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);
  const onDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (table === "masjid") {
      deleteMasjid(id)
        .then((res) => {
          console.log("🚀 ~ deleteMasjid ~ res:", res);
          setOpen(false);
          onFinish?.();
          if (!res.success) {
            alert(res.message);
          }
        })
        .catch((err) => {
          console.log("🚀 ~ deleteMasjid ~ err:", err);
        });
    } else if (table === "prayer") {
      deletePrayers(id)
        .then((res) => {
          console.log("🚀 ~ deletePrayers ~ res:", res);
          setOpen(false);
          onFinish?.();
        })
        .catch((err) => {
          console.log("🚀 ~ deletePrayers ~ err:", err);
        });
    } else if (table === "news") {
      deleteNews(id)
        .then((res) => {
          console.log("🚀 ~ deleteNews ~ res:", res);
          setOpen(false);
          onFinish?.();
        })
        .catch((err) => {
          console.log("🚀 ~ deleteNews ~ err:", err);
        });
    } else if (table === "event") {
      deleteEvent(id)
        .then((res) => {
          console.log("🚀 ~ deleteEvent ~ res:", res);
          setOpen(false);
          onFinish?.();
        })
        .catch((err) => {
          console.log("🚀 ~ deleteEvent ~ err:", err);
        });
    } else if (table === "program") {
      deleteProgram(id)
        .then((res) => {
          console.log("🚀 ~ deleteProgram ~ res:", res);
          setOpen(false);
          onFinish?.();
        })
        .catch((err) => {
          console.log("🚀 ~ deleteProgram ~ err:", err);
        });
    }
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form
        action=""
        className="p-4 flex flex-col gap-4"
        onSubmit={(e) => onDelete(e)}
      >
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data, () => {
        setOpen(false);
        onFinish?.();
      })
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
