import prisma from "../../../../prisma";
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
        const posts = await prisma.post.findMany(); 
        return NextResponse.json({message:"success",posts},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}


export const PUT = async (req: Request, res: Response)=>{}


export const POST = async (req: Request, res: Response)=>{
try{
    const {title,description} = await req.json();
    await main();
    const posts = await prisma.post.create({data:{description,title}})
    return NextResponse.json({message:"Success",posts},{status:200});
    }catch(err){
        return   NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

}

export const DELEAT = async (req: Request, res: Response)=>{}









