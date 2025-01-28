"use client";
import { listEvents, listPrograms } from "@/api";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import { IMAGE_URL } from "@/utils/constants";
import { WeekDaysProps } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type Program = {
  id: number;
  photo?: string;
  masjid: { id: number; name: string };
  name: string;
  description: string;
  linkUrl: string;
  startDate: string;
  endDate: string;
  schedule: WeekDaysProps;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Date",
    accessor: "start date",
  },
  {
    header: "End Date",
    accessor: "end date",
  },
  {
    header: "Schedule",
    accessor: "schedule",
    className: "hidden md:table-cell",
  },
  {
    header: "Link",
    accessor: "registration",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ProgramListPage = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [programs, setPrograms] = useState<any>([]);
  const renderRow = (item: Program) => (
    <tr
      key={item?.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={`${IMAGE_URL + item?.photo}`}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item?.name}</h3>
          {/* <p className="text-xs text-gray-500">{item?.timezone}</p> */}
        </div>
      </td>
      <td>{item?.description?.substring(0, 15) + "..."}</td>
      <td>{item?.startDate}</td>
      <td>{item?.endDate}</td>
      <td>
        {Object.entries(item?.schedule)
          ?.map(([key, value]: any) => {
            if (value) {
              return key?.substring(0, 3);
            }
          })
          ?.filter((item) => item && item)
          ?.join(", ")}
      </td>
      {/* <td className="hidden md:table-cell">{item.registerationLink}</td> */}
      <td className="hidden md:table-cell">
        <a
          href={item?.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        >
          Open
        </a>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                table="program"
                type="update"
                data={item}
                onFinish={() => setRefresh(true)}
              />
              <FormModal
                table="program"
                type="delete"
                id={item.id}
                onFinish={() => setRefresh(true)}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  useEffect(() => {
    refresh &&
      listPrograms({ page: 1, count: 10 })
        .then((res) => {
          console.log("🚀 ~ listEvents ~ res:", res?.data);
          setPrograms(res?.data?.programs);
        })
        .catch((err) => {
          console.log("🚀 ~ listEvents ~ err:", err);
        })
        .finally(() => {
          setRefresh(false);
        });
  }, [refresh]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Programs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal
                table="program"
                type="create"
                onFinish={() => setRefresh(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={programs || []} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default ProgramListPage;
