'use client'
import Link from 'next/link';
import React from 'react'
import AddFaq from './AddFaq'
import { Dialog } from '@/components/dialog';
import {DialogFaqEdit} from '@/components/dialog';
type Faq = {
    id: string,
    title : string,
    answer : string,
};


export default function DisplayFaq({ data }: { data: Faq[] }) {
  return (
    <div className="w-full h-full ">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-700 drop-shadow-xl shadow-slate-700">
        <h1 className="text-white text-center text-2 font-bold ">
        Manage frequently asked questions 🤖💻</h1>
      </div>
      {/* Link to add sheet */}
      <div className="flex my-5 flex-center">
          <button  className=" rounded-3xl px-4 py-2 drop-shadow-lg text-center m-auto text-md bg-slate-600 font-semibold text-white hover:bg-slate-800 "
            onClick={() => (document.getElementById('modal_faq_add') as HTMLDialogElement).showModal()}>
              ➕ADD FAQ
          </button>
          <Dialog className='md:min-w-[540px] shadow-none bg-opacity-0 bg-gray-50' component={AddFaq} name_id='modal_faq_add'/>
      </div>
        {/* Show more */}
      <div className="w-full  flex flex-col items-center min-h-screen">
          { data && data?.map((faq:any)=>(
            <div key={faq.id} className=" w-3/4 p-4 rounded-2xl mx-3 my-2 bg-white shadow-lg flex flex-col justify-center">
              {/* Title and Course code */}
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-bold">{faq.title}</h2>
                </div>
                <button className="rounded-3xl px-4 py-2 text-center text-md bg-slate-500 font-semibold text-white hover:bg-slate-600"
                onClick={() => {
                  (document.getElementById(`modal_faq_edit_${faq.id}`) as HTMLDialogElement).showModal()
                }}>
                  Edit
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