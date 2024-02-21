"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DialogComplaint } from "./DialogComplaint";
import { DeleteComplaint } from "@/services/client/admin/api";
import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DialogDelete } from "@/components/dialog";
import useComplaint from "@/hooks/useComplaint";
import { v4 as uuidv4 } from "uuid";
type UserProps = {
  name: string;
  image: string;
  role: string;
};

type ComplaintProps = {
  id: string;
  createdAt: string;
  userId: string;
  head: string;
  category: string;
  content: string;
  role: string;
  level: string;
  user: UserProps;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function ImpotantController(level: String) {
  if (level === "Hight") {
    return "bg-red-100 text-red-400 border-red-300";
  } else if (level === "Medium") {
    return "bg-sky-100 text-sky-400  border-sky-300";
  } else {
    return "bg-purple-100 text-purple-300 border-purple-300";
  }
}

export default function ComplaintManagement({
  complaint,
}: {
  complaint: ComplaintProps[];
}) {
  const {
    listChoise,
    complaintList,
    handleCheckboxChange,
    setConfirmDelete,
    handleMainCheckboxChange,
    isMainCheckboxChecked,
  } = useComplaint(complaint);

  

  
  return (
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
            <th>Title</th>
            <th>Category</th>
            <th>Role</th>
            <th>Important</th>
            <th className=" p-1">
              {listChoise.length > 0 && (
                <>
                  <button
                    className="p-2 rounded-md gap-1 border-none bg-red-600 flex items-center text-xs text-white hover:bg-red-700 shadow-sm "
                    onClick={() =>
                      (
                        document.getElementById(
                          `delete_complaint`
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
        </thead>
        <tbody className=" ">
          {complaintList &&
            complaintList.map((data) => (
              <tr key={uuidv4()}>
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
                          src={data.user.image}
                          alt="Avatar"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data.user.name}</div>
                      <div className="text-sm opacity-50">{data.user.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {data.head}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {dateFormatter.format(Date.parse(data.createdAt))}
                  </span>
                </td>
                <td>{data.category}</td>
                <td>{data.role}</td>
                <td className=" flex items-center pt-9 sm:pt-6">
                  <div
                    className={`flex  border p-1 rounded-xl ${ImpotantController(
                      data.level
                    )}`}
                  >
                    {data.level}
                  </div>
                </td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() =>
                      (
                        document.getElementById(
                          `complaint_${data.id}`
                        ) as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    details
                  </button>
                  <DialogComplaint
                    id={`complaint_${data.id}`}
                    content={data.content}
                  />
                </th>
              </tr>
            ))}
        </tbody>
        {/* foot */}
        <tfoot className=" bg-gray-100">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Title</th>
            <th>Category</th>
            <th>Role</th>
            <th>Important</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <DialogDelete
        name_id={`delete_complaint`}
        title="Complaint"
        setDeleted={setConfirmDelete}
      />
    </div>
  );
}
