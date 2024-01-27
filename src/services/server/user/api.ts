"use server";
import { headers } from "next/headers";

////// NOTE: If you want to call handle function on the client component, You should create function handler in client side



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

const getFaq = async () => {
  const res = await fetch("http://localhost:3000/api/faq", {
    cache: "no-store", 
    next: {
      tags: ["faq"],
    },
  });
  const data = await res.json();
  return data.faq;
};



export {
  getSheetById,
  getSheetBySearch,
  getFaq
};
