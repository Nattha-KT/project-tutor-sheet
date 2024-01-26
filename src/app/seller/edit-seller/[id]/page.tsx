'use server'
import EditSeller from "@/app/seller/_components/EditSeller";
import { getAuthSession } from "@/lib/auth";
import { getBanks, getSellerByID } from "@/services/server/seller/api";
import React from "react";

export default async function Edit({ params }: { params: { id: string } }) {
  const banks = await getBanks();
  const res = await getSellerByID(params.id);

  return (
    <div className="flex justify-center items-center z-10 mb-6">
      <EditSeller banks={banks} data_seller={res.seller} />
    </div>
  );
}
