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

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({message:"You are not logged in"})
    }
    try{
        await main();
        const banks = await prisma.bank.findMany(); 
        return NextResponse.json({message:"success",banks},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}










