import React from 'react'
import ViewAllCard from '../../_components/ViewAllCard';
import { Sheet } from '../../../../../types/type';

import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth/next"

export async function fetchSheetsBySid(sid: string,take:number,skip:number){
  const res = await fetch(`http://localhost:3000/api/sheets/by-sid/${sid}/${take}/${skip}`, {
    cache: "no-store",
    next: {
      tags: ["sheets"],
    },
  });
  const data = await res.json();
  return data.sheetsBySid;
}

export type PageProps = {
	params: { [key: string]: string | string[] | undefined };
	searchParams?: { [key: string]: string | string[] | undefined };
};

const PAGE_SIZE = 8;

export default async function  ViewAllPage(props:PageProps){
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = PAGE_SIZE;
	const skip = (pageNumber - 1) * take; // Calculate skip based on page number.


  const session = await getServerSession(authOptions);
  const sheets = await fetchSheetsBySid(session?.user.sid || '',take,skip);
  return (
    <div className=' '>
        <ViewAllCard dataSheets={sheets}/>
    </div>
  )
}