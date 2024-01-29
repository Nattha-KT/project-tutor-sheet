'use server'
import React from 'react'
import Image from 'next/image'
import ShowProfile from '../../_components/ShowProfile'
import { getSellerBySid } from '@/services/server/user/api'


export default async function ShowProfilePage({params}: {params: { sid: string }}) {

    const res = await getSellerBySid(params.sid as string)

  return (
    <div className=' container min-w-full min-h-screen bg-slate-200/60  mt-[-6.5rem] pt-[5rem] pb-8'>
        <ShowProfile data={res}/>
    </div>
  )
}