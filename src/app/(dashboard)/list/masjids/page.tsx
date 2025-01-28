"use client";
import { listMasjids } from "@/api";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { masjidData, role } from "@/lib/data";
import { setMasjidState } from "@/redux/reducers/masjid";
import { IReduxSlice } from "@/redux/types";
import { IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Masjid = {
  id: number;
  photo: string;
  name: string;
  masjidId: string;
  city: string;
  state: string[];
  address: string[];
  website?: string;
  timezone: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Masjid ID",
    accessor: "masjidId",
    className: "hidden md:table-cell",
  },
  {
    header: "City",
    accessor: "city",
    className: "hidden md:table-cell",
  },
  {
    header: "State",
    accessor: "state",
    className: "hidden md:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Website",
    accessor: "website",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const MasjidListPage = () => {
  const dispatch = useDispatch();
  const [masjids, setMasjids] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const renderRow = (item: Masjid) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={`${IMAGE_URL + item.photo}`}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.timezone}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.masjidId}</td>
      <td className="hidden md:table-cell">{item.city}</td>
      <td className="hidden md:table-cell">{item.state}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td className="hidden md:table-cell">{item.website}</td>
      <td>
        <div className="flex items-center gap-2">
          <FormModal
            table="masjid"
            type="update"
            data={item}
            onFinish={() => setRefresh(true)}
          />
          {/* <Link href={`/list/masjids/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/update.png" alt="" width={16} height={16} />
            </button>
          </Link> */}
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal
              table="masjid"
              type="delete"
              id={item.id}
              onFinish={() => setRefresh(true)}
            />
          )}
        </div>
      </td>
    </tr>
  );
  useEffect(() => {
    refresh &&
      listMasjids({ page: 1, count: 10 })
        .then((res) => {
          console.log("🚀 ~ listMasjids ~ res:", res?.data);
          setMasjids(res?.data?.masjids);
          dispatch(setMasjidState({ key: "data", data: res?.data?.masjids }));
        })
        .catch((err) => {
          console.log("🚀 ~ listMasjids ~ err:", err);
        })
        .finally(() => {
          setRefresh(false);
        });
  }, [refresh]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Masjids</h1>
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal
                table="masjid"
                type="create"
                onFinish={() => setRefresh(true)}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={masjids} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default MasjidListPage;
