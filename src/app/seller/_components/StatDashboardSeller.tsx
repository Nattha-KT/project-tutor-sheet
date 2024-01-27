"use client";
import React from "react";
import { ArchiveBoxArrowDownIcon,PresentationChartLineIcon } from "@heroicons/react/24/outline";
import { Sheet } from "../../../../types/type";

interface SellerDashboardProps {
  dataSheets: Sheet[];
}

export default function StatDashboardSeller({dataSheets}: SellerDashboardProps) {

  const countApproved = dataSheets.filter((sheet)=>sheet.status_approve === true ).length

  return (
    <div className=" flex flex-1 md:flex-row flex-col gap-3 px-5 sm:px-8 pt-7">
      <div className="stat flex-1 place-items-center bg-purple-50/30 rounded-2xl shadow-md shadow-primary">
        <div className="stat-title text-primary/80">Downloads</div>
        <div className="stat-value text-3xl font-sans font-extrabold flex items-center gap-2 text-primary">
            31K
            <ArchiveBoxArrowDownIcon className=" h-8 w-8 "/>
        </div>
        <div className="stat-desc text-primary/80">From January 1st to February 1st</div>
      </div>

      <div className="stat flex-1 place-items-center bg-pink-50/30 rounded-2xl shadow-md shadow-secondary">
        <div className="stat-title text-secondary/80">Number of trades</div>
        <div className="stat-value text-3xl font-sans font-extrabold flex items-center gap-2 text-secondary">
            235
            <PresentationChartLineIcon className=" h-8 w-8 "/>
        </div>
        <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
      </div>

      <div className="stat flex-1 place-items-center rounded-2xl shadow-md bg-amber-50/30 text-warning/80 shadow-warning">
        <div className="stat-title text-warning">Approved sheet</div>
        <div className="stat-value text-3xl font-sans font-extrabold text-warning">{countApproved}<span className=" font-light">/</span>{dataSheets.length}</div>
        <div className="stat-desc text-warning/80">{`↘︎(${countApproved/(dataSheets.length)}%) from Total sheets`}</div>
      </div>
    </div>
  );
}
