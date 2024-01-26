import prisma from "../../../db/prismaDb";
import { NextResponse } from "next/server"

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}

export const GET = async (req: Request)=>{

    try{
        await main();
        const data = await prisma.complaint.findMany({
            include:{
                user:{
                    select:{
                        name:true,
                        image:true,
                        role:true
                    }
                }
            }
        }); 
        return NextResponse.json({message:"Success",data},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}

export const DELETE = async (req: Request)=>{

    try{
        const {ids} = await req.json();
        await main();
        const complaint = await prisma.complaint.deleteMany({where:{ id: {
            in: ids,
          },}});

        return NextResponse.json({message: "Success",complaint},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error Delete Complaint"},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};










