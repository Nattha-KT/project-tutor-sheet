// import EditSeller from "@/components/components_seller/EditSeller";
import EditSeller from "@/app/seller/_components/EditSeller";
import { getBanks,getSellerByID } from "@/services/seller/api";
import React from "react";



export default async function Edit( {params}:{params:{id:string}}){

    const banks = await getBanks();
    const data = await getSellerByID(params.id);

  return (
          <div>
            <EditSeller banks={banks} data_seller={data.seller} />
          </div>
  )
}

