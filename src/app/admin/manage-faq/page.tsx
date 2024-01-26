"use server";

import DisplayFaq from "./_components/DisplayFaq";
import { getFaq } from "@/services/server/user/api";

export default async function ManageFaq() {
  const data = await getFaq();

  return (
    <div className=" container min-w-full mb-5">
      <div className=" flex flex-col gap-y-2  items-center justify-center my-7 uppercase">
        <h1 className="text-gray-600 font-semibold text-2xl">
          HANDLE&nbsp; FAQs
        </h1>
        <p className=" text-xs  text-gray-400">
        Manage FAQs to provide guidance or answer questions about user problems so that users have a better experience using the system.
        </p>
      </div>
      <DisplayFaq data={data} />
    </div>
  );
}
