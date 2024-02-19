"use client";
import React from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { SheetCartProps } from "@/hooks/useCart";
import Link from "next/link";

type CartListProps = {
  sheet: SheetCartProps;
  checkList: SheetCartProps[];
  handleCheck: (id: string) => void;
  onDeleteSheetCart: (id: string) => void;
};

export default function CartOnCart({
  sheet,
  checkList,
  handleCheck,
  onDeleteSheetCart,
}: CartListProps) {
  const inChekList = (sheetId: string) => {
    return checkList.some((sheet) => sheet.id === sheetId);
  };

  return (
    <div id="card-cart-list" className=" w-full flex gap-2 items-center">
      <input
        type="checkbox"
        className="checkbox"
        checked={inChekList(sheet.id)}
        onChange={() => handleCheck(sheet.id)}
      />
      <Link
        id="card-cart-list"
        className="flex hover:cursor-pointer overflow-y-visible 
                my-2 bg-stone-50 rounded-lg border border-stone-200/40 w-full "
        href={`store/info-sheet/${sheet.id}`}
        prefetch={true}
      >
        <div className="flex-[0.3] sm:flex-[0.13] flex items-stretch p-0">
          <Image
            src={sheet.cover_page}
            alt="Covor Sheet"
            width={820}
            height={320}
            className=" object-cover object-center max-h-[5rem] w-full rounded-l-lg rounded-r-none "
          />
        </div>
        <div className="flex-1 w-full px-4 py-2 md:py-0 flex items-center">
          <div className=" w-[60%]">
            <div className=" text-xs md:text-sm ">
              <span className=" text-sm font-semibold text-stone-800">
                {sheet.course_code}&nbsp;-&nbsp;
                <strong className=" text-sm font-medium text-stone-600">
                  {sheet.name}
                </strong>
              </span>
              <div className="flex items-center gap-1 text-xs">
                <span>
                  {`${sheet.type} ${sheet.semester}/${sheet.year}`}
                  &nbsp;&nbsp; &nbsp;&nbsp;
                  {`Total ${sheet.num_page} pages`}
                </span>
              </div>
            </div>
            <div
              id="footer-card"
              className=" flex justify-between items-center"
            >
              <div className="flex items-center gap-1  text-xs text-stone-600">
                <UserIcon className=" h-4 w-4 x text-stone-400" />
                <span>&mdash;</span>
                <strong>{sheet.pen_name}</strong>
              </div>
              {/* <ButtonCartLoveSheet inCart={sheet.inCart} sheetId={sheet.id}/> */}
            </div>
          </div>
          <div className="flex justify-between items-center font-medium text-xs w-[40%]">
            <span className=" font-sans">{sheet.price} ฿</span>
            <button
              className=" rounded-full p-2  hover:bg-red-100"
              onClick={() => onDeleteSheetCart(sheet.id)}
            >
              <TrashIcon className="h-5 w-5 text-red-400" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
