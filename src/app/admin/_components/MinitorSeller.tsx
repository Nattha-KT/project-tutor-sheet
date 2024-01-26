"use client";
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {  UserGroupIcon,IdentificationIcon } from "@heroicons/react/24/solid";
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
import Image from "next/image";
import { Seller } from "../../../../types/type";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MonitorProps extends Seller {
  sellers: Seller[];
}

export default function MonitorSeller({ sellers }: any) {

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSheets, setFilteredSheets] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  const TABLE_HEAD = ["Name", "Pen name", "Tel", "Bank", `Total uplaod`, ""];

  const handleFilter = (sellers: any[]) => {
    const filter = sellers.filter((seller) => {
      return (
        seller.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.pen_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredSheets(filter);
    return filter;
  };

  useEffect(() => {
    const filter = handleFilter(sellers);
    if (filter.length > 0) {
      // คำนวณจำนวนหน้าทั้งหมด
      const total = Math.ceil(filter.length / itemsPerPage);
      setTotalPages(total);

      // กำหนดหน้าปัจจุบันให้ไม่เกินจำนวนหน้าทั้งหมด
      setCurrentPage((current) => Math.min(current, total));
    }
  }, [searchTerm, sellers]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredSheets.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((current) => current + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((current) => current - 1);
    }
  };

  return (
    <Card className="h-full sm:p-5 mb-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className=" mb-5">
          <div className=" flex gap-4 items-center mb-3">
            <UserGroupIcon className=" w-12 h-12 text-amber-400" />
            <p className=" text-3xl font-[800] text-slate-700 font-sans ">
              Seller Account
            </p>
          </div>
          <Typography color="gray" className="mt-1 font-normal">
             Information about the seller and access to basic information  needed to identify the seller <br/> and complete the transaction.
          </Typography>
        </div>
        <div className="flex justify-end">
          <div className="w-full md:w-[32rem] p-4">
            <Input
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=""
              icon={<MagnifyingGlassIcon className="h-5 w-5 " />}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 py-0 sm:rounded-xl">
        <table className="w-full min-w-max table-auto text-left bg-slate-50 ">
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
                      <ChevronUpDownIcon className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((seller, index) => {
                return (
                  <tr key={seller.id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              width={2000}
                              height={2000}
                              src={seller.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {seller.full_name}
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
                          {seller.pen_name}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {seller.phone}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {seller.bank_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal pl-7"
                      >
                        {seller.sheetCount}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Seller Detail">
                        <Link className=" w-8 h-8 rounded-lg p-2 flex items-center justify-center hover:bg-gray-200" href={`monitor-seller/${seller.id}`}>
                          <IdentificationIcon className="h-4 w-4" />
                        </Link>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {`Page ${currentPage} of ${totalPages}`}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
