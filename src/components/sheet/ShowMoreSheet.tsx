'use client'
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline'
import SheetCard from "../store/SheetCard";
import { Seller, Sheet } from "../../../types/type";
 
interface DataSheet extends Sheet {
  seller: Seller;
}
interface ShowMoreProps {
  dataSheets: DataSheet[];
}

const  ShowMoreSheet:React.FC<ShowMoreProps>= ({dataSheets})=> {
  const [openAcc1, setOpenAcc1] = React.useState(true);
  // console.log(dataSheets);
 
 
  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);

 
  return (
      <Accordion open={openAcc1}>
        <AccordionHeader className="flex gap-x-4 justify-start" onClick={handleOpenAcc1}>
          <ChevronDoubleDownIcon className={` w-6 h-6 transform ${openAcc1 ? "rotate-180  " : ""}  duration-300 ease-in `}/>
          {`Show more sheet by ${dataSheets && dataSheets[0].seller.pen_name}`}
        </AccordionHeader>
        <AccordionBody className={" overflow-x-auto"}>
          <div className="h-auto max-h-[19.5rem] sm:max-h-none  max-w-7xl z-10 mx-auto px-5 py-4  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 sm:gap-x-5 gap-y-4 overflow-y-auto">
            {dataSheets && dataSheets.map((sheet) =>(
              <SheetCard key={sheet.id} sheet={sheet}   />
            ))}
          </div>
        </AccordionBody>
      </Accordion>
  );
}
export default ShowMoreSheet
