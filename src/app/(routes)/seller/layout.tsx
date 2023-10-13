
import { Metadata } from "next"
import Sidebar from '@/components/Sidebar'
import Footer from "@/components/components_home/Footer"

export const metadata: Metadata = {
  title: 'Seller Sheet',
  description: 'Market for sell sheet summary',
}

export default function SellerLayout({children,}: {children: React.ReactNode}) {
    
  return (
    <div >
      <Sidebar className="absolute"/>
      <div className=" mx-auto min-h-screen pt-10 flex justify-center overflow-x-scroll">
        {children}
      </div>
      <Footer/>
    </div>
    
  )
}
