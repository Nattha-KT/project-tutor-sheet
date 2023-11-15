
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import SellerDashboard from '@/app/(routes)/seller/_components/SellerDashboard'
import { getDownloadURL, ref, getMetadata, getStorage } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import { message } from 'antd';



export async function fetchSheets() {
  const res = await fetch("http://localhost:3000/api/sheets",{
      cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
       next: {
         tags: ["sheets"]
      }
    });
    const data = await res.json();
    return data.sheets;
};


export default async function Seller() {



  return (
      <SellerDashboard sheets={await fetchSheets()}/>
  )
}