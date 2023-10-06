import Register_Seller from "@/components/Register_Seller";
import Footer from "@/components/componentsHome/Footer";
import { getServerSession } from "next-auth";
import React from "react";


async function getBanks(){
    try {
     const res = await fetch("http://localhost:3000/api/bank");
     const data = await res.json();
     const banks = data.banks;
     return banks;
   } catch (error) {
     console.error("Error fetching data:", error);
     return [];
   }
   }


export default async function Register(){

    const data = await getBanks();

  return (
          <div>
            <Register_Seller banks={data}/>
            <Footer/>
          </div>
  )
}

