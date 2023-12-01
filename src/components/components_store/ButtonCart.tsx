'use client'
import React from 'react'
import {Button,IconButton,} from "@material-tailwind/react";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";




export default function ButtonCart({price} :{price: number}) {
  return (
    <>
        <div className='flex justify-between items-center'>
            <div className="text-gray-500 leading-relaxed text-[13px] sm:text-[17px] font-semibold">{`${price} ฿`}</div>
            <Button className=" sm:hidden py-[5px]  flex  text-[12px] rounded-full" >+
                <ShoppingCartIcon className=' h-[15px] w-[12px] mt-[3px] mr-[2px]'/>
            </Button>
        </div>
        <Button className="relative hidden px-0 sm:px-10 mt-3 sm:flex justify-center" size="sm" fullWidth={true}>
        <ShoppingCartIcon className='h-[12px] sm:h-[18px] w-[18px] mr-2 text-[12px] sm:text-md'/>Add to cart
        </Button>
    </>
  )
}