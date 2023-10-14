import prisma from "../../../lib/prismaDb";
import { NextResponse } from "next/server"
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}


export const GET = async (req: Request, res: Response)=>{
    // const session = await getServerSession(authOptions);
    // // console.log(session);
    // // const session = await getServerSession(req, res, authOptions)

    // if(!session){
    //     return NextResponse.json({message:"You are not logged in"})
    // }
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









