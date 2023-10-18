
import { Metadata } from "next"
import Sidebar from '@/components/Sidebar'
import Footer from "@/components/components_home/Footer"
import ProviderWrapper from "@/context/ProviderWrapper"

export const metadata: Metadata = {
  title: 'Seller Sheet',
  description: 'Market for sell sheet summary',
}

export default function SellerLayout({children,}: {children: React.ReactNode}) {
    
  return (
    <div >
      <Sidebar className="absolute"/>
      {/* <ProviderWrapper> */}
      <div className=" mx-auto  pt-10 flex justify-center overflow-x-scroll">
        {children}
      </div>
      {/* </ProviderWrapper> */}
      <Footer/>
    </div>
    
  )
}
