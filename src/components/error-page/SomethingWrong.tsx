"use client";
import React from "react";
import { Button, Result } from "antd";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function SomethingWrong() {
  return (
    <div className=" flex justify-center items-center min-w-full">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div className=" flex items-center justify-center">
            <button
              className=" btn  bg-sky-300 text-white p-2 flex itemconter gap-1 text-center hover:bg-sky-400 rounded-xl hover:translate-y-[-0.4rem] "
              onClick={() => window.location.reload()}
            >
              <ArrowPathIcon className=" h-6 w-6" />
              redfresh
            </button>
          </div>
        }
      />
    </div>
  );
}
