"use server"

import SellerDashboard from '@/app/seller/_components/SellerDashboard'
import { getAuthSession } from '@/lib/auth';
import { fetchSheetsBySid } from '@/services/server/seller/api';


export default async function Seller() {

  const session = await getAuthSession();
  
  const results = await fetchSheetsBySid(session?.user.sid);

  if(!results)return(
    <h1 className=' text-5xl text-red-600 font-sans font-bold'>Something wrong</h1>
  )

  return (
 
   <div id="dashbard-seller" className=' container min-w-full px-4'>
     <SellerDashboard dataSheets={results.sheets} />
   </div>
    );
}


