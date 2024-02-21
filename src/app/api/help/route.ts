import prisma, { dbConnect } from "../../../db/prismaDb";
import { NextResponse } from "next/server"



export const GET = async (req: Request, res: Response)=>{
    try{
        await dbConnect();
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
    await dbConnect();
    const data = await prisma.complaint.create({data:{head,content,level,role,category,userId}})
    return NextResponse.json({message:"Success",data},{status:200});
    }catch(err){
        return   NextResponse.json({message:"Error",err},{status:500});
    }finally{
        await prisma.$disconnect();
    }

}










