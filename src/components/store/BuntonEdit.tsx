"use client";
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DialogEditSheet } from "../dialog";
import { Sheet } from "../../../types/type";

export default function ButtonEdit({sheet}:{sheet:Sheet}) {
  return (
    <div
      id="edit-cart-button-phone"
      className=" w-full flex sm:justify-normal  sm:mt-0"
    >
      <button
        className=" flex items-center bg-amber-400 sm:hidden py-1 px-2 text-sm text-white rounded-lg"
        onClick={() =>
          (
            document.getElementById(`${sheet.id}`) as HTMLDialogElement
          ).showModal()
        }
      >
        <PencilSquareIcon className="h-4 w-4" />
        <span>Edit now</span>
      </button>
      <button
        className="relative w-full rounded-lg shadow-md hidden px-2 py-1 mt-3 sm:flex justify-center bg-amber-400 text-white"
        onClick={() =>
          (
            document.getElementById(`${sheet.id}`) as HTMLDialogElement
          ).showModal()
        }
      >
        <PencilSquareIcon className="h-[12px] sm:h-[18px] w-[18px] mr-2 text-[12px] sm:text-md" />
        Edit sheet
      </button>

      <DialogEditSheet name_id={`${sheet.id}`} sheet={sheet} />
    </div>
  );
}
