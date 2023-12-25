import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server"

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}

type Seller={
    pen_name: string,
    full_name: string,
    phone:string,
    bank_name: string,
    bank_id: string
    address:string,
    image:string
  }

export const POST = async (req: Request, res: Response)=>{
    try{
        const {pen_name,full_name,phone,bank_name,bank_id,address,image}:Seller = await req.json();
        await main();
        const seller = await prisma.seller.create({data:{pen_name,full_name,phone,bank_name,bank_id,address,image}})
        return NextResponse.json({message:"Success",seller},{status:200});
        }catch(err){
            return   NextResponse.json({message:"Error",err},{status:500});
        }finally{
            await prisma.$disconnect();
        }
    
    }



