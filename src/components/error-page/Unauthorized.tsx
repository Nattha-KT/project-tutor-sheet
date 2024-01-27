"use client";
import React from "react";
import { Button, Result } from "antd";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
type Props = {};

export default function Unauthorized({}: Props) {
  return (
    <div className=" flex justify-center items-center min-w-full">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <div className=" flex items-center justify-center">
            <button
              className=" btn  bg-sky-300 text-white p-2 flex itemconter gap-1 text-center hover:bg-sky-400 rounded-xl hover:translate-y-[-0.4rem] "
              onClick={() => window.location.reload()}
            >
              <ArrowRightOnRectangleIcon className=" h-6 w-6" />
              Sign In
            </button>
          </div>
        }
      />
    </div>
  );
}
