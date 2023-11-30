"use server"
import React from 'react'
import ViewAllCard from '../_components/ViewAllCard';

import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth/next"
import { Pagination } from '@/components/Pagination';



export async function fetchSheetsBySid(sid: string,take:number,skip:number,searchQuery:string){
  const res = await fetch(`http://localhost:3000/api/sheets/by-sid/${sid}/${take}/${skip}?search=${searchQuery}`, {
    cache: "no-store",
    next: {
      tags: ["sheets"],
    },
  });
  const data = await res.json();
  return data.results;
}

export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

const PAGE_SIZE = 8;

export default async function  ViewAllPage(props:PageProps){
  const pageNumber = Number(props?.searchParams?.page || 1);
  const searchQuery = props.searchParams?.search || ""
  const take = PAGE_SIZE;
	const skip = (pageNumber - 1) * take; // Calculate skip based on page number.

  const session = await getServerSession(authOptions);
  const results = await fetchSheetsBySid(session?.user.sid || '',take,skip,searchQuery as string) ;


  return (
    <div key={uuidv4()} className=' container h-auto pb-10 min-w-fit min-h-[50vh] '>
        {results && <ViewAllCard dataSheets={results.sheets}/>}
        <div className=' flex justify-center mt-16'>
        <Pagination  {...results.metaData} {...props.searchParams}/>
      </div>
    </div>
  )
}