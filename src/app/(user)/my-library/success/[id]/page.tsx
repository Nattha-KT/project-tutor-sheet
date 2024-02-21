"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowDownTrayIcon,
  CursorArrowRaysIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { getOrderById } from "@/services/client/user/api";
import toast from "react-hot-toast";
import useFile from "@/hooks/useFile";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import ShowProduct from "../../_components/ShowProduct";
import { Rating } from "../../../../../../types/type";

type Order = {
  createdAt: string;
  sheetId: string;
  session_id: string;
  status: string;
  userId: string;
  sellers:any[]
  ratingsCheck: Rating[];
};

export default function SuccessPage({ params }: { params: { id: string } }) {
  const { id: orderId } = params;
  const [order, setOrder] = useState<Order>();
  const { DownloadFileSDK } = useFile();

  const handleGetUrlFile = () => {
    // await DownloadFileSDK(order?.sheets[0].file_path+"/file-pdf");
    try {
      if (!order) {
        toast.error("Error: Order not found");
        return;
      }
      // Download files for each sheet in the order
      for( const seller of order.sellers){
        seller.matchSheet.forEach((product:any) => {
          DownloadFileSDK(product.file_path + "/file-pdf", product.name);
        });
      }
    } catch (error) {
      console.error("Error while handling file download:", error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderById(orderId);
      if (!res || res.status !== "complete") {
        // window.location.href = "/my-library/cancel";
        console.log( "Error connot found OrderId")
        return;
      }
      setOrder(res);
    };
    fetchOrder();
  }, []);

  return (
    <div
      id="contain-success"
      key={uuidv4()}
      className="container min-w-full flex flex-col items-center justify-center gap-y-[20rem]"
    >
      <div
        id="result"
        className=" w-full flex flex-col items-center justify-center gap-4 pt-[7rem]"
      >
        <CheckCircleIcon className=" text-green-500 w-[7rem] h-[7rem]" />
        <div className=" flex gap-4 flex-col  justify-center">
          <div id="content" className=" flex flex-col gap-3 mb-6">
            <h1 className=" text-center text-3xl font-sans font-normal  text-gray-700">
              Successfully Purchased!
            </h1>
            <p className=" text-center text-sm font-sans font-light text-gray-500">
              {`Order number: ${orderId}   If something goes wrong, you can go to the complaint page to complain about the problem.`}
            </p>
          </div>
          <div
            id="contain-button"
            key={uuidv4()}
            className="  sm:w-full flex flex-col sm:flex-row gap-3 items-center  justify-center border-b pb-10 border-gray-200"
          >
            <Link
              scroll={false}
              prefetch={true}
              href={"/my-library"}
              key={uuidv4()}
              className="flex items-center bg-amber-500 gap-2 hover:bg-amber-400 scro border-0 text-white hover:text-gray-50 rounded-lg px-5 py-3 shadow-md"
            >
              <CursorArrowRaysIcon className=" wh-6 h-6 text-white" />
              Go My Library
            </Link>
            {order && (
              <button
                onClick={() => {
                  handleGetUrlFile();
                }}
                key={uuidv4()}
                className=" px-5 py-3 flex items-center bg-blue-400 hover:bg-blue-300 text-white rounded-lg shadow-md gap-2"
              >
                <ArrowDownTrayIcon className=" w-5 h-5 text-white" />
                Download all
              </button>
            )}
            <button
              onClick={() => {
                window.location.href = "/store";
              }}
              key={uuidv4()}
              className=" px-5 py-3 flex items-center bg-green-500 hover:bg-green-400 text-white rounded-lg shadow-md gap-2"
            >
              <ShoppingBagIcon className=" w-4 h-4 text-white" />
              Buy Again
            </button>
          </div>

          {order ? (
            <div id="link-section" className=" w-full flex justify-center">
              <Link
                href={"#contain-product"}
                key={uuidv4()}
                className=" border border-gray-200 text-gray-600 mt-6 bg-white shadow-md flex gap-2 items-center 
          rounded-lg hover:scale-105 px-4 py-2 hover:text-amber-400"
              >
                <StarIcon className=" h-6 w-6" />
                Give a star
              </Link>
            </div>
          ) : (
            <div className=" flex flex-col justify-center gap-1 items-center mx-6 text-gray-600">
              <span className="loading loading-spinner loading-lg"></span>
              กำลังเตรียมข้อมูล...
            </div>
          )}
        </div>
      </div>
      <section
        id="contain-product"
        className=" container min-w-full flex flex-col gap-3 py-5 px-4 items-center"
        key={uuidv4()}
      >
        <h1 className="w-full text-center text-[1.6rem] font-sans font-[550]  text-gray-700  uppercase">
          {" "}
          give a star
        </h1>
        <p className=" sm:px-[6rem] text-sm font-sans font-light text-gray-500 text-center mb-6">
          When you have successfully purchased a sheet and are satisfied with
          the store&apos;s service or the content of the sheet, you can rate it to
          indicate your satisfaction with the seller.
        </p>
        {order && order.sellers.map((seller) =>
          <ShowProduct  key={uuidv4()} orderProduct={seller} orderId={orderId} ratingsCheck={order.ratingsCheck} />
        )}
      </section>
    </div>
  );
}
