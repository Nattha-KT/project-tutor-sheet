import prisma, { dbConnect } from "../../../db/prismaDb";
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response)=>{

    // const session = await getServerSession(authOptions);
    // // const session = await getServerSession(req, res, authOptions)

    // if(!session){
    //     return NextResponse.json({message:"You are not logged in"})
    // }
    try{
        await dbConnect();
        const banks = await prisma.bank.findMany(); 
        return NextResponse.json({message:"success",banks},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}










