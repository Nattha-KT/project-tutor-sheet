'use client'
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Seller, Sheet } from "../../types/type";

interface TooptipProps extends Sheet {
  seller: Seller;
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-yellow-400"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}


const  CardProfile: React.FC<TooptipProps> =({seller})=>{
  return (

      <Card color="transparent" shadow={false} className="w-full gap-y-4">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-4"
        >
          <Avatar
            size="xl"
            variant="circular"
            className=" max-[768px]:w-[2.5rem] max-[768px]:h-[2.5rem]"
            src={seller.image}
            alt="tania andrew"
          />
          <div className="flex w-full flex-col gap-0 md:gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" className=" text-lg md:text-2xl">
                {seller.pen_name}
              </Typography>
              <div className="5 flex items-center gap-0">
                <p className="text-gray-500 mr-1">{`(5.0)`}</p>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <Typography color="blue-gray" className="text-[1rem] md:text-[1.1rem]">
              {seller.full_name}
            </Typography>
          </div>
        </CardHeader>
        {/* <CardBody className="mb-6 p-0">
              <Typography className="px-3 ">
              <p className="font-normal text-[1rem] md:text-[1.1rem] text-gray-700">
                <span className=" font-medium text-gray-800 ">Date Update:</span> {new Date(date).toDateString()}<br></br>
                <span >{`"${suggest}"`}</span> 
              </p>

              </Typography>
            </CardBody> */}
      </Card>
  );
}

export default CardProfile
