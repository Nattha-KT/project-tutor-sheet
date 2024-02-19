"use client";

import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Input,
} from "@material-tailwind/react";
import Image from "next/image";
import { Rate } from "antd";
import toast from "react-hot-toast";
import { giveRatingStar } from "@/services/client/user/api";
import { Rating } from "../../../../../types/type";

type SheetProduct = {
  course_code: string;
  cover_page: string;
  date: string;
  file_path: string;
  id: string;
  name: string;
  price: number;
  num_page: number;
  semester: string;
  sid: string;
  type: string;
  year: string;
};

type SellerOwnerProduct = {
  id: string;
  image: string;
  pen_name: string;
  matchSheet: SheetProduct[];
};

export default function ShowProduct({
  orderProduct,
  orderId,
  ratingsCheck,
}: {
  orderProduct: SellerOwnerProduct;
  orderId: string;
  ratingsCheck: Rating[];
}) {
  const [openAcc1, setOpenAcc1] = useState(false);
  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const [sellerRatings, setSellerRatings] = useState<{
    [sellerId: string]: number;
  }>({});
  const [productRatings, setProductRatings] = useState<{
    [productId: string]: { rating: number; sellerId: string };
  }>({});
  const [finished, setFinished] = useState<{
    [sellerId: string]: boolean;
  }>({});

  // const handleSubmitRatings = async () => {
  //   try {
  //     const products = Object.entries(productRatings).map(
  //       ([productId, rating]) => ({ productId, rating })
  //     );

  //     console.log("Ratings saved successfully");
  //   } catch (error) {
  //     console.error("Error saving ratings:", error);
  //   }
  // };

  const handleFinishSellerRating = (sellerId: string, value: number) => {
    setSellerRatings((prev) => ({
      ...prev,
      [sellerId]: value,
    }));
  };

  const handleChangeProductRating = (
    productId: string,
    rating: number,
    sellerId: string
  ) => {
    setProductRatings((prev) => ({
      ...prev,
      [productId]: { rating, sellerId },
    }));
  };

  const onFinshRating = async (
    sid: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    toast.loading("loading..", { id: "1" });

    try {
      // for (const [productId, { rating, sellerId }] of Object.entries(productRatings)) {
      // }
      const products = Object.entries(productRatings)
        .map(([productId, { rating, sellerId }]) => ({
          productId,
          rating,
          sellerId,
        }))
        .filter(({ sellerId }) => sellerId === sid);

      const filterSeller = Object.entries(sellerRatings)
        .map(([sellerId, rating]) => ({ sellerId, rating }))
        .filter(({ sellerId }) => sellerId === sid)
        .reduce((sellerRating) => sellerRating);

      const res = await giveRatingStar(filterSeller, products, orderId);
      if (!res) {
        toast.error("Error cannot save ratings", { id: "1" });
      } else {
        setFinished((prev) => ({
          ...prev,
          [sid]: true,
        }));
        toast.success("give rate star success!✨✨", { id: "1" });
      }

      console.log("Ratings saved successfully");
    } catch (error) {
      console.error("Error saving ratings:", error);
      toast.error("Error saving ratings", { id: "1" });
    }
  };

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  useEffect(() => {
    const uniqueSellerIds = new Set(ratingsCheck.map(rating => rating.sid));
    uniqueSellerIds.forEach(rating => {
      setFinished(prev => ({
        ...prev,
        [rating]: true,
      }));
    });
  }, [ratingsCheck]);

  return (
    <div
      id="show-product"
      className=" container w-full flex flex-col mb-10 gap-4"
    >
      <div
        id="contain-card-wrap"
        className=" flex flex-col px-4 pt-4 pb-0 bg-white rounded-xl shadow-md h-full border-t border-gray-100 "
      >
        <div
          id="card-wrap-sheet"
          className="  flex sm:flex-row flex-col justify-center  sm:justify-between items-center px-3"
        >
          <div className=" flex sm:flex-row flex-col justify-center  gap-3 items-center">
            <Image
              src={orderProduct.image || "/defaults/default.png"}
              width={1000}
              height={1000}
              alt="Profile"
              className=" rounded-full w-[6rem] h-[6rem] p-1 border border-gray-300"
            />
            <strong className=" text-gray-600 font-sans text-xl font-semibold">
              {orderProduct.pen_name} <br />
            </strong>
          </div>
          <div className=" flex flex-col gap-2">
            <div className=" flex sm:flex-row flex-col justify-center items-center gap-3">
              <span className=" text-xs text-gray-500 pt-2">ให้คะแนน</span>
              <Rate
                key={uuidv4()}
                tooltips={desc}
                disabled={finished[orderProduct.id] || false}
                allowHalf
                defaultValue={sellerRatings[orderProduct.id]}
                onChange={(value) =>
                  handleFinishSellerRating(orderProduct.id, value)
                }
              />
              <button
                className={` px-2 py-1 flex items-center gap-2  rounded-lg shadow-md ${
                  finished[orderProduct.id]
                    ? " bg-gray-100 text-xs font-light text-gray-6s00"
                    : "  bg-sky-500 hover:bg-sky-400   font-mono text-sm text-white "
                } `}
                disabled={finished[orderProduct.id] || false}
                onClick={(e) => onFinshRating(orderProduct.id, e)}
              >
                เสร็จสิ้น
              </button>
            </div>
            <span className=" text-gray-500 font-thin text-xs">
              Note: Don't forget to rate the sheet before clicking finish.
            </span>
          </div>
        </div>
        <Accordion open={openAcc1} placeholder={undefined} className="pb-1 ">
          <AccordionHeader
            onClick={handleOpenAcc1}
            placeholder={undefined}
            className="flex  gap-x-2 justify-center text-gray-500 font-semibold text-md "
          >
            <ChevronDoubleDownIcon
              className={` w-6 h-6 transform  ${
                openAcc1 ? "rotate-180 " : ""
              }  duration-300 ease-in`}
            />
            show more
          </AccordionHeader>
          <AccordionBody className={" flex justify-center  overflow-x-auto"}>
            <div
              id="show-card-sheet"
              className=" container py-5 px-10 md:px-10 w-full flex flex-col items-center justify-center min-h-[20rem] gap-y-[3.5rem]  "
            >
              {orderProduct.matchSheet.map((product) => (
                <div
                  key={uuidv4()}
                  id="card-sheet-star"
                  className="w-full flex flex-col md:flex-row items-stretch md:justify-between   border-b border-gray-200 pb-5 px-6 shadow-sm"
                >
                  <div className=" flex flex-col md:flex-row gap-6 items-center">
                    <Image
                      src={product.cover_page}
                      width={1000}
                      height={1000}
                      alt="Profile"
                      className=" rounded-md md:w-[6rem] md:h-[7rem] w-[5rem] h-[6rem] object-cover  "
                    />
                    <span className=" flex flex-col items-center md:items-start gap-2 text-xs text-gray-500 font-normal">
                      <strong className="  flex flex-col md:flex-row items-center text-lg font-semibold text-gray-600 truncate">
                        <span>{product.course_code}-</span>
                        <span className=" w-[80%] text-sm font-normal text-stone-500  truncate">
                          {product.name}
                        </span>
                      </strong>
                      <span>Price: {product.price} ฿</span>
                      <p>
                        <span>
                          Final 1/2023 &nbsp;&nbsp; Total {product.num_page}{" "}
                          Pages
                        </span>
                        <br />
                      </p>
                    </span>
                  </div>
                  <div className=" flex sm:flex-row flex-col justify-center items-center gap-3">
                    <span className=" text-xs text-gray-500 pt-2">
                      ให้คะแนน
                    </span>
                    <Rate
                      key={uuidv4()}
                      tooltips={desc}
                      disabled={finished[orderProduct.id] || false}
                      allowHalf
                      defaultValue={productRatings[product.id]?.rating || 0}
                      onChange={(value) => {
                        handleChangeProductRating(
                          product.id,
                          value,
                          orderProduct.id
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}
