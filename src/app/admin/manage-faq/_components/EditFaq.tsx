"use client";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect } from "react";
import { useRef } from "react";
import { UpdateFaq,getFaqById,DeleteFaq } from "@/services/admin/api";





export default function EditFaq ({id}:{id:string}) {//{params}:{params:{id:string}}
  const titleRef = useRef<HTMLInputElement | null>(null);
  const answerRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(()=>{
        toast.loading("Fetching Sheets...👩🏾‍🚀",{id:"1"});
        getFaqById(id).then((data)=>{
            titleRef.current!.value = data.title;
            answerRef.current!.value = data.answer;
            toast.success("Fetching Complate 🚀",{id:"1"});
        }).catch((err)=>{
            toast.error("Error fetching sheet👾👾",{id:"1"})
        });

    },[]);

  const handleUpdate = async (e:any) => {
    e.preventDefault();
    if(titleRef.current && answerRef.current){
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      await UpdateFaq({title:titleRef.current?.value,answer:answerRef.current?.value,id:id});
      toast.success("Added successfully! 🚀✔️",{id:"1"})
      setTimeout(() => {
        window.location.href = '/admin/manage-faq';
      },500);
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting request... 🚀👩🏾‍🚀",{id:"1"});
    await DeleteFaq(id)
    toast.success("Deleted! 🚀✔️",{id:"1"})
  }

  

  return (
    <Fragment>
      <div className="w-full m-auto flex my-8 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-800 bg-white rounded-lg font-bold p-3">Edit FAQ🤖</p>
          <form onSubmit={handleUpdate} className=" w-auto md:w-[720px]"> 
            <input ref={titleRef} placeholder="Enter Title" type="text" className="rounded-md px-4 py-2 my-2 w-full shadow-md"/>
            <textarea ref={answerRef} placeholder="Enter Description" className="rounded-md px-4 py-2 w-full my-2 shadow-md" style={{ minHeight: '15rem' }}></textarea>
            <div className="flex-start">
            <button  className="font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-blue-100 mr-10 mt-2"> 
              Update
            </button>
            <button  onClick={handleDelete} className="font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-red-100"> 
              Delete
            </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

