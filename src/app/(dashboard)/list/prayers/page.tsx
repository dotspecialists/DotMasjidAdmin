"use client";
import { listPrayers } from "@/api/HttpServices";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prayersData, role } from "@/lib/data";
import { IReduxSlice } from "@/redux/types";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type PrayersTime = {
  id: number;
  masjid: { id: number; name: string };
  date: string;
  fajr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

const columns = [
  {
    header: "Masjid",
    accessor: "masjid",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Fajr",
    accessor: "fajr",
  },
  {
    header: "Zuhr",
    accessor: "zuhr",
  },
  {
    header: "Asr",
    accessor: "asr",
  },
  {
    header: "Maghrib",
    accessor: "maghrib",
  },
  {
    header: "Isha",
    accessor: "isha",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const PrayersListPage = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [prayers, setPrayers] = useState<any>([]);
  const masjids = useSelector((state: IReduxSlice) => state.masjid.data);

  const renderRow = (item: PrayersTime) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{item.masjid?.name}</td>
      <td className="hidden md:table-cell">
        {moment(item.date).format("YYYY-MM-DD")}
      </td>
      <td>{item.fajr}</td>
      <td>{item.zuhr}</td>
      <td>{item.asr}</td>
      <td>{item.maghrib}</td>
      <td>{item.isha}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                table="prayer"
                type="update"
                data={item}
                onFinish={() => setRefresh(true)}
              />
              <FormModal
                table="prayer"
                type="delete"
                id={item?.id}
                onFinish={() => setRefresh(true)}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  useEffect(() => {
    if (refresh) {
      listPrayers({ page: 1, count: 10 })
        .then((res) => {
          console.log("🚀 ~ listPrayers ~ res:", res);
          if (res?.success) {
            setPrayers(res?.data?.prayers);
          }
        })
        .catch((err) => {
          console.log("🚀 ~ listPrayers ~ err:", err);
        })
        .finally(() => {
          setRefresh(false);
        });
    }
  }, [refresh]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Prayers Time
        </h1>
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
                table="prayer"
                type="create"
                onFinish={() => setRefresh(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={prayers} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default PrayersListPage;
