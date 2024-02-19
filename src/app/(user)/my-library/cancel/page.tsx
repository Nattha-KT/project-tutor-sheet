"use client";
import React from "react";
import { Result } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { PageProps } from "../../store/page";


export default function CancelPage(props:PageProps) {
  
  return (
    <div id="contain-cancel"  key={uuidv4()} className="container min-w-full flex items-center justify-center">
      <Result
        key={uuidv4()}
        status="warning"
        title="There was some problem during the processing of your transaction.!"
        extra={[
          <div key={uuidv4()} className=" w-full flex gap-3 justify-center">
            <button
              onClick={() => (window.location.href = "/cart")}
              key={uuidv4()}
              className="flex items-center gap-2 bg-blue-400 hover:bg-blue-300 border-0 text-white hover:text-gray-50 rounded-lg p-1 px-2 shadow-md"
            >
              <XMarkIcon className=" wh-6 h-6 text-white" />
              Cancel purchase
            </button>
          </div>,
        ]}
      />
    </div>
  );
}
