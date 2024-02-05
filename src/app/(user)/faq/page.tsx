import Faq from "@/app/(user)/faq/_components/Faq";
import { getFaq } from "@/services/server/user/api";

export default async function FaqPage() {

  const data = await getFaq();

  return (

        <div className="sm:flex justify-center sm:px-32">
        <Faq data={data}></Faq>
        </div>
    
  )
}