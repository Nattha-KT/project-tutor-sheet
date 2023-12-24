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
        const faq = await prisma.complaint.findMany(); 
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
    const {help,userId} = await req.json();
    const {head,content,level,role,category} = help ;
    await main();
    const data = await prisma.complaint.create({data:{head,content,level,role,category,userId}})
    return NextResponse.json({message:"Success",data},{status:200});
    }catch(err){
        return   NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

}

export const DELEAT = async (req: Request, res: Response)=>{}









