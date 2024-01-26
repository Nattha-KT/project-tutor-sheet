'use client'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'



export default function ButtonBack() {
    const router = useRouter()
  return (
    <button type="reset" className="flex items-center  btn  border border-white text-md p-2 px-4 rounded-lg mb-6 " onClick={()=>{router.back()}} >
    <ArrowUturnLeftIcon className=" w-6 h-6"/>
            back
    </button>
  )
}