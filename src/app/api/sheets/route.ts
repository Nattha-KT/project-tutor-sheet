import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma from "@/lib/prismaDb";
import { NextResponse } from "next/server"
import { select } from "@material-tailwind/react";

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
    cover_page: string,
    samples_page: string[],
    file_path:string,
    sid:string,
}

export const POST = async (req: Request, res: Response)=>{
    try{
        const {course_code,name,semester,type,year,price,num_page,class_details,content_details,cover_page,samples_page,sid,file_path}:Sheet = await req.json();
        await main();
        const sheet = await prisma.sheet.create({data:{course_code,name,semester,type,year,price,num_page,class_details,content_details,sid,cover_page,samples_page,file_path}})
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
            const sheets = await prisma.sheet.findMany({include:{
                seller:{
                    select:{
                        full_name:true,
                        pen_name:true,
                        image:true,
                    }
                }
            }}); 
            return NextResponse.json({message:"success",sheets},{status:200})
        }catch(err){
            return NextResponse.json({message:"Error",err},{status:500});
        }
        finally{
            await prisma.$disconnect();
        }
    }



