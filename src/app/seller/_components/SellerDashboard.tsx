"use client";
import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  PencilIcon,
  DocumentPlusIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
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
import { Sheet } from "../../../../types/type";
import { v4 as uuidv4 } from "uuid";
import { DialogEditSheet } from "@/components/dialog";
import Link from "next/link";

interface SellerDashboardProps {
  dataSheets: Sheet[];
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
    label: "Pending",
    value: "false",
  },
];

// , `Total(${dataSheets.length})`
const SellerDashboard: React.FC<SellerDashboardProps> = ({ dataSheets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSheets, setFilteredSheets] = useState<Sheet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [approve, setApprove] = useState("all");
  const TABLE_HEAD = ["Course Name", "Price", "Status", "Date", ""];

  const handleFilter = () => {
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
    const filter = handleFilter();
    if (filter.length > 0) {
      // คำนวณจำนวนหน้าทั้งหมด
      const total = Math.ceil(filter.length / itemsPerPage);
      setTotalPages(total);

      // กำหนดหน้าปัจจุบันให้ไม่เกินจำนวนหน้าทั้งหมด
      setCurrentPage((current) => Math.min(current, total));
    }
  }, [searchTerm, approve, dataSheets]);

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
    <Card
      className="h-full sm:p-5 shadow-md border border-gray-200"
      placeholder={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none"
        placeholder={undefined}
      >
        <div className="mb-8 flex items-center flex-col sm:flex-row md:justify-between gap-2 sm:gap-8">
          <div>
            <div className=" flex gap-4 justify-center sm:justify-start items-center">
              <h1 className=" text-2xl font-sans font-bold text-slate-800">
                HANDLE SHEET
              </h1>
              <BookOpenIcon className=" h-8 w-8 text-amber-400" />
            </div>
            <Typography
              placeholder={undefined}
              color="gray"
              className="mt-1 font-normal text-base text-center sm:text-left"
            >
              See information about all sheets <br />
              <span className=" text-xs text-gray-500">
                *When the sheet you uploaded is not approved The sheet will be
                removed and there is no need to be alarmed if the sheet is not
                found in waiting status.
              </span>
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              placeholder={undefined}
              variant="outlined"
              size="md"
              onClick={() => {
                window.location.href = "/seller/view-all";
              }}
            >
              view all
            </Button>
            <Link
              prefetch={true}
              className="btn bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-3"
              href="/seller/new-sheet"
            >
              <DocumentPlusIcon className="h-4 w-4" />
              Add Sheet
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader className=" bg-stone-200" placeholder={undefined}>
              {TABS.map(({ label, value }) => (
                <Tab
                  placeholder={undefined}
                  key={uuidv4()}
                  value={value}
                  onClick={() => {
                    setApprove(value);
                  }}
                >
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
              className=""
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 " placeholder={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left bg-slate-100/60 ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-stone-100 bg-stone-200 p-4 transition-colors hover:bg-stone-300"
                >
                  <Typography
                    placeholder={undefined}
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
              currentItems.map((sheet, index) => {
                return (
                  <tr key={sheet.id}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              width={2000}
                              height={2000}
                              src={sheet.cover_page}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            placeholder={undefined}
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
                          placeholder={undefined}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sheet.price + ` ฿`}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={sheet.status_approve ? "approve" : "pending"}
                          color={sheet.status_approve ? "green" : "blue"}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography
                        placeholder={undefined}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(sheet.date!).toDateString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Edit Detail">
                        <IconButton
                          placeholder={undefined}
                          variant="text"
                          onClick={() =>
                            (
                              document.getElementById(
                                `${sheet.id}`
                              ) as HTMLDialogElement
                            ).showModal()
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <DialogEditSheet name_id={`${sheet.id}`} sheet={sheet} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 p-4"
        placeholder={undefined}
      >
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
          placeholder={undefined}
        >
          {`Page ${currentPage} of ${totalPages}`}
        </Typography>
        <div className="flex gap-2">
          <Button
            placeholder={undefined}
            variant="outlined"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            placeholder={undefined}
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
};

export default SellerDashboard;
