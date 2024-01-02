import { NextApiResponse } from "next";
import prisma from "../../../../../db/prismaDb";
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
            const sheetsById = await prisma.sheet.findFirst(
                {
                    where:{id},
                    include:{
                        seller:{
                            select:{
                                full_name:true,
                                pen_name:true,
                                image:true,
                            }
                        }
                    }
                }
                );
            if(!sheetsById)
                return NextResponse.json({message: "Not Found"},{status:500});
            return NextResponse.json({message: "Success",sheetsById},{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error creating",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    }

    export const PUT = async (req: Request, res: NextApiResponse)=>{
        try{
            const id = req.url.split("/by-id/")[1];
            const {course_code,name,type,semester,year,class_details,content_details} = await req.json()
            await main();
            const sheetsById = await prisma.sheet.update({
                data:{course_code,name,type,semester,year,class_details,content_details},
                where:{id}});

            if(!sheetsById)
                return NextResponse.json({message: "Not Found"},{status:500});
            return NextResponse.json({message: "Success",sheetsById},{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error creating",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    }

    
export const DELETE = async (req: Request, res: NextApiResponse)=>{

    try{
        const id = req.url.split("/by-id/")[1];
        await main();
        const faq = await prisma.sheet.delete({where:{id}});

        return NextResponse.json({message: "Success",faq},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error creating",err},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};


