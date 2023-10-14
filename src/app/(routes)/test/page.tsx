// import RegisterSeller from "";
import Footer from "@/components/components_home/Footer";
import { getServerSession } from "next-auth";
import React from "react";
import axios from "axios";


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


export default async function Test(){

    const data = await fetchBanks();
    // console.log(data);

  return (
          <div>
            {/* <RegisterSeller banks={data}/> */}
            test
          </div>
  )
}

