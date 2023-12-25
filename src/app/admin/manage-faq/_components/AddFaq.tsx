"use client";

import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { useRef } from "react";
import { UploadSheet } from '@/services/admin/api';


export default function AddFaq() {

  const titleRef = useRef<HTMLInputElement | null>(null);
  const answerRef = useRef<HTMLTextAreaElement | null>(null);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(titleRef.current?.value && answerRef.current?.value){
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      const bol = await UploadSheet({title:titleRef.current?.value, answer:answerRef.current?.value,});
      {bol ? 
        toast.success("Added successfully! 🚀✔️",{id:"1"})
      : toast.error("Error ! 🚀✖️");}
      }else toast.error("Error !!  🚀✖️",{id:"1"});
      setTimeout(() => {
        window.location.href = '/admin/manage-faq';
      },500);
  };

  return (
    <Fragment>
      <div className="w-full m-auto flex my-8 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl bg-white rounded-lg text-slate-800 font-bold p-3">ADD-FAQ🤖</p>
          <form onSubmit={handleSubmit}> 
            <input ref={titleRef} placeholder="Enter Question" type="text" className="rounded-md px-4 py-2 my-2 w-full shadow-md"/>
            <textarea ref={answerRef} placeholder="Enter Answer for Question" className="rounded-md px-4 py-2 w-full my-2 shadow-md" style={{ minHeight: '15rem' }}></textarea>
            <button  className="font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"> 
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};


