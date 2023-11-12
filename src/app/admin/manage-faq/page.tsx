
import { error } from "console";
import Link from "next/link";
import { useState, useEffect, cache } from "react";
import DisplayFaq from "./_components/DisplayFaq";

async function fetchFaq(){
  const res = await fetch("http://localhost:3000/api/faq",{
    cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
     next: {
       tags: ["faq"]
    }
  });
  
  const data = await res.json();
  return data.faq;
}

export default async function ManageFaq() {

const data = await fetchFaq();

  return (
   <DisplayFaq data={data} />
  )
}







