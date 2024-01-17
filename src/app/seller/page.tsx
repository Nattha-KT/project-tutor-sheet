

import SellerDashboard from '@/app/seller/_components/SellerDashboard'

import { authOptions } from '@/lib/auth';
import { fetchSheetsBySid } from '@/services/server/seller/api';
import { getServerSession } from "next-auth/next"




export default async function Seller() {

  const session = await getServerSession(authOptions);
  const results = await fetchSheetsBySid(session?.user.sid || '');


  return (
 
    <SellerDashboard dataSheets={results.sheets} />
    
    );
}


