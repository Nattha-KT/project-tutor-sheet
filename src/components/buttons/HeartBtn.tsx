"use client";
import { addFavoriteSheet } from "@/services/client/user/api";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function HeartBtn({
  favorite,
  sheetId,
}: {
  favorite: boolean;
  sheetId: string;
}) {
  const [heart, setHeart] = useState<boolean>(favorite);
  const { data: session } = useSession();

  const handleHeart = async () => {
    if (!session) {
      toast.error("Please log in", { id: "1" });
      return;
    }
    setHeart((prev) => !prev);
    await addFavoriteSheet(sheetId);
  };

  return (
    <Tooltip content={`${heart ? "-" : "+"} favorite list`} placement="top">
      <IconButton
        size="sm"
        color={`${heart ? "red" : "white"}`}
        variant="text"
        className="rounded-full"
        onClick={() => handleHeart()} placeholder={undefined}      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          stroke="gray" // เพิ่ม line นี้
          strokeWidth="0.3" // ตั้งค่าความหนาของเส้นขอบ
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </IconButton>
    </Tooltip>
  );
}
