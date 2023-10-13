
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import SellerDashboard from '@/components/components_seller/SellerDashboard'
import Display from '@/components/Display'



export default function Seller() {
  return (
      <SellerDashboard/>
      // {/* <Display/> */}
  )
}