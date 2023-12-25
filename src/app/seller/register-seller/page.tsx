import RegisterSeller from "../_components/RegisterSeller";
import axios from "axios";
import React from "react";
import { getBanks } from "@/services/seller/api";


export default async function Register(){

    const data = await getBanks();

  return (
          <div>
            <RegisterSeller banks={data}/>
          </div>
  )
}

