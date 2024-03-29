import React from 'react'
import ComplaintManagement from './_components/ComplaintManagement'
import { getComplaint } from '@/services/server/admin/api'
import SomethingWrong from '@/components/error-page/SomethingWrong'


export default async function ComplainPage() {

    const res = await getComplaint()
    
    if(res.message !=="Success"){
        return<><SomethingWrong/></>
    }

  return (
    <div className=' container min-w-full'>
        <div className=' flex flex-col gap-y-2  items-center justify-center my-5 uppercase'>
            <h1 className='text-gray-600 font-semibold text-2xl'>
                HANDLE COMPLAINT
            </h1>
            <p className=' text-xs  text-gray-400'>
            Handle complaints in order to improve or develop the system to provide a spade response to users.
            </p>
        </div>
        <ComplaintManagement complaint={res.data}/>
    </div>
  )
}