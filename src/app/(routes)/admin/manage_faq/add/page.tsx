"use client";

import toast, { Toaster } from 'react-hot-toast';
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'


import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const AddMoreSheet = async ({title,answer}:{title:String,answer:String}) => {
  const res = fetch("http://localhost:3000/api/faq",{
    method: "POST",
    body: JSON.stringify({title,answer}),
    // @ts-ignore
    "Content-Type":"application/json",
  });
  return (await res).json();
};

const AddSheet = () => {

  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const answerRef = useRef<HTMLTextAreaElement | null>(null);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(titleRef.current?.value && answerRef.current?.value){
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      const bol = await AddMoreSheet({title:titleRef.current?.value, answer:answerRef.current?.value,});
      {bol ? 
        toast.success("Added successfully! 🚀✔️",{id:"1"})
      : toast.error("Error ! 🚀✖️");}
      }else toast.error("Error !!  🚀✖️",{id:"1"});
      setTimeout(() => {
        // router.push("/admin/manage_faq");
        window.location.href = '/admin/manage_faq';
      },500);
  };

  return (
    <Fragment>
      <div className="w-full m-auto flex my-8 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-500 font-bold p-3">ADD-FAQ🤖</p>
          <form onSubmit={handleSubmit}> 
            <input ref={titleRef} placeholder="Enter Question" type="text" className="rounded-md px-4 py-2 my-2 w-full shadow-md"/>
            <textarea ref={answerRef} placeholder="Enter Answer for Question" className="rounded-md px-4 py-2 w-full my-2 shadow-md" style={{ minHeight: '15rem' }}></textarea>
            <button  className="font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"> 
              Submit
            </button>
          </form>
        </div>
      </div>
   
      <Toaster />
    </Fragment>
  );
};

export default AddSheet;
