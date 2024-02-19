import RegisterSeller from "../_components/RegisterSeller";
import React from "react";
import { getBanks } from "@/services/server/user/api";

export default async function Register() {
  const data = await getBanks();

  return (
    <div>
      <RegisterSeller banks={data} />
    </div>
  );
}
