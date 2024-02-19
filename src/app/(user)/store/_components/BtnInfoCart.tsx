"use client";
import useCartButton from "@/hooks/useCartButton";
import { addSheetToCart } from "@/services/client/user/api";
import {
  CursorArrowRaysIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type ButtonCartType = {
  inCart: boolean;
  sheetId: string;
  owner: boolean;
};

export default function ButtonInfoCart({
  inCart,
  sheetId,
  owner,
}: ButtonCartType) {
  const { data: session } = useSession();
  const { addToCart, handleClickAddCart } = useCartButton(
    session,
    inCart,
    sheetId
  );

  return (
    <>
      {owner ? (
        <button
          className="  py-3 border-0 max-w-[60%] px-auto px-5 text-white  rounded-xl shadow-xl bg-sky-400 hover:scale-105"
          onClick={() => (window.location.href = "/my-library")}
        >
          <span className="flex items-center gap-2">
            <CursorArrowRaysIcon className=" w-6 h-6" />
            In Library
          </span>
        </button>
      ) : (
        <button
          className={`btn border-0 max-w-[60%] px-auto sm:px-8 text-white  rounded-xl shadow-xl  ${
            addToCart
              ? "scale-y-[-1] bg-rose-400 duration-200 ease-in hover:bg-rose-300  "
              : "bg-amber-500 hover:bg-amber-400 "
          } `}
          onClick={() => handleClickAddCart()}
        >
          <span
            className={`flex items-center gap-2  ${
              addToCart ? "scale-y-[-1]" : ""
            } duration-300 ease-in`}
          >
            <ShoppingCartIcon className=" w-6 h-6" />
            {addToCart ? "Remove" : "CART"}
          </span>
        </button>
      )}
    </>
  );
}
