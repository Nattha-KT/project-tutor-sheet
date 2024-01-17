"use server";
import { getServerSession } from "next-auth";
import { Help } from "../../../../types/type";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";

////// NOTE: If you want to call handle function on the client component, You should create function handler in client side

const getFaq = async () => {
  const res = await fetch("http://localhost:3000/api/faq", {
    cache: "no-store", // bypass its cache when making the HTTP request to the specified URL.
    next: {
      tags: ["faq"],
    },
  });
  const data = await res.json();
  return data.faq;
};

const getSheetById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/sheets/by-id/${id}`, {
    cache: "no-store",
    next: {
      tags: ["sheets"],
    },
    headers: headers(), // ส่ง headers ที่รวม cookies
  });
  const data = await res.json();
  return data.sheetsById;
};

const getSheetBySearch = async (
  take: number,
  skip: number,
  searchQuery: string
) => {
  const res = await fetch(
    `http://localhost:3000/api/sheets/store/${take}/${skip}?search=${searchQuery}`,
    {
      cache: "no-store",
      next: {
        tags: ["sheets"],
      },
    }
  );
  const data = await res.json();
  return data.results;
};

const UploadComplaint = async (help: Help, userId: string) => {
  const res = fetch("http://localhost:3000/api/help", {
    method: "POST",
    body: JSON.stringify({ help, userId }),
    // @ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const PostComment = async (
  message: string,
  userId: string,
  sheetId: string,
  parentId?: string
) => {
  const res = fetch("http://localhost:3000/api/comments", {
    method: "POST",
    body: JSON.stringify({ message, userId, sheetId, parentId }),
    // @ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const deleteComment = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/comments/${id}`, {
    method: "DELETE",
    // @ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const updateComment = async (id: string, message: string) => {
  const res = fetch(`http://localhost:3000/api/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, message }),
    // @ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};



export {
  getFaq,
  UploadComplaint,
  getSheetById,
  getSheetBySearch,
  PostComment,
  deleteComment,
  updateComment,
};
