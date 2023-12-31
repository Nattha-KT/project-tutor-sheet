"use server"
import React from 'react'
import SheetCards from './_components/SheetCards';

import { v4 as uuidv4 } from 'uuid';
import { Pagination } from '@/components/store/Pagination';
import { getSheetBySearch } from '@/services/user/api';


export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

const PAGE_SIZE = 8;

export default async function  Store(props:PageProps){
  const pageNumber = Number(props?.searchParams?.page || 1);
  const searchQuery = props.searchParams?.search || ""
  // const filterMode = props.searchParams?.filter || ""
  // console.log(filterMode);
  const take = PAGE_SIZE;
	const skip = (pageNumber - 1) * take; // Calculate skip based on page number.


  const results = await getSheetBySearch(take,skip,searchQuery as string) ;


  return (
    <div key={uuidv4()} className=' container h-auto pb-10  min-w-fit min-h-[50vh] '>
        {results && <SheetCards dataSheets={results.sheets}/>}
      <div className=' flex justify-center mt-16'>
        {results &&<Pagination  {...results.metaData} {...props.searchParams}/>}
      </div>
    </div>
  )
}