
import { Metadata } from "next"
import Sidebar from '@/components/Sidebar'
import ProviderWrapper from "@/context/ProviderWrapper"
import { SellerSpeedDial } from "./_components/SellerSpeedial";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: 'SELLER',
  description: 'For managing your own store ',
}

export default async function SellerLayout({children,}: {children: React.ReactNode}) {
  const session = await getAuthSession();
  return (
    <div >
      {/* <Sidebar className="absolute"/> */}
        <ProviderWrapper session={session} >
        <SellerSpeedDial />
          <div className=" mx-auto  pt-6 flex justify-center container min-w-full">
            {children}
          </div>
        </ProviderWrapper>
    </div>
    
  )
}
