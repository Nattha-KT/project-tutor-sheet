import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server"
import { Sheet } from "@prisma/client";



export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}

export const POST = async (req: Request, res: Response)=>{
    try{
        const {course_code,name,semester,type,year,price,num_page,class_details,content_details,suggestion,cover_page,samples_page,sid,file_path}:Sheet = await req.json();
        await main();
        const sheet = await prisma.sheet.create({data:{course_code,name,semester,type,year,price,num_page,suggestion,class_details,content_details,sid,cover_page,samples_page,file_path}})
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


    export const DELETE = async (req: Request)=>{

        //route นี้อย่าลืมว่าต้องเชคก่อนว่าใช่ admin ไหม

        try{
            const {ids} = await req.json();
            await main();
            await prisma.sheet.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            });
    
            return NextResponse.json({message: "Success"},{status:200});
    
        }catch(err){
            console.log(err);
            return NextResponse.json({message: "Error Delete Sheets"},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    
    };
    

    export const PUT = async (req: Request,)=>{

        //route นี้อย่าลืมว่าต้องเชคก่อนว่าใช่ admin ไหม
    
        try{
            const {ids} = await req.json();
            await main();
            await prisma.sheet.updateMany({
                data:{status_approve :true, },
                where :{id:{
                    in:ids
                }},
            });
            return NextResponse.json({message: "Success"},{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    
    };
