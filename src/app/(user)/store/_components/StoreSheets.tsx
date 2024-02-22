"use client";
import { Sheet, Seller } from "../../../../../types/type";
import { useDropdownFilter } from "@/hooks/useFilter";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/store/SearchBar";
import SheetCard from "@/components/store/SheetCard";
import Image from "next/image";
import NotFound from "@/components/error-page/NotFound";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

interface ExtendedSheet extends Sheet {
  id: string;
  seller: Seller;
}
interface SheetsProps {
  dataSheets: ExtendedSheet[];
}

export default function StoreSheets({ dataSheets }: SheetsProps) {
  const [filteredSheets, setFilteredSheets] = useState<ExtendedSheet[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  // const [reloadComponent, setReloadComponent] = useState(true);

  const useDropdown = useDropdownFilter();
  const { type, year, price, semester, applyFiltersAndSort } = useDropdown;

  useEffect(() => {
    const currentValues: string[] = [type, year, price, semester];
    const result = applyFiltersAndSort(dataSheets, currentValues);
    setFilteredSheets(result);
    setPending(false);
  }, [year, price, semester, type, dataSheets]);

  return (
    <>
      <SearchBar
        className=" relative z-[20]"
        useDropdown={useDropdown}
        pathSearch={""}
      />
      {!pending ? (
        <>
          {filteredSheets.length !== 0 ? (
            <section className=" h-auto max-w-7xl z-10 mx-auto px-5  justify-center  grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-4">
              {filteredSheets.map((sheet) => (
                <SheetCard key={sheet.id} sheet={sheet}></SheetCard>
              ))}
            </section>
          ) : (
            <div className=" w-full flex flex-col justify-center gap-1 items-center pt-[4rem]">
              <FaceFrownIcon className=" h-24 w-24 text-blue-500" />
              <h1 className=" text-gray-600 text-base font-medium">
                Not found sheets
              </h1>
              {/* <button
            // onClick={() => setReloadComponent(true)}
            className=" px-2 py-1 bg-blue-400 hover:bg-blue-300 text-white text-sm rounded-xl  shadow-md"
          >
            reload
          </button> */}
            </div>
          )}
        </>
      ) : (
        <div className=" col-span-2 w-full flex items-center justify-center">
          <span className="loading loading-dots  h-[10rem] w-[6rem]"></span>
        </div>
      )}
    </>
  );
}
