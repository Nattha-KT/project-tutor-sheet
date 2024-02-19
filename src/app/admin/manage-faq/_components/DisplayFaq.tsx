'use client'
import React from 'react'
import AddFaq from './AddFaq'
import { Dialog } from '@/components/dialog';
import {DialogFaqEdit} from '@/components/dialog';
import { PencilSquareIcon,PlusCircleIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon} from '@heroicons/react/24/solid';
type Faq = {
    id: string,
    title : string,
    answer : string,
};


export default function DisplayFaq({ data }: { data: Faq[] }) {

  return (
    <div className="w-full h-full ">
      <div className=" flex justify-between md:w-2/4 sm:w-3/4 m-auto p-2 my-5 rounded-lg  shadow-md bg-white ">
        <h1 className="flex-1 flex gap-1 items-center text-lg  font-bold ">
          <QuestionMarkCircleIcon className=' h-6 w-6'/>
          FAQs
        </h1>
        <button  className="btn flex items-center shadow-lg text-center m-auto text-md bg-slate-800 rounded-lg font-medium text-white hover:bg-slate-700 "
            onClick={() => (document.getElementById('modal_faq_add') as HTMLDialogElement).showModal()}>
              <PlusCircleIcon className=' w-6 h-6'/>
              เพิ่มข้อมูล
        </button>
        <Dialog className='md:min-w-[720px] shadow-none bg-opacity-0 bg-gray-50' component={AddFaq} name_id='modal_faq_add'/>
      </div>
        {/* Show more */}
      <div className="w-full  flex flex-col items-center min-h-screen">
          { data && data?.map((faq:any)=>(
            <div key={faq.id} className=" sm:w-3/4 p-2 sm:p-4 rounded-2xl mx-3 my-2 bg-white shadow-md flex flex-col max-h-[15rem] sm:max-h-max overflow-y-auto">
              {/* Title and Course code */}
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-bold">{faq.title}</h2>
                </div>
                <button className="rounded-3xl px-4 py-2 text-center text-md bg-slate-500 font-semibold text-white hover:bg-slate-600"
                onClick={() => {
                  (document.getElementById(`modal_faq_edit_${faq.id}`) as HTMLDialogElement).showModal()
                }}>
                  <PencilSquareIcon className=' h-6 w-6'/>
                </button>
                <DialogFaqEdit id={faq.id}/>
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