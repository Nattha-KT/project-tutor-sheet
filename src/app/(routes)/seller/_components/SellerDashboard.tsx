'use client'
import React, { useEffect, useState } from 'react'

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Link from 'next/link';
// import { fetchMetaData } from '../page';
import {useSession} from "next-auth/react";
import { storage } from '../../../../../firebaseConfig';
import { getDownloadURL, listAll, ref } from 'firebase/storage';


type Sheet={
  course_code:string,
  name:string,
  semester:string,
  type:string,
  year: string,
  price:number,
  status_approve:string,
  num_page: number,
  class_details:string,
  content_details:string,
  cover_page: string,
  date: string,
  sample_page: string[],
  file_path:string,
  sid:string,
}
 
const TABLE_HEAD = ["Course Name", "Price", "Status", "Date", ""];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    price:"35",
    name: "John Michael",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    price:"35",
    name: "Alexa Liras",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    price:"78",
    name: "Laurent Perrier",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    price:"87",
    name: "Michael Levi",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    price:"15",
    name: "Richard Gran",
    online: false,
    date: "04/10/21",
  },
];


export default function SellerDashboard({sheets}:{sheets:Sheet[]}) {

  const [urlList, setUrlList] = useState<string[]>([])

  const handleRetriveCoverImage = () => {
    const storageRef = ref(storage, `651b91e1310ade9c50dc20ce/6550efddfe956be9526dcc51/cover-page`);
  
    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          console.log("itemRef" + itemRef);
          getDownloadURL(itemRef).then((urlDownload) => {
            setUrlList((prevItems) => [...prevItems, urlDownload]);
            console.log("console Url List  => " + urlDownload);
            console.log("Updated Url List =>", urlList); 
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(()=>{
    handleRetriveCoverImage();
  },[]);

  return (
    
      <Card className="h-full w-12/12 lg:w-[1000px] max-w-[100%]  sm:p-5 mb-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Sheets list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all sheets
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
             <a href="/seller/view-all-sheet"> view all</a>
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <ClipboardDocumentIcon strokeWidth={2} className="h-4 w-4" />
              <Link href="/seller/new-sheet"> Add Sheet</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72 ">
            <Input
                label="Search"
                className=''
                icon={<MagnifyingGlassIcon className="h-5 w-5"/>} crossOrigin={undefined}/>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-gray-100 bg-gray-100 p-4 transition-colors hover:bg-gray-200"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheets&& sheets.map(
              ({ price, name, status_approve, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={urlList[0]} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
            
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price+` ฿`}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status_approve ? "approve" : "approve"}
                          color={status_approve ? "green" : "red"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(date).toDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      </Card>
  )
}