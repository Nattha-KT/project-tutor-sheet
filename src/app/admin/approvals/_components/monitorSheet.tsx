"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  CheckBadgeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DialogDelete } from "@/components/dialog";
import { Seller } from "../../../../../types/type";
import useApprove from "@/hooks/useApprove";
import { Input, Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import DialogShowPdf from "../../../../components/dialog/DialogShowPdf";

type Sheet = {
  id: string;
  course_code: string;
  name: string;
  semester: string;
  type: string;
  year: string;
  price: number;
  status_approve?: boolean;
  num_page: number;
  class_details: string;
  content_details: string;
  suggestion?: string;
  cover_page: string;
  date: string;
  samples_page: string[];
  file_path: string;
  seller: Seller;
};

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "true",
  },
  {
    label: "Pending",
    value: "false",
  },
];

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Approve({ sheets }: { sheets: Sheet[] }) {
  const {
    listChoise,
    filteredSheets,
    searchTerm,
    groupUrl,
    settabControl,
    setSearchTerm,
    handleCheckboxChange,
    setConfirmDelete,
    handleMainCheckboxChange,
    handleUpdateStatus,
    isMainCheckboxChecked,
  } = useApprove(sheets);

  return (
    <div className=" container min-w-full">
      <div
        id="filter-sheets"
        className="mb-2  p-4  gap-y-3 items-center flex flex-col-reverse md:flex-row justify-between"
      >
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader className=" bg-stone-200" placeholder={undefined}>
            {TABS.map(({ label, value }) => (
              <Tab
                key={uuidv4()}
                value={value}
                onClick={() => {
                  settabControl(value);
                }}
                placeholder={undefined}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72 ">
          <Input
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=""
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            crossOrigin={undefined}
          />
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="table ">
          {/* head */}
          <thead className=" bg-gray-200/80 ">
            <tr className=" text-gray-700">
              <th>
                <label>
                  {/* main checkbox */}
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isMainCheckboxChecked}
                    onChange={handleMainCheckboxChange}
                  />
                </label>
              </th>
              <th>Name</th>
              <th>Course code</th>
              <th>Page</th>
              <th>Price</th>
              <th>Status</th>
              <th className=" p-1">
                {listChoise.length > 0 && (
                  <>
                    <button
                      className="p-2 rounded-md gap-1 border-none bg-green-600 flex items-center text-xs text-white hover:bg-green-500 shadow-sm "
                      onClick={() => {
                        handleUpdateStatus();
                      }}
                    >
                      <CheckBadgeIcon className=" w-4 h-4" />
                      approve
                    </button>
                  </>
                )}
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {filteredSheets &&
              filteredSheets.map((data) => (
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={listChoise.includes(data.id)}
                        onChange={() => handleCheckboxChange(data.id)}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src={data.cover_page}
                            alt="Avatar"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{data.name}</div>
                        <div className="text-sm opacity-50">
                          {data.seller.pen_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {data.course_code}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {dateFormatter.format(Date.parse(data.date))}
                    </span>
                  </td>
                  <td>{data.num_page}</td>
                  <td>{data.price}</td>
                  <td className=" flex items-center pt-9 sm:pt-6">
                    {data.status_approve ? (
                      <div className=" text-sm border border-green-400 bg-green-50 text-green-700 p-1 rounded-lg shadow-md">
                        approved
                      </div>
                    ) : (
                      <div className=" text-sm border border-sky-300 bg-sky-50 text-sky-800 p-1 rounded-lg shadow-md">
                        pending
                      </div>
                    )}
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() =>
                        (
                          document.getElementById(
                            `Show-pdf-sheet-${data.id}`
                          ) as HTMLDialogElement
                        ).showModal()
                      }
                      // onClick={()=>handleGetUrl(`${data.file_path}/file-pdf`)}
                    >
                      details
                    </button>
                  </th>
                  <DialogShowPdf
                    name_id={`Show-pdf-sheet-${data.id}`}
                    pdfUrl={`${groupUrl[data.id]}`}
                  />
                </tr>
              ))}
          </tbody>
          {/* foot */}
          <tfoot className=" bg-gray-100">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Course code</th>
              <th>Page</th>
              <th>Price</th>
              <th>Status</th>
              <th className=" p-1">
                {listChoise.length > 0 && (
                  <>
                    <button
                      className="p-2 rounded-md gap-1 border-none bg-red-600 flex items-center text-xs text-white hover:bg-red-500 shadow-sm "
                      onClick={() =>
                        (
                          document.getElementById(
                            `admin-delete-sheets`
                          ) as HTMLDialogElement
                        ).showModal()
                      }
                    >
                      <TrashIcon className=" w-4 h-4" />
                      delete
                    </button>
                  </>
                )}
              </th>
            </tr>
          </tfoot>
        </table>
        <DialogDelete
          name_id={`admin-delete-sheets`}
          title="Sheets"
          setDeleted={setConfirmDelete}
        />
      </div>
    </div>
  );
}
