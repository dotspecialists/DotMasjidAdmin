"use client";
import { listNews, listPrayers } from "@/api/HttpServices";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

type NewsType = {
  id: number;
  masjid: { id: number; name: string };
  date: string;
  newsTitle: string;
  newsDescription: string;
  newsLink: string;
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
    header: "Title",
    accessor: "title",
  },
  {
    header: "Description",
    accessor: "description",
  },
  {
    header: "News Link",
    accessor: "news link",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const NewsListPage = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [news, setNews] = useState<any>([]);

  const renderRow = (item: NewsType) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4">{item.masjid?.name}</td>
      <td className="hidden md:table-cell">
        {moment(item.date).format("YYYY-MM-DD")}
      </td>
      <td>{item.newsTitle}</td>
      <td>{item.newsDescription?.substring(0, 15) + "..."}</td>
      <td className="text-blue-400">
        <a href={`${item.newsLink}`}>{item.newsLink}</a>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                table="news"
                type="update"
                data={item}
                onFinish={() => setRefresh(true)}
              />
              <FormModal
                table="news"
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
      listNews({ page: 1, count: 10 })
        .then((res) => {
          console.log("🚀 ~ listPrayers ~ res:", res);
          if (res?.success) {
            setNews(res?.data?.news);
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
        <h1 className="hidden md:block text-lg font-semibold">All News</h1>
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
                table="news"
                type="create"
                onFinish={() => setRefresh(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={news} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default NewsListPage;
