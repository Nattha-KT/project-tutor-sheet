import RegisterSeller from "../../../../components/components_seller/RegisterSeller";
import Footer from "@/components/components_home/Footer";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";


   
async function fetchBanks(){
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


export default async function Register(){

    const data = await fetchBanks();

  return (
          <div>
            <RegisterSeller banks={data}/>
          </div>
  )
}

