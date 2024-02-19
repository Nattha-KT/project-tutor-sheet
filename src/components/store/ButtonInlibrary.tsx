"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import {
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";


export default function ButtonInlibrary() {
  return (
    <div className=" w-full flex  sm:justify-normal  sm:mt-0">
      <button
        id="btn-lib-phone"
        className={"sm:hidden flex gap-1 text-[12px] rounded-lg bg-blue-400/80 hover:shadow-lg px-2 py-1 shadow-md text-white"}
        onClick={()=>window.location.href = "/my-library"}
      >
        <span className={"flex items-center"}>
          <CursorArrowRaysIcon className=" h-4 w-4" />
          in library
        </span>
      </button>

      <button
        id="btn-lib-default"
        className={
          "relative hidden sm:px-10 mt-3 sm:flex justify-center bg-blue-400/80 w-full px-2 py-1 rounded-lg shadow-sm hover:shadow-md"
        }
        onClick={()=>window.location.href = "/my-library"}
      >
        <div className={"flex gap-1 items-center text-white font-sans text-sm font-medium uppercase"}>
          <CursorArrowRaysIcon
            className={"h-6 w-5 "}
          />
          <span>In Library</span>
        </div>
      </button>
    </div>
  );
}
