'use client'
import React from "react";
import { Rating, Typography } from "@material-tailwind/react";
 
export function RatingStar() {
 
  return (
    <div className="flex items-center gap-2 font-medium text-blue-gray-500 md:flex-row flex-col">
       <div className=" flex gap-x-2">
        <Rating value={4} className=" text-gray-600" readonly  ratedColor="amber" unratedColor="amber"  placeholder={undefined}/>
        {`(${4}.7)`}
       </div>
      <Typography color="blue-gray" className=" font-normal  text-gray-600 overflow-x-hidden"  placeholder={undefined}>
        star rating
      </Typography>
    </div>
  );
}