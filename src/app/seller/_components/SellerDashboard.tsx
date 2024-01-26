'use client'
import React, { useEffect, useState } from 'react'
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, ClipboardDocumentIcon ,BookOpenIcon} from "@heroicons/react/24/solid";
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
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Image from 'next/image';
import { Sheet } from '../../../../types/type';
import { v4 as uuidv4 } from 'uuid';
import { DialogEditSheet } from '@/components/dialog';

interface SheetsProps extends Sheet {
  id: string;
}

interface SellerDashboardProps {
  dataSheets: SheetsProps[];
}
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "true",
  },
  {
    label: "Unapproved",
    value: "false",
  },
];
 
// , `Total(${dataSheets.length})`
const SellerDashboard: React.FC<SellerDashboardProps> = ({ dataSheets }) =>  {

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSheets, setFilteredSheets] = useState<SheetsProps[]>([]); 
  const [totalPages, setTotalPages] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const itemsPerPage = 5; 
  const [approve,setApprove] = useState("all")
  const TABLE_HEAD = ["Course Name", "Price", "Status", "Date",""];
  
  const handleFilter = (approve: string, dataSheets: SheetsProps[]) => {
  
    const filter = dataSheets.filter((sheet) => {
      if (approve === "all" || sheet.status_approve!.toString() === approve) {
        return sheet.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  
    setFilteredSheets(filter);
    return filter;
  };


  useEffect(() => {

    const filter = handleFilter(approve,dataSheets);

    if(filter.length > 0) {
       // คำนวณจำนวนหน้าทั้งหมด
    const total = Math.ceil(filter.length / itemsPerPage);
    setTotalPages(total);

    // กำหนดหน้าปัจจุบันให้ไม่เกินจำนวนหน้าทั้งหมด
    setCurrentPage(current => Math.min(current, total));
    }
  }, [ searchTerm,approve,dataSheets]);



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredSheets.slice(indexOfFirstItem, indexOfLastItem);

 
 
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
      <Card className="h-full sm:p-5 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center flex-col sm:flex-row md:justify-between gap-2 sm:gap-8">
          <div>
              <div className=' flex gap-4 items-center'>
                <h1 className=' text-2xl font-sans font-bold text-slate-800'>DASHBOARD SHEET</h1>
                <BookOpenIcon className=' h-8 w-8 text-amber-400'/>
              </div>
            <Typography color="gray" className="mt-1 font-normal text-center sm:text-left">
              See information about all sheets
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="md" onClick={()=>{window.location.href="/seller/view-all"}}>

             view all
            </Button>
            <a className="btn bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-3" href="/seller/new-sheet">
              <ClipboardDocumentIcon  className="h-4 w-4" />
              Add Sheet
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full md:w-max">
            <TabsHeader className=' bg-stone-200'>
              {TABS.map(({ label, value }) => (
                <Tab key={uuidv4()} value={value} onClick={()=>{setApprove(value)}}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
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
      <CardBody className="overflow-x-scroll px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left bg-slate-50 ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-stone-100 bg-stone-200 p-4 transition-colors hover:bg-stone-300"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-semibold leading-none opacity-70 text-stone-900"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon  className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map(
              (sheet, index) => {
                return (
                  <tr key={sheet.id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image width={2000} height={2000} src={sheet.cover_page} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {sheet.name}
                          </Typography>
            
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sheet.price+` ฿`}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={sheet.status_approve ? "approve" : "approve"}
                          color={sheet.status_approve ? "green" : "red"}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(sheet.date!).toDateString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Edit Detail">
                        <IconButton variant="text"
                          onClick={() => (document.getElementById(`${sheet.id}`) as HTMLDialogElement).showModal()}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <DialogEditSheet name_id={`${sheet.id}`} sheet={sheet} />
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