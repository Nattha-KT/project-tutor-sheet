"use client";
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import useCartButton from "@/hooks/useCartButton";
import ButtonInlibrary from "./ButtonInlibrary";


type ButtonCartType = {
  inCart: boolean;
  sheetId: string;
  owner:boolean
};
export default function ButtonCart({ owner, inCart, sheetId }: ButtonCartType) {
  const { data: session } = useSession();
  const { addToCart, handleClickAddCart } = useCartButton(
    session,
    inCart,
    sheetId
  );

  if(owner){
    return (
      <ButtonInlibrary/>
    )
  }


  return (
    <div
      id="add-cart-button-phone"
      className=" w-full flex sm:justify-normal  sm:mt-0"
    >
      <Button
        className={`sm:hidden py-[5px]  flex  text-[12px] rounded-lg ${
          addToCart ? "scale-x-[-1] bg-rose-500" : ""
        } duration-300 ease-in`}
        placeholder={undefined}
        onClick={() => handleClickAddCart()}
      >
        <span
          className={`flex items-center ${addToCart ? "scale-x-[-1]" : ""}`}
        >
          {addToCart ? "-" : "+"}
          <ShoppingCartIcon className=" h-[1rem] w-[0.88rem] mt-[3px] mr-[2px]" />
        </span>
      </Button>

      <Button
        id="contain-add-cart-button"
        className={`relative hidden px-0 sm:px-10 mt-3 sm:flex justify-center transform ${
          addToCart ? "scale-x-[-1]  bg-rose-500" : ""
        } duration-300 ease-in`}
        placeholder={undefined}
        size="sm"
        fullWidth={true}
        onClick={() => handleClickAddCart()}
      >
        <div
          className={`flex items-center ${
            addToCart ? "scale-x-[-1]" : ""
          } duration-300 ease-in`}
        >
          <ShoppingCartIcon
            className={`h-[12px] sm:h-[18px] w-[18px] mr-2 text-[12px] sm:text-md `}
          />
          <span>{addToCart ? "Remove" : "Add to cart"}</span>
        </div>
      </Button>
    </div>
  );
}
