"use server"

import DisplayFaq from "./_components/DisplayFaq";
import { getFaq } from "@/services/server/user/api";

export default async function ManageFaq() {

const data = await getFaq();

  return (
   <div className=" container min-w-full">
    <DisplayFaq data={data} />
   </div>
  )
}







