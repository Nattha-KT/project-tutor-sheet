

import SellerDashboard from '@/app/seller/_components/SellerDashboard'

import { authOptions } from '@/lib/auth';
import { getServerSession } from "next-auth/next"


export async function fetchSheetsBySid(sid: string) {
  const res = await fetch(`http://localhost:3000/api/sheets/by-sid/${sid}`, {
    cache: "no-store",
    next: {
      tags: ["sheets"],
    },
  });
  const data = await res.json();
  return data.sheetsBySid;
}

export default async function Seller() {

  const session = await getServerSession(authOptions);
  const sheets = await fetchSheetsBySid(session?.user.sid || '');


  return (
    <SellerDashboard dataSheets={sheets} />
  );
}


