
import { Metadata } from "next"
import Sidebar from '@/components/Sidebar'
import ProviderWrapper from "@/context/ProviderWrapper"
import { getServerSession } from "next-auth";
import { SellerSpeedDial } from "./_components/SellerSpeedial";

export const metadata: Metadata = {
  title: 'Seller Sheet',
  description: 'Market for sell sheet summary',
}

export default async function SellerLayout({children,}: {children: React.ReactNode}) {
  const session = await getServerSession();
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
