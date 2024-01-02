
Head
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import Head from "next/head";
import { Seller, Sheet } from "../../../types/type";
import { v4 as uuidv4 } from 'uuid';

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-400"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface TooptipProps extends Sheet {
  seller : Seller
}
 
const TooltipCustomStyles: React.FC<TooptipProps> =({seller,date,content_details,class_details}) =>{
  return (
    <Tooltip
    key={uuidv4()}
      placement="bottom"
      className=" bg-white px-4 py-3 shadow-md shadow-black/10"
      content={
        <div className="w-80">
          <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
              <Avatar
                size="lg"
                variant="circular"
                src={seller.image}
                alt="tania andrew"
              />
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray">
                    {seller.pen_name}
                  </Typography>
                  <div className="5 flex items-center gap-0">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
                <Typography color="blue-gray">{seller.full_name}</Typography>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography className=" ">
              <p className="font-normal text-base text-gray-700">
                <span className="font-bold text-stone-800">Date:</span> {date && new Date(date).toDateString()}<br></br>
                <span className="font-bold text-stone-800">Class Detail:</span> {class_details};<br></br>
                <span className="font-bold text-stone-800">Content Detail:</span> {content_details}
              </p>

              </Typography>
            </CardBody>
          
          </Card>
        </div>
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 cursor-pointer text-blue-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
  );
}

export default  TooltipCustomStyles;