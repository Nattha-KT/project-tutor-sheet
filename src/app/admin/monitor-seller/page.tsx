'use server'
import React from 'react'
import MonitorSeller from './_components/MinitorSeller'
import getSeller from '../../../../actions/get-seller-action'



export default async function DisplaySeller() {

    const res = await getSeller()
  return (
    <main className=' container min-w-full'>
        {res.data && <MonitorSeller sellers={res.data}/>}
    </main>
  )
}