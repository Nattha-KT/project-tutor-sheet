import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server"

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}

type Sheet={
    course_code:string,
    name:string,
    semester:string,
    type:string,
    year: string,
    price:number,
    num_page: number,
    class_details:string,
    content_details:string,
    sid:string
}

export const POST = async (req: Request, res: Response)=>{
    try{
        const {course_code,name,semester,type,year,price,num_page,class_details,content_details,sid}:Sheet = await req.json();
        await main();
        const sheet = await prisma.sheet.create({data:{course_code,name,semester,type,year,price,num_page,class_details,content_details,sid}})
        return NextResponse.json({message:"Success",sheet},{status:200});
        }catch(err){
            return   NextResponse.json({message:"Error cannot add new sheet",err},{status:500});
        }finally{
            await prisma.$disconnect();
        }
    }

export const GET = async (req: Request, res: Response)=>{

    try{
        await main();
        return NextResponse.json({message:"Hello"},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}



