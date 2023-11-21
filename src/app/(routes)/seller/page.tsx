

import SellerDashboard from '@/app/(routes)/seller/_components/SellerDashboard'

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
  // const { data: session } = useSession();
  // const [sheets,setSheets] = useState<Sheet[]>([]);

   
  // useEffect(() => {
  //   const useFetchdata = async () => {
  //     try {
  //       console.log(session?.user.sid);
  //       const data = await fetchSheetsBySid(session?.user.sid || '');
  //       console.log(data);
  //       setSheets(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   useFetchdata();
  // }, [session]);
  const session = await getServerSession(authOptions);
  const sheets = await fetchSheetsBySid(session?.user.sid || '');


  return (
    <SellerDashboard dataSheets={sheets} />
  );
}


// export async function getServerSideProps(context :any) {
//   const session = await getServerSession(context.req, context.res, authOptions)

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       session,
//     },
//   }
// }