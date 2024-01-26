import React from "react";
import Image from "next/image";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function Table({ sheets }: any) {
  return (
    <div className="overflow-x-auto flex flex-col justify-between rounded-xl shadow-lg  bg-white min-w-full max-h-[38rem]">
      <table className="table overflow-y-scroll">
        {/* head */}
        <thead className=" bg-slate-900 text-white">
          <tr>
            <th>Name</th>
            <th className=" hidden sm:block">Owner</th>
            <th>Status </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sheets &&
            sheets.map((sheet: any) => (
              <tr key={sheet.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          width={50}
                          height={50}
                          src={sheet.cover_page || ""}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{sheet.name}</div>
                      <div className="text-sm opacity-50">
                        {sheet.course_code}
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" hidden sm:block">
                  {sheet.seller.pen_name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {dateFormatter.format(Date.parse(sheet.date))}
                  </span>
                </td>
                <td className="">
                  <div className=" border-2 border-red-200 bg-red-100 rounded-lg p-1 text-red-500 shadow-xs text-center text-sm">
                    unapprove
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot className=" bg-stone-50">
          <tr>
            <th className="text-stone-400 font-thin text-xs">Name</th>
            <th className="text-stone-400 font-thin text-xs hidden md:block">
              Owner
            </th>
            <th className="text-stone-400 font-thin text-xs">Status</th>
            <th className="text-stone-400 font-thin text-xs"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
