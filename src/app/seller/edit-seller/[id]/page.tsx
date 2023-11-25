// import EditSeller from "@/components/components_seller/EditSeller";
import Footer from "@/components/components_home/Footer";
import EditSeller from "@/app/(routes)/seller/_components/EditSeller";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";

async function getBanks(){
  try {
    const response = await axios.get("http://localhost:3000/api/banks");
    const data = response.data;
    const banks = data.banks;
    return banks;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
 }

   
async function getSellerByID(id:string){
 try {
    const res = await fetch(`http://localhost:3000/api/seller/${id}`,{
      cache:"no-store", // bypass its cache when making the HTTP request to the specified URL.
      next: {
        tags: ["blog"]
      }
    });
    const data = await res.json();
    return data;
  }catch(err){
    console.error("Error fetching data:", err);
      return [];
 }
}


export default async function Edit( {params}:{params:{id:string}}){

    const banks = await getBanks();
    const data = await getSellerByID(params.id);

  return (
          <div>
            <EditSeller banks={banks} data_seller={data.seller} />
          </div>
  )
}

