"use client";
import React, { useEffect, useState } from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";

type MetaData = {
  page?: string;
  hasNextPage: boolean;
  totalPages: number;
};

export function Pagination(metaData: MetaData) {
  const search = useSearchParams();
  const searchQuery = search.get("search");
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);

  const { page = 1, totalPages, hasNextPage } = metaData;
  const currentPage =
    totalPages != 0 ? Math.min(Math.max(Number(page), 1), totalPages) : 0;
  const listPage = Math.floor(currentPage / 5);

  const getItemProps = (index: any) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => {
        router.push(
          `?page=${index}&${searchQuery ? `search=${searchQuery}` : ""}`
        );
      },
    } as any);

  const next = () => {
    if (!hasNextPage) return;

    router.push(
      `?&page=${currentPage + 1}&${searchQuery ? `search=${searchQuery}` : ""}`
    );
  };

  const prev = () => {
    if (currentPage === 1 || currentPage === 0) return;

    router.push(
      `?&page=${currentPage - 1}&${searchQuery ? `search=${searchQuery}` : ""}`
    );
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 385; // ตั้งค่าตามความต้องการ

  return isMobile ? (
    <div className="flex items-center gap-8">
      <IconButton
        placeholder={undefined}
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={currentPage === 1 || currentPage === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal" placeholder={undefined}>
        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        placeholder={undefined}
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  ) : (
    <div key={uuidv4()} className="flex items-centergap-2 sm:gap-3">
      <Button
        placeholder={undefined}
        variant="text"
        className="flex items-center gap-1 sm:gap-2"
        onClick={prev}
        disabled={currentPage === 1 || currentPage === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-1 sm:gap-2">
        {Array.from({ length: 4 }).map(
          (_, index) =>
            index + 1 + 4 * listPage <= totalPages && (
              <IconButton
                key={uuidv4()}
                {...getItemProps(index + 1 + 4 * listPage)}
              >
                {index + 1 + 4 * listPage}
              </IconButton>
            )
        )}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-1 sm:gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
        placeholder={undefined}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
