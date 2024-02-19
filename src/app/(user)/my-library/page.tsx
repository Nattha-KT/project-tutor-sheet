"use client";
import Unauthorized from "@/components/error-page/Unauthorized";
import { useSession } from "next-auth/react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {};

export default function Mylibrary({}: Props) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div   key={uuidv4()} className=" container flex items-center justify-center w-full">
        <Unauthorized />
      </div>
    );
  }
  return <div>Mylibrary</div>;
}
