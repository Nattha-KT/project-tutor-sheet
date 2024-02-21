"use client"
import Unauthorized from "@/components/error-page/Unauthorized";
import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  CreditCardIcon,
  FaceFrownIcon,
  HeartIcon,
  QueueListIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import CartOnCart from "./_components/CardOnCart";
import useCart from "@/hooks/useCart";
import { checkout } from "@/services/client/user/api";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Cart() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    handleMainCheckboxChange,
    handleCheckboxChange,
    onDeleteSheetCart,
    setReloadComponent,
    isMainCheckAllList,
    pending,
    sheetList,
    checkList,
  } = useCart();
  const totalPrice = checkList.reduce((total, sheet) => total + sheet.price, 0);

  const handleCheckout = async () => {
    await checkout(checkList);
  };




  if (!session) {
    return (
      <div className=" container flex items-center justify-center w-full">
        <Unauthorized />
      </div>
    );
  }
  return (
    <div className=" container min-w-full min-h-screen pt-3 bg-gray-100/30 ">
      <div
        id="head-cart"
        className=" relative block w-full mt-[-3rem] md:mt-[-7rem] shadow-sm rounded-xl mb-3 "
      >
        <div id="cart-background px-3 ">
          <Image
            src="/images/bg-cart.jpg"
            width={2000}
            height={2000}
            alt="background"
            className=" object-cover object-center max-h-[15rem] rounded-b-xl opacity-50"
          />
        </div>
        <div id="nav-cart" className="w-full absolute bottom-[10%] px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center sm:justify-between border-2 border-gray-100  shadow-md rounded-xl p-3">
            <span>
              <h1 className="flex gap-2 items-center">
                <ShoppingCartIcon className="text-gray-700 h-8 w-8" />
                <span className=" text-gray-700 font-semibold text-[1.2rem] uppercase">
                  my cart
                </span>
              </h1>
              <span className=" text-xs text-gray-500">
                You can add more sheets you like to your cart!! If you would
                like to add a favorite sheet, click on the My favorite page.
              </span>
            </span>
            <Link className="flex items-center gap-1 p-2 bg-white hover:scale-110 text-stone-900 uppercase text-xs rounded-xl shadow-md"
            href="/favorite" prefetch={true}>
              <HeartIcon className=" h-5 w-5 text-stone-900" />
              favorite sheets
            </Link>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-full gap-3 py-2  px-6 ">
        <div
          id="content-cart"
          className="flex flex-col md:flex-row w-full gap-3 mb-2"
        >
          <div
            id="check-list"
            className=" flex-1 block bg-white rounded-xl shadow-md p-3 min-h-[20rem] overflow-x-auto "
          >
            <div className=" flex justify-between w-full">
              <span className="flex items-center gap-2">
                <QueueListIcon className=" h-5 w-5 " />
                <strong>Sheet List</strong>
              </span>
              <label className=" text-sm flex items-center gap-3 font-semibold">
                {" "}
                Select all
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={isMainCheckAllList}
                  onChange={handleMainCheckboxChange}
                />
              </label>
            </div>
            {!pending ? (
              <>
                {sheetList.length > 0 ? (
                  <div className="block w-full px-4  p-2 min-w-[35rem] ">
                    {sheetList.map((sheet) => (
                      <CartOnCart
                        key={sheet.id}
                        sheet={sheet}
                        handleCheck={handleCheckboxChange}
                        checkList={checkList}
                        onDeleteSheetCart={onDeleteSheetCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className=" w-full flex flex-col justify-center gap-1 items-center pt-[4rem]">
                    <FaceFrownIcon className=" h-8 w-8 text-blue-500" />
                    <h1 className=" text-gray-600 text-base font-medium">
                      Not found sheet in cart
                    </h1>
                    <button
                      onClick={() => setReloadComponent(true)}
                      className=" px-2 py-1 bg-blue-400 hover:bg-blue-300 text-white text-sm rounded-xl  shadow-md"
                    >
                      reload
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className=" w-full flex flex-col justify-center gap-1 items-center pt-[4rem]">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
          <div
            id="checkout"
            className="flex-[0.6] block bg-white rounded-xl shadow-md p-4 "
          >
            <strong className="flex items-center gap-2 text-base">
              <BanknotesIcon className="h-5 w-5" />
              Summary List
            </strong>
            <div className="block p-4 rounded-lg mb-3 mt-1">
              {checkList.map((sheet) => (
                <div key={sheet.id} className="flex p-1 justify-between border-b border-gray-100 mb-2 text-sm text-gray-600">
                  <span>
                    {sheet.course_code} -{" "}
                    <span className=" text-xs text-stone-500">
                      {sheet.name}
                    </span>
                  </span>
                  <span>{`${sheet.price} ฿`}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm mt-4">
                <strong>Grand Total</strong>
                <strong className=" font-sans">{` ${totalPrice} ฿`}</strong>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              {checkList.length > 0 && (
                <button
                  className="flex w-[40%] justify-center items-center hover:bg-stone-700 gap-1 p-2 bg-stone-900 text-white  text-sm rounded-md shadow-md"
                  onClick={() => handleCheckout()}
                >
                  <CreditCardIcon className=" h-4 w-4 text-white" />
                  <span>checkout</span>
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          id="footer-cart"
          className="sm:px-8 flex items-center justify-center "
        >
          <div
            className=" flex w-full lg:w-[80%] itemcenter justify-center flex-col md:flex-row bg-stone-100/90 
           rounded-md gap-4 p-8 sm:p-14 shadow-md border-t border-gray-200/50"
          >
            <span className=" flex-1 text-sm">
              <strong>Continue shopping</strong>
              <br />
              Continue shopping at the store. The website is ready to provide a
              good experience for users.
            </span>
            <div className=" flex-[0.7] flex items-center justify-center md:justify-end ">
              <Link className="flex items-center gap-1 p-3 bg-stone-900 hover:bg-stone-700 text-white uppercase text-xs rounded-lg shadow-md"
              href={"/store"} prefetch={true}>
                <BuildingStorefrontIcon className=" h-5 w-5 text-white" />
                <span>continue shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
