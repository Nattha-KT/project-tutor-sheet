import { NextApiResponse } from "next";
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { Comment } from "@prisma/client";
import { dbConnect } from '@/db/prismaDb';


export const POST = async (req: Request, res: Response) => {
  try {
    const { message, userId, parentId, sheetId }: Comment = await req.json();
    await dbConnect();
    const comment = await prisma.comment.create({
      data: {
        message,
        userId,
        parentId,
        sheetId,
      },
      include: {
        user: true, // รวมข้อมูล user ไปด้วย
      },
    }).then((comment) => {
      return {
        ...comment,
        likeCount: 0,
        likedByMe: false,
      }
    });
    return NextResponse.json({ message: "Success", comment }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error cannot add new comment", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async (req: Request, res: Response)=>{
    try{
        await dbConnect();
        const comments = await prisma.comment.findMany();
        return NextResponse.json({message:"success",comments},{status:200})
        // return NextResponse.json({message:"Hello"},{status:200})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
}
