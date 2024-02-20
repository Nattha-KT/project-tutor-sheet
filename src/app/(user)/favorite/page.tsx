"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { getFavoriteSheet } from "@/services/client/user/api";
import NotFound from "@/components/error-page/NotFound";
import HeartBtn from "@/components/buttons/HeartBtn";
import ButtonCartLoveSheet from "./_components/ButtonCartLoveSheet";
import { useSession } from "next-auth/react";
import Unauthorized from "@/components/error-page/Unauthorized";
import Link from "next/link";
import SearchFailed from "@/components/error-page/SearchFailed";

type SheetCardLove = {
  id: string;
  name: string;
  course_code: string;
  semester: string;
  cover_page: string;
  year: string;
  type: string;
  price: number;
  num_page: number;
  sid: string;
  pen_name: string;
  favorite: boolean;
  inCart: boolean;
  owner: boolean;
};
export default function FavoritePage() {
  const { data: session } = useSession();
  const [sheets, setSheets] = useState<SheetCardLove[]>([]);
  const [filteredSheets, setFilteredSheets] = useState<SheetCardLove[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pending, setPending] = useState<boolean>(true);

  const handleFilter = (dataSheets: SheetCardLove[]) => {
    const filter = dataSheets.filter((sheet) => {
      return (
        sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheet.course_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sheet.pen_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredSheets(filter);
    return filter;
  };

  const fetchSheetLove = useCallback(async () => {
    const res = await getFavoriteSheet();
    if (!res) return;
    setSheets(res);
    setFilteredSheets(res);
    setPending(false);
  }, []);

  useEffect(() => {
    setPending(true);
    fetchSheetLove();
  }, []);

  useEffect(() => {
    handleFilter(sheets);
  }, [searchTerm]);

  if (!session) {
    return (
      <div className=" container flex items-center justify-center w-full">
        <Unauthorized />
      </div>
    );
  }

  return (
    <div className=" container min-w-full">
      <section className=" flex justify-center items-center ">
        <div className=" container px-4 mx-auto pt-10">
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
                  My Favorite Sheets
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
                    alt="Profile-image-show"
                    className="mask mask-heart w-[5rem] h-[5rem]"
                    src="/images/bg1.jpg"
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
                  Find and manage sheets you've liked and add the sheets you
                  love to your shopping cart.
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
                className=" border-t border-t-gray-300/40"
                crossOrigin={undefined}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
          <div
            id="show-more-card"
            className="grid grid-cols-1 lg:grid-cols-2  min-w-full  gap-3 mb-6 py-2  px-2 sm:px-14 gap-y-6"
          >
            {!pending ? (
              <>
                {filteredSheets.length !== 0 ? (
                  filteredSheets.map((sheet) => (
                    <div
                      key={uuidv4()}
                      id="love-card"
                      className=" w-full flex justify-center "
                    >
                      <Link
                        href={`/store/info-sheet/${sheet.id}`}
                        key={sheet.id}
                        className="block sm:flex hover:cursor-pointer overflow-y-visible 
                    bg-stone-100 rounded-lg  shadow-lg w-[70%] sm:w-full hover:translate-y-[-0.5rem]  transition-all duration-300 ease-in-out"
                      >
                        <div className="flex-[0.25] flex items-stretch p-0">
                          <Image
                            src={sheet.cover_page}
                            alt="Covor Sheet"
                            width={820}
                            height={320}
                            className=" object-cover object-center max-h-[7rem]  sm:max-h-[8rem] w-full 
                          lg:max-w-[20rem] rounded-tl-lg sm:rounded-bl-lg  rounded-tr-lg sm:rounded-r-none "
                          />
                        </div>
                        <div className="flex-1 w-full px-4 py-2 md:py-0 flex items-center">
                          <div className=" w-full">
                            <div className=" text-xs md:text-sm ">
                              <div className="flex items-center justify-between leading-[0] relative text-stone-600 mb-[-0.3rem]">
                                <span className=" font-sans text-base sm:text-lg font-semibold text-stone-800 truncate">
                                  {sheet.course_code}&nbsp;-&nbsp;
                                  <strong className=" text-sm font-semibold text-stone-500 ">
                                    {sheet.name}
                                  </strong>
                                </span>
                                <div className=" flex items-center rounded-full hover:bg-white p-2">
                                  {sheet.id && (
                                    <HeartBtn
                                      sheetId={sheet.id}
                                      favorite={
                                        sheet.favorite ? sheet.favorite : false
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 font-sans text-xs ">
                                <span className=" truncate">
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
                              <div className="flex font-sans space-x-2 text-xs truncate">
                                <strong className=" text-gray-600">
                                  {sheet.pen_name}
                                </strong>
                                <span>&mdash;</span>
                                <span>{sheet.price} ฿</span>
                              </div>
                              <ButtonCartLoveSheet
                                inCart={sheet.inCart}
                                sheetId={sheet.id}
                                owner={sheet.owner!}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className=" w-full col-span-2 ">
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
        </div>
      </section>
    </div>
  );
}
