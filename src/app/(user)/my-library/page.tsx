"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import {
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  MagnifyingGlassCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Input, Tooltip } from "@material-tailwind/react";
import { getFavoriteSheet, getMyLibrary } from "@/services/client/user/api";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/error-page/Unauthorized";
import SearchFailed from "@/components/error-page/SearchFailed";
import useFile from "@/hooks/useFile";
import toast from "react-hot-toast";

type SheetCardLove = {
  id: string;
  name: string;
  course_code: string;
  semester: string;
  cover_page: string;
  year: string;
  type: string;
  price: number;
  file_path: string;
  num_page: number;
  sid: string;
  pen_name: string;
};

type OrderProps = {
  createdAt: string;
  sheetId: string[];
  sheets: SheetCardLove[];
};

type Props = {};

export default function Mylibrary({}: Props) {
  const { data: session } = useSession();
  const [orderCategorized, setorderCategorized] = useState<OrderProps[]>([]);
  const [filteredOrder, setFilteredOrder] = useState<OrderProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pending, setPending] = useState<boolean>(true);
  const { DownloadFileSDK } = useFile();

  const handleGetUrlFile = (path:string,name:string) => {
    try {
      DownloadFileSDK(path + "/file-pdf",name);
    } catch (error) {
      toast.error("Could not download file ")
      console.error("Error while handling file download:", error);
    }
  };

  const handleFilter = (orders: OrderProps[]) => {
    const filterOrders = orders.map((order) => {
      const filterSheet = order.sheets.filter((sheet) => {
        return (
          sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sheet.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sheet.pen_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      return {
        ...order,
        sheets: filterSheet,
      };
    });

    setFilteredOrder(filterOrders);
    return filterOrders;
  };

  const fetchLibrary = useCallback(async () => {
    const res = await getMyLibrary();
    if (!res) return;
    setorderCategorized(res);
    setFilteredOrder(res);
    setPending(false);
  }, []);

  useEffect(() => {
    setPending(true);
    fetchLibrary();
  }, []);

  useEffect(() => {
    handleFilter(orderCategorized);
  }, [searchTerm]);

  if (!session) {
    return (
      <div
        key={uuidv4()}
        className=" container flex items-center justify-center w-full"
      >
        <Unauthorized />
      </div>
    );
  }
  return (
    <div className=" container min-w-full">
      <section className=" flex justify-center items-center ">
        <div className=" container px-4 mx-auto pt-10 flex flex-col items-center">
          <div id="Head-Title" className=" flex justify-center">
            <div className=" w-full md:w-8/12 flex gap-0 items-center">
              <div className=" text-center w-auto md:w-screen max-w-full md:max-w-xl mx-auto mb-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.1, duration: 0.4 },
                  }}
                  viewport={{ once: true }}
                  className=" uppercase tracking-[3px] text-[25px] font-medium mb-1 inline-block text-gray-600"
                >
                  My Library
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0, duration: 0.3 },
                  }}
                  viewport={{ once: true }}
                  className=" flex justify-center mb-3"
                >
                  <Image
                    width={500}
                    height={500}
                    alt="Profile-image-show-left"
                    className="mask mask-parallelogram-4 w-[6rem] h-[6rem] object-cover mr-[-0.5rem]"
                    src="/images/ProfilePage1.jpg "
                  />
                  <Image
                    width={500}
                    height={500}
                    alt="Profile-image-show-right"
                    className="mask mask-parallelogram-3 w-[6rem] h-[6rem] object-cover ml-[-0.5rem]"
                    src="/images/ProfilePage2.jpg"
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 },
                  }}
                  viewport={{ once: true }}
                  className=" uppercase tracking-[3px] text-xs mb-5 inline-block text-gray-500"
                >
                  my-library makes it easier for you to search for your existing
                  sheets and download them.
                </motion.span>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { delay: 0, duration: 0.3 },
            }}
            viewport={{ once: true }}
            id="input-search"
            className="w-full flex items-center justify-center mb-10"
          >
            <div className="flex items-center gap-2 w-[80%] sm:w-[50%] p-1">
              <MagnifyingGlassCircleIcon className="h-8 w-8" />
              <Input
                label="Search items"
                className=" border-t border-t-gray-200"
                crossOrigin={undefined}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
          {!pending ? (
            <>
              {filteredOrder.length !== 0 ? (
                <>
                  {filteredOrder.map((order) => (
                    <div
                      key={uuidv4()}
                      id="categorized-date"
                      className=" w-full flex flex-col items-center px-[1rem] md:px-[3.5rem] mb-10"
                    >
                      <div
                        id="show-date"
                        className="flex w-full p-2 items-center"
                      >
                        <div className=" flex justify-start items-center gap-2 font-sans text-sm font-medium pb-1">
                          <CalendarDaysIcon className=" h-5 w-5 " />
                          Date:
                        </div>
                        <div className="flex-1 mx-2 flex flex-col items-stretch">
                          <div className=" flex-1 border-b-2 border-gray-200"></div>
                          <div className=" flex-1"></div>
                        </div>
                        <div className="flex md:justify-end items-center  font-sans text-xs font-normal pb-1 truncate">
                          {" "}
                          {new Date(order.createdAt).toDateString()}{" "}
                          {new Date(order.createdAt).toLocaleTimeString()}{" "}
                        </div>
                      </div>
                      <div
                        id="show-more-card"
                        className="grid grid-cols-1  min-w-full  gap-3 mb-6 py-2  px-2 sm:px-14 gap-y-6"
                      >
                        {order.sheets.map((sheet) => (
                          <div
                            key={sheet.id}
                            id="love-card"
                            className=" w-full flex justify-center "
                          >
                            <div
                              key={sheet.id}
                              className="block sm:flex  overflow-y-visible 
                    bg-stone-100 rounded-lg  shadow-md w-[70%] sm:w-full hover:translate-y-[-0.5rem]  transition-all duration-300 ease-in-out"
                            >
                              <div className="flex-[0.18] flex items-stretch p-0">
                                <Image
                                  src={sheet.cover_page}
                                  alt="covor-Sheet"
                                  decoding="async"
                                  data-nimg="1"
                                  width={820}
                                  height={320}
                                  className=" object-cover object-center max-h-[7rem]  sm:max-h-[8rem] w-full 
                          lg:max-w-[20rem] rounded-tl-lg sm:rounded-bl-lg  rounded-tr-lg sm:rounded-r-none "
                                />
                              </div>
                              <div className="flex-[0.7] w-full px-4 py-2 md:py-0 flex items-center">
                                <div className=" w-full">
                                  <div className=" flex flex-col gap-1 text-xs md:text-sm ">
                                    <span className=" text-sm sm:text-lg font-sans font-medium sm:font-semibold text-stone-800 truncate ">
                                      {sheet.course_code}&nbsp;-&nbsp;
                                      <strong className=" text-xs sm:text-sm font-semibold text-stone-600">
                                        {sheet.name}
                                      </strong>
                                    </span>

                                    <div className="flex flex-col justify-center gap-1 text-xs  font-sans truncate">
                                      <span>
                                        {`${sheet.type} ${sheet.semester}/${sheet.year}`}
                                        &nbsp;&nbsp; &nbsp;&nbsp;
                                        {`Total ${sheet.num_page} pages`}
                                      </span>
                                      <span className="flex space-x-2 ">
                                        <span className="flex gap-1 items-center font-normal sm:font-medium text-gray-600">
                                          <UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-stone-700" />
                                          {sheet.pen_name}
                                        </span>
                                        <span>&mdash;</span>
                                        <span>{sheet.price} ฿</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className=" flex-[0.18] flex bg-blue-100/40 sm:bg-transparent items-center justify-center rounded-b-lg">
                                <Tooltip content={"download file"}>
                                  <button className="gap-2 px-3 py-2 rounded-lg text-blue-500 hover:bg-stone-200"
                                       onClick={() => {
                                        handleGetUrlFile(sheet.file_path,sheet.name)
                                      }}>
                                    <ArrowDownTrayIcon className=" w-8 h-8 " />
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className=" w-full flex justify-center ">
                  <SearchFailed />
                </div>
              )}
            </>
          ) : (
            <div className=" col-span-2 w-full flex items-center justify-center">
              <span className="loading loading-dots  h-[10rem] w-[6rem]"></span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
