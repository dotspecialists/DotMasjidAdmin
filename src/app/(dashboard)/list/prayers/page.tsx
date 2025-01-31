"use client";
import { listPrayers } from "@/api/HttpServices";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { IReduxSlice } from "@/redux/types";
import { capitalize } from "@/utils/helper";
import { Popover, PopoverProps } from "antd";
import moment from "moment";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "react-pagination-bar";
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
  const [pagination, setPagination] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState<string[]>([]);

  const allFields = ["name", "date", "fajr", "zuhr", "maghrib", "isha"];

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
      listPrayers({
        page: currentPage,
        count: 10,
        q: searchQuery,
        fields: fields.join(","),
      })
        .then((res) => {
          console.log("🚀 ~ listPrayers ~ res:", res);
          if (res?.success) {
            setPrayers(res?.data?.prayers);
            setPagination(res?.data?.pagination);
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
  useEffect(() => {
    setRefresh(true);
  }, [currentPage, searchQuery]);

  const content = (
    <div className="flex flex-wrap gap-2">
      {allFields.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            let arr = [...fields];
            if (arr.includes(item)) {
              arr.splice(arr.indexOf(item), 1);
            } else {
              arr.push(item);
            }
            setFields(arr);
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            fields.includes(item)
              ? "bg-blue-500 text-white hover:bg-blue-600" // If item is in fields
              : "bg-gray-200 text-gray-700 hover:bg-gray-300" // If item is not in fields
          }`}
        >
          <p>{item === "name" ? "Masjid" : capitalize(item)}</p>
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Prayers Time
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-4 self-end">
            <Popover
              placement="bottom"
              title={"Search by"}
              content={content}
              trigger={"click"}
            >
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
            </Popover>
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
      <Pagination
        currentPage={currentPage}
        totalItems={pagination?.totalPrayers}
        itemsPerPage={pagination?.count}
        pageNeighbours={2}
        onPageChange={(e) => setCurrentPage(e)}
        startLabel={"<<"}
        endLabel={">>"}
        nextLabel={">"}
        prevLabel={"<"}
        customClassNames={{
          rpbItemClassName:
            "px-3 py-2 mx-1 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200",
          rpbItemClassNameActive:
            "px-3 py-2 mx-1 border rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-200",
          rpbRootClassName: "flex justify-center items-center space-x-2 mt-4",
        }}
      />
    </div>
  );
};

export default PrayersListPage;
