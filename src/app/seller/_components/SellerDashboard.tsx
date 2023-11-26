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
import Image from 'next/image';
import { Sheet } from '../../../../types/type';

interface SellerDashboardProps {
  dataSheets: Sheet[];
}
 
const TABLE_HEAD = ["Course Name", "Price", "Status", "Date", ""];
 

const SellerDashboard: React.FC<SellerDashboardProps> = ({ dataSheets }) =>  {

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSheets, setFilteredSheets] = useState<Sheet[]>([]); 
  const [totalPages, setTotalPages] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const itemsPerPage = 5; 

 console.log("dataSheets: " + dataSheets)


  useEffect(() => {

    const filteredSheets = dataSheets.filter(dataSheets => dataSheets.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredSheets(filteredSheets);

    if(filteredSheets.length > 0) {
       // คำนวณจำนวนหน้าทั้งหมด
    const total = Math.ceil(filteredSheets.length / itemsPerPage);
    setTotalPages(total);


    // กำหนดหน้าปัจจุบันให้ไม่เกินจำนวนหน้าทั้งหมด
    setCurrentPage(current => Math.min(current, total));
    }
   
  }, [ searchTerm, currentPage,dataSheets]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSheets.slice(indexOfFirstItem, indexOfLastItem);

 
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(current => current + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(current => current - 1);
    }
  };


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
             <a href="/seller/view-all"> view all</a>
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <ClipboardDocumentIcon strokeWidth={2} className="h-4 w-4" />
              <a href="/seller/new-sheet"> Add Sheet</a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72 ">
            <Input
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=''
                icon={<MagnifyingGlassIcon className="h-5 w-5"/>} crossOrigin={undefined}/>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left ">
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
            {currentItems&& currentItems.map(
              ({ cover_page,price, name, status_approve, date }, index) => {
                const isLast = index === dataSheets.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image width={2000} height={2000} src={cover_page} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
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
          {`Page ${currentPage} of ${totalPages}`}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm"
            onClick={handlePrevPage} disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button variant="outlined" size="sm"
           onClick={handleNextPage} disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
      </Card>
  )
}

export default SellerDashboard;