"use client";
import { ToastContainer } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import { Fragment, useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { revalidateTag } from 'next/cache'

type Faq = {
    id: string,
    title : string,
    answer : string,
};

const UpdateSheet = async (data:Faq) => {
  const res = fetch(`http://localhost:3000/api/faq/${data.id}`,{
    method: "PUT",
    body: JSON.stringify({title:data.title,answer:data.answer}),
    // @ts-ignore
    "Content-Type":"application/json",
  });
  return (await res).json();
};

const DeleteSheet = async (id:string) => {
  const res = fetch(`http://localhost:3000/api/faq/${id}`,{
    method: "DELETE",
    // @ts-ignore
    "Content-Type":"application/json",
  });

  return (await res).json();
};

const getSheetById = async (id:string) => {
    const res = await fetch(`http://localhost:3000/api/faq/${id}`);
    const data = await res.json();
    return  data.faq;

}

const EditSheet = ({params}:{params:{id:string}}) => {
  const router =useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const answerRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(()=>{
        toast.loading("Fetching Sheets...👩🏾‍🚀",{id:"1"});
        getSheetById(params.id).then((data)=>{
            titleRef.current!.value = data.title;
            answerRef.current!.value = data.answer;
            toast.success("Fetching Complate 🚀",{id:"1"});
        }).catch((err)=>{
            // console.log(err);
            toast.error("Error fetching sheet👾👾",{id:"1"})
        });

    },[]);

  const handleUpdate = async (e:any) => {
    e.preventDefault();
    if(titleRef.current && answerRef.current){
      toast.loading("Sending request... 🚀👩🏾‍🚀",{id:"1"});
      await UpdateSheet({title:titleRef.current?.value,answer:answerRef.current?.value,id:params.id});
      toast.success("Added successfully! 🚀✔️",{id:"1"})
      setTimeout(() => {
        // router.push("/admin/manage_faq");
        window.location.href = '/admin/manage-faq';
      },500);
      // console.log(bol);
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting request... 🚀👩🏾‍🚀",{id:"1"});

    await DeleteSheet(params.id)
    toast.success("Deleted! 🚀✔️",{id:"1"})
  }

  

  return (
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        theme="dark"
      />
      <div className="w-full m-auto flex my-8 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-500 font-bold p-3">EDIT-FAQ🤖</p>
          <form onSubmit={handleUpdate}> 
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
   
      <Toaster />
    </Fragment>
  );
};

export default EditSheet;
