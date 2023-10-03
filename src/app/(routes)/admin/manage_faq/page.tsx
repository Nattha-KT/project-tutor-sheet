
import { error } from "console";
import Link from "next/link";
import { useState, useEffect, cache } from "react";

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
    <div className="w-full h-full ">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-700 drop-shadow-xl shadow-slate-700">
        <h1 className="text-white text-center text-2 font-bold ">
        Manage frequently asked questions 🤖💻</h1>
      </div>
      {/* Link to add sheet */}
      <div className="flex my-5 flex-center">
          <Link href={"manage_faq/add"} className=" rounded-3xl px-4 py-2 text-center m-auto text-md bg-slate-600 font-semibold text-white hover:bg-slate-800 ">
              ➕ADD FAQ
          </Link>
      </div>
        {/* Show more */}
        <div className="w-full  flex flex-col justify-center items-center">
          {data?.map((faq:any)=>(
            <div key={faq.id} className=" w-3/4 p-4 rounded-2xl mx-3 my-2 bg-white shadow-lg flex flex-col justify-center">
              {/* Title and Course code */}
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-bold">{faq.title}</h2>
                </div>
                <Link href={`manage_faq/edit/${faq.id}`} className="rounded-3xl px-4 py-2 text-center text-md bg-slate-500 font-semibold text-white hover:bg-slate-600">
                  Edit
                </Link>
              </div>
              {/* Date and Time */}
              <div className="mr-auto my-1">
                <blockquote className=" font-semibol text-xs text-slate-700">
                  {new Date(faq.date).toDateString()} 
                </blockquote>
              </div>
              <div className="mr-auto my-1 text-sm font-medium">
                <h1>{faq.answer}</h1>
              </div>
            </div>
          ))}
        </div>
        


    </div>
  )
}







