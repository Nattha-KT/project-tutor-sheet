"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Seller, Sheet } from "../../types/type";
import { Rate } from "antd";
import { useRouter } from "next/navigation";

interface TooptipProps  {
  seller: Seller;
  ratingSeller:number
}

const CardProfile: React.FC<TooptipProps> = ({ seller,ratingSeller }) => {
  const router = useRouter();

  return (
    <Tooltip content={"Profile Seller"} placement="bottom">
      <Card
        color="transparent"
        shadow={false}
        className="w-full gap-y-4"
        placeholder={undefined}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-4"
          placeholder={undefined}
        >
          <Avatar
            size="xl"
            variant="circular"
            className=" max-[768px]:w-[2.5rem] max-[768px]:h-[2.5rem]"
            src={seller.image}
            alt="tania andrew"
            placeholder={undefined}
          />
          <div className="flex w-full flex-col gap-0 md:gap-0.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className=" hover:text-gray-500 text-lg md:text-2xl hover:cursor-pointer"
                onClick={() => {
                  router.push(`/store/profile/${seller.id}`);
                }}
                placeholder={undefined}
              >
                {seller.pen_name}
              </Typography>
              <div className=" flex items-center gap-0">
                <p className="text-gray-500 mr-1">{`(${ratingSeller})`}</p>
                <Rate
                  allowHalf
                  disabled
                  defaultValue={ratingSeller?ratingSeller:0}
                  className=" mt-[-0.5rem]"
                />
              </div>
            </div>
            <Typography
              color="blue-gray"
              className="text-xs md:text-sm"
              placeholder={undefined}
            >
              {seller.full_name}
            </Typography>
          </div>
        </CardHeader>
      </Card>
    </Tooltip>
  );
};

export default CardProfile;
