
import React from 'react'
import ProfileSeller from '../_components/ProfileSeller';
import getSellerById from '../../../../../actions/get-seller-id-action';
import { useRouter } from 'next/router'

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  console.log(params.slug)
  const res = await getSellerById(params?.slug)

  if(!res.success){
      return <h1 className=' text-center text-5xl font-bold font-sans text-red'> SOME THING WRONG</h1>
  }
    
  return (
    <ProfileSeller seller={res.seller}/>
  )
}