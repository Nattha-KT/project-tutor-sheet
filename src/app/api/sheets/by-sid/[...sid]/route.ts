import { NextApiResponse } from "next";
import prisma from "../../../../../lib/prismaDb";
import { NextResponse } from "next/server"

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}


export const GET = async (req: Request, res: NextApiResponse)=>{

        try{
            const slug = req.url.split("/sheets/by-sid/")[1];
            const sid = slug.split("/")[0];
            const take = parseInt(slug.split("/")[1],10);
            const skip = parseInt(slug.split("/")[2],10);

            await main();
            const sheetsBySid = await prisma.sheet.findMany({ 
                skip: skip,
                take: take,
                where:{sid},include:{
                    seller:{
                        select:{
                            full_name:true,
                            pen_name:true,
                            image:true,
                        }
                    }
                }
            });
            if(!sheetsBySid)
                return NextResponse.json({message: "Not Found"},{status:500});
            return NextResponse.json({message: "Success",sheetsBySid},{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error creating",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    }

