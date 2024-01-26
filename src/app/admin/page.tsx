"use server";
import React from "react";
import AreaChartCompo from "./_components/AreaChart";
import Stat from "./_components/Stat";
import Table from "./_components/Table";
import getSheetbyStatus from "../../../actions/get-sheet-status-action";

export default async function AdminDashbaord() {
  const res = await getSheetbyStatus(false)

  return (
    <div className=" container flex min-w-full ">
      <div className=" flex flex-1 flex-col xl:flex-row gap-5">
        <div className=" flex flex-1 flex-col-reverse md:flex-col gap-1">
          <div className=" flex flex-1 justify-center">
            <Stat />
          </div>
          <div className="min-w-full max-h-[37rem]">
            <AreaChartCompo />
          </div>
        </div>
        <div className=" flex">
          {res.data && <Table sheets={res.data} />}
        </div>
      </div>
    </div>
  );
}
