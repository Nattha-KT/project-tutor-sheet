import prisma from "../../../lib/prismaDb";
import { NextResponse } from "next/server"

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}


export const GET = async (req: Request, res: Response)=>{
    try{
        await main();
        const faq = await prisma.faq.findMany(); 
        return NextResponse.json({message:"success",faq},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}


export const POST = async (req: Request, res: Response)=>{
try{
    const {title,answer} = await req.json();
    await main();
    const faq = await prisma.faq.create({data:{title,answer}})
    return NextResponse.json({message:"Success",faq},{status:200});
    }catch(err){
        return   NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

}

export const DELEAT = async (req: Request, res: Response)=>{}









