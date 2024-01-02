'use client'
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline'
import FormCard from "../store/FormCard";
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
          <ChevronDoubleDownIcon className="w-6 h-6"/>
          {`Show more sheet by ${dataSheets[0].seller.pen_name}`}
        </AccordionHeader>
        <AccordionBody>
          <div className="flex justify-center w-full">
            <FormCard filteredSheets={dataSheets}   />
          </div>
        </AccordionBody>
      </Accordion>
  );
}
export default ShowMoreSheet
