"use server"

import DisplayFaq from "./_components/DisplayFaq";
import { getFaq } from "@/services/user/api";

export default async function ManageFaq() {

const data = await getFaq();

  return (
   <DisplayFaq data={data} />
  )
}







