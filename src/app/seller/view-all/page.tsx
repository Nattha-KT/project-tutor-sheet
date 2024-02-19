
import React from 'react'
import ViewAllCard from '../_components/ViewAllCard';

import { v4 as uuidv4 } from 'uuid';
import { getAuthSession } from '@/lib/auth';
import { Pagination } from '@/components/store/Pagination';
import { fetchSheetBySearch } from '@/services/server/seller/api';


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

  const results = await fetchSheetBySearch(take,skip,searchQuery as string) ;


  return (
    <div key={uuidv4()} className=' container h-auto pb-10 min-w-fit min-h-[50vh] '>
        {results && <ViewAllCard dataSheets={results.sheets}/>}
        <div className=' flex justify-center mt-16'>
          {results && results.metaData && (
            <Pagination {...results.metaData} {...props.searchParams} />
          )}
        </div>
    </div>
  )
}