// import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
// import { NextResponse } from "next/server"

// export async function main() {
//     try{
//         await prisma.$connect();
//     }catch(err){
//         return Error ("Database connection Unsuccessful");
//     }
// }



// export const GET = async (req: Request, res: NextApiResponse)=>{
//         try{
//             const sid = req.url.split("/sheets/")[1];
//             await main();
//             const sheetsBySid = await prisma.sheet.findMany({where:{sid}});
//             if(!sheetsBySid)
//                 return NextResponse.json({message: "Not Found"},{status:500});
//             return NextResponse.json({message: "Success",sheetsBySid},{status:200});
    
//         }catch(err){
//             return NextResponse.json({message: "Error creating",err},{status:500})
//         }finally{
//             await prisma.$disconnect();
//         }
//     }

