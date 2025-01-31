"use client";
import { listMasjids } from "@/api";
import FormModal from "@/components/FormModal";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { masjidData, role } from "@/lib/data";
import { setMasjidState } from "@/redux/reducers/masjid";
import { IReduxSlice } from "@/redux/types";
import { IMAGE_URL } from "@/utils/constants";
import { capitalize } from "@/utils/helper";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination } from "react-pagination-bar";
import { useDispatch, useSelector } from "react-redux";

type Masjid = {
  id: number;
  photo: string;
  name: string;
  masjidId: string;
  city: string;
  state: string;
  address: string;
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
  const [pagination, setPagination] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields] = useState<string[]>([]);

  const allFields = ["name", "city", "state", "address"];

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
          {role === "admin" && (
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
      listMasjids({
        page: 1,
        count: 10,
        q: searchQuery,
        fields: fields.join(","),
      })
        .then((res) => {
          console.log("🚀 ~ listMasjids ~ res:", res?.data);
          setMasjids(res?.data?.masjids);
          setPagination(res?.data?.pagination);
          dispatch(setMasjidState({ key: "data", data: res?.data?.masjids }));
        })
        .catch((err) => {
          console.log("🚀 ~ listMasjids ~ err:", err);
        })
        .finally(() => {
          setRefresh(false);
        });
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
        <h1 className="hidden md:block text-lg font-semibold">All Masjids</h1>
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
      <Pagination
        currentPage={currentPage}
        totalItems={pagination?.totalMasjids}
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

export default MasjidListPage;
