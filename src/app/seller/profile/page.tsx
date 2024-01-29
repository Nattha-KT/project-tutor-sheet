import { getSellerByID } from '@/services/server/seller/api'
import React from 'react'
import Profile from '../_components/Profile'


export default async function ProfilePage() {

    const res = await getSellerByID()
  return (
    <div className=' container min-w-full bg-slate-200/60  mt-[-6.5rem] pt-[5rem] pb-8'>
        <Profile seller={res.seller}/>
    </div>
  )
}