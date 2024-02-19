import EditSeller from "@/app/seller/_components/EditSeller";
import {  getSellerByID } from "@/services/server/seller/api";
import { getBanks } from "@/services/server/user/api";
import React from "react";

export default async function Edit() {

  const [banks,res] = await Promise.all([
    getBanks(),
    getSellerByID(),
  ])

  return (
    <div className="flex justify-center items-center z-10 mb-6">
      <EditSeller banks={banks} data_seller={res.seller} />
    </div>
  );
}
