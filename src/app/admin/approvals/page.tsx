import SomethingWrong from '@/components/error-page/SomethingWrong'
import { getSheets } from '@/services/server/admin/api'
import React from 'react'
import ComplaintManagement from '../complaint/_components/ComplaintManagement'
import Approve from './_components/monitorSheet'


export default async function PermissionPage() {

  const res = await getSheets()
  if(!res) return (
    <>
      <SomethingWrong/>
    </>
  )

  return (
    <div className=' container min-w-full'>
      <div className=' flex flex-col gap-y-2  items-center justify-center my-5 uppercase'>
          <h1 className='text-gray-600 font-semibold text-2xl uppercase'>
            Manage approvals
          </h1>
          <p className=' text-xs  text-gray-400'>
          Screen appropriate content before approving it for sale. Once approved, 
          the product will be displayed on the store page.
          </p>
      </div>
      <Approve sheets={res}/>
    </div>
  )
}