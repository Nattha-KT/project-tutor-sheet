import { getAuthSession } from "@/lib/auth";
import prisma, { dbConnect } from "../../../db/prismaDb";
import { NextResponse } from "next/server"



export const GET = async (req: Request, res: Response)=>{

    const session = await getAuthSession();

    try{
        await dbConnect();
        if (!session) {
            return NextResponse.json(
              { message: "Unauthorized Please login" },
              { status: 401 }
            );
          }
        const order = await prisma.order.findFirst(); 
        return NextResponse.json({message:"success",order},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}
