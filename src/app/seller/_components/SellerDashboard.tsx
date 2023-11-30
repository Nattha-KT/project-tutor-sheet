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
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Image from 'next/image';
import { Sheet } from '../../../../types/type';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../../../../firebaseConfig';

interface SheetsProps extends Sheet {
  id: string;
}

interface SellerDashboardProps {
  dataSheets: SheetsProps[];
}
 
const TABLE_HEAD = ["Course Name", "Price", "Status", "Date", ""];
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
 

const SellerDashboard: React.FC<SellerDashboardProps> = ({ dataSheets }) =>  {

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSheets, setFilteredSheets] = useState<SheetsProps[]>([]); 
  const [totalPages, setTotalPages] = useState(1); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const itemsPerPage = 5; 
  const [approve,setApprove] = useState("all")

  
  const handleFilter = (approve: string, dataSheets: SheetsProps[]) => {
  
    const filter = dataSheets.filter((sheet) => {
      if (approve === "all" || sheet.status_approve.toString() === approve) {
        return sheet.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
  
    setFilteredSheets(filter);
    return filter;
  };


  useEffect(() => {
    console.log(approve)

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
    
      <Card className="h-full w-12/12 lg:w-[1200px] max-w-[100%]  sm:p-5 mb-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-2 sm:gap-8">
          <div>
              <div className='ml-[-45px]'>
                  <svg width="250" height="100" viewBox="0 0 370.02912621359224 41.62478677853547" className="css-1j8o68f">
                    <g id="SvgjsG8447"  transform="matrix(1.0947653180340888,0,0,1.0947653180340888,69.93085781167518,-7.128581892032308)" fill="#1e293b">
                      <path d="M11.543 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l7.8125 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 l-5.0586 0 l0 19.746 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M3.7305 17.5 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M36.0159375 40 q-4.16015625 0 -7.34375 -2.67578125 q-0.80078125 -0.68359375 -1.58203125 -1.77734375 t-1.3184 -2.6367 t-0.53711 -3.5938 l0 -14.57 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 t1.9434 0.81055 t0.81055 1.9434 l0 14.57 q0 1.9140625 0.810546875 3.046875 t2.0215 1.6309 t2.4414 0.49805 q1.2109375 0 2.421875 -0.498046875 t2.0215 -1.6309 t0.81055 -3.0469 l0 -6.9141 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q1.15234375 0 1.953125 0.810546875 t0.80078 1.9434 l0 6.9141 q0 2.05078125 -0.52734375 3.59375 t-1.3184 2.6367 t-1.5918 1.7773 q-3.18359375 2.67578125 -7.32421875 2.67578125 z M44.0239375 17.5 q-1.1328125 0 -1.943359375 -0.80078125 t-0.81055 -1.9531 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q1.15234375 0 1.953125 0.810546875 t0.80078 1.9434 q0 1.15234375 -0.80078125 1.953125 t-1.9531 0.80078 z M60.46878125 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l7.8125 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 l-5.0586 0 l0 19.746 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M52.65628125 17.5 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M87.96871875 40 q3.84765625 0 7.03125 -1.89453125 t5.0781 -5.0684 t1.8945 -7.0215 q0 -3.73046875 -1.9140625 -7.0703125 q-1.85546875 -3.14453125 -4.98046875 -5.01953125 q-0.703125 -0.37109375 -1.42578125 -0.37109375 q-0.33203125 0 -1.03515625 0.17578125 t-1.3281 1.1719 q-0.37109375 0.6640625 -0.37109375 1.3671875 q0 0.3515625 0.185546875 1.07421875 t1.1621 1.3281 q1.97265625 1.171875 3.0859375 3.125 t1.1133 4.2188 q0 2.32421875 -1.142578125 4.248046875 t-3.0762 3.0762 t-4.2773 1.1523 q-2.32421875 0 -4.2578125 -1.15234375 t-3.0859 -3.0762 t-1.1523 -4.248 q0 -0.703125 0.1171875 -1.38671875 l0.039063 -0.42969 q0 -0.8984375 -0.5859375 -1.69921875 q-0.7421875 -1.03515625 -2.1875 -1.03515625 q-0.8984375 0 -1.69921875 0.576171875 t-0.99609 1.709 t-0.19531 2.2656 q0 3.84765625 1.89453125 7.021484375 t5.0684 5.0684 t7.041 1.8945 z M109.02348125 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -11.25 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l9.7266 0 q1.7578125 0 2.40234375 -1.25 q0.41015625 -0.76171875 0.41015625 -1.62109375 q0 -0.83984375 -0.41015625 -1.6015625 q-0.64453125 -1.26953125 -2.40234375 -1.26953125 q-1.1328125 0 -1.943359375 -0.80078125 t-0.81055 -1.9531 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q3.75 0 6.25 2.6953125 q2.0703125 2.48046875 2.0703125 5.68359375 q0 3.22265625 -2.0703125 5.68359375 q-2.5 2.6953125 -6.25 2.6953125 l-6.9727 0 l0 8.4961 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M124.29678125 40 q-0.7421875 0 -1.42578125 -0.41015625 t-1.0352 -1.1328 l-2.4023 -4.8242 q-0.2734375 -0.625 -0.2734375 -1.23046875 q0 -1.640625 1.54296875 -2.4609375 q0.625 -0.29296875 1.23046875 -0.29296875 q1.640625 0 2.44140625 1.54296875 l2.4023 4.8438 q0.2734375 0.60546875 0.2734375 1.23046875 q0 1.640625 -1.54296875 2.44140625 q-0.60546875 0.29296875 -1.2109375 0.29296875 z M148.2421875 27.969 q1.1328125 0 1.943359375 -0.810546875 t0.81055 -1.9434 t-0.81055 -1.9434 t-1.9434 -0.81055 l-14.902 0 q-1.1328125 0 -1.943359375 0.810546875 t-0.81055 1.9434 t0.81055 1.9434 t1.9434 0.81055 l14.902 0 z M165.11684375 40 q-2.6171875 0 -4.970703125 -0.927734375 t-3.9355 -2.6074 q-0.72265625 -0.859375 -0.72265625 -1.875 q0 -0.05859375 0.01953125 -0.64453125 t0.87891 -1.3867 q0.8203125 -0.703125 1.81640625 -0.703125 q0.078125 0 0.6640625 0.01953125 t1.4063 0.87891 q1.15234375 1.15234375 3.18359375 1.5625 q0.859375 0.15625 1.6796875 0.15625 q1.15234375 0 2.24609375 -0.3125 q1.62109375 -0.5859375 1.953125 -1.58203125 q0.13671875 -0.44921875 0.13671875 -0.8984375 t-0.23438 -0.85938 q-0.46875 -0.83984375 -4.6484375 -1.89453125 q-1.58203125 -0.41015625 -3.14453125 -0.9375 q-6.15234375 -2.109375 -6.15234375 -7.6171875 q0 -4.4140625 3.76953125 -6.796875 q2.578125 -1.58203125 6.07421875 -1.58203125 q1.328125 0 2.119140625 0.810546875 t0.79102 1.9824 q-0.05859375 1.15234375 -0.849609375 1.93359375 t-1.9043 0.78125 l-0.17578 0 q-2.28515625 0 -3.57421875 1.0546875 q-0.76171875 0.625 -0.76171875 1.85546875 q0 0.5859375 0.283203125 1.083984375 t1.4258 0.99609 t3.5254 1.1035 q1.50390625 0.390625 3.0078125 0.87890625 t2.7734 1.3281 q3.1640625 2.12890625 3.1640625 5.83984375 q0 0.44921875 -0.0390625 0.91796875 q-0.60546875 5 -5.8203125 6.8359375 q-1.9140625 0.60546875 -3.984375 0.60546875 z M171.97284375 20.078 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 q0 -1.15234375 0.80078125 -1.953125 t1.9531 -0.80078 q1.1328125 0 1.943359375 0.80078125 t0.81055 1.9531 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M182.0117625 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 l0 22.5 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M198.9840625 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 l0 22.5 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M190.3520625 28.75 q-1.1328125 0 -1.943359375 -0.80078125 t-0.81055 -1.9531 q0 -1.1328125 0.810546875 -1.943359375 t1.9434 -0.81055 q1.15234375 0 1.953125 0.810546875 t0.80078 1.9434 q0 1.15234375 -0.80078125 1.953125 t-1.9531 0.80078 z M223.53503125 40 l-14.355 0 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 t0.80078 -1.9434 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 t-0.81055 1.9434 t-1.9434 0.81055 z M223.53503125 17.5 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M223.53503125 28.75 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M247.499875 40 l-14.355 0 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 t0.80078 -1.9434 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 t-0.81055 1.9434 t-1.9434 0.81055 z M247.499875 17.5 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M247.499875 28.75 l-14.355 0 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l14.355 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z M263.55471875 40 q-1.15234375 0 -1.953125 -0.810546875 t-0.80078 -1.9434 l0 -22.5 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 l7.8125 0 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 l-5.0586 0 l0 19.746 q0 1.1328125 -0.810546875 1.943359375 t-1.9434 0.81055 z M255.74221875 17.5 q-1.15234375 0 -1.953125 -0.80078125 t-0.80078 -1.9531 q0 -1.1328125 0.80078125 -1.943359375 t1.9531 -0.81055 q1.1328125 0 1.943359375 0.810546875 t0.81055 1.9434 q0 1.15234375 -0.810546875 1.953125 t-1.9434 0.80078 z"></path>
                    </g>
                  </svg>
              </div>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all sheets
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="md">
             <a href="/seller/view-all"> view all</a>
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <ClipboardDocumentIcon strokeWidth={2} className="h-4 w-4" />
              <a href="/seller/new-sheet"> Add Sheet</a>
            </Button>
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
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map(
              ({ id,name,cover_page,price, status_approve, date }, index) => {
                return (
                  <tr key={id}>
                    <td className="p-4">
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
                    <td className="p-4">
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
                    <td className="p-4">
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status_approve ? "approve" : "approve"}
                          color={status_approve ? "green" : "red"}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(date).toDateString()}
                      </Typography>
                    </td>
                    <td className="p-4">
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