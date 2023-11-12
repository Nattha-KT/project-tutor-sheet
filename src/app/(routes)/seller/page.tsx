
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import SellerDashboard from '@/app/(routes)/seller/_components/SellerDashboard'



export default function Seller() {
  return (
      <SellerDashboard/>
      // {/* <Display/> */}
  )
}