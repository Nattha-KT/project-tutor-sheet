
import { Metadata } from "next"
import ProviderWrapper from "@/context/ProviderWrapper"
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: 'SUT-SHEET',
  description: 'Market for sell sheet summary',
}

export default async function StoreLayout({children,}: {children: React.ReactNode}) {
  const session = await getServerSession();
  return (
    <div >
      <ProviderWrapper session={session} >
      <div className=" mx-auto  pt-10 flex justify-center container min-w-full">
        {children}
      </div>
      </ProviderWrapper>
    </div>
    
  )
}