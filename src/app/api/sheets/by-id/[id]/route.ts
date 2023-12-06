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
            const id = req.url.split("/by-id/")[1];
            await main();
            const sheetsById = await prisma.sheet.findMany({where:{id}});
            if(!sheetsById)
                return NextResponse.json({message: "Not Found"},{status:500});
            return NextResponse.json({message: "Success",sheetsById},{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error creating",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    }

