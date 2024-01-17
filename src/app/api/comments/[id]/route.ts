
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { Comment } from "@prisma/client";
import { dbConnect } from '@/db/prismaDb';
import {  getAuthSession } from "@/lib/auth";

export const POST = async (req: Request) => {
  try {
    const id = req.url.split("/comments/")[1];
    const session = await getAuthSession();
    if (session === null || session === undefined) {
        return  NextResponse.json({message: "Unauthorized"},{status:401})
      }
      const data = {
        commentId: id,
        userId: session.user.id,
      };
    await dbConnect();
    const like = await prisma.like
      .findUnique({
        where: { userId_commentId: data },
      })
      .then(async (like) => {
        if (like === null) {
;          await prisma.like.create({ data });
          return { addLike: true };
        } else {
          await prisma.like.delete({ where: { userId_commentId: data } });
          return { addLike: false };
        }
      });

    return NextResponse.json({message: "Success",like},{status:200});
  } catch (err) {
     return NextResponse.json({message: "Error Cannot Toggle Like!",err},{status:500})
  } finally {
    await prisma.$disconnect();
  }
};


export const DELETE = async (req: Request)=>{
    try{
        const id = req.url.split("/comments/")[1];
        await dbConnect();
        const comment = await prisma.comment.delete({where:{id}});

        return NextResponse.json({message: "Success",comment},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error Delete Comment",err},{status:500})
    }finally{
        await prisma.$disconnect();
    }
};

export const PUT = async (req: Request,)=>{
  try{
      const id = req.url.split("/comments/")[1];
      const {message}:Comment = await req.json();
      await dbConnect();
      const comment = await prisma.comment.update({
          data:{message},
          where :{id},
      });
      return NextResponse.json({message: "Success",comment},{status:200});
  }catch(err){
      return NextResponse.json({message: "Error Cannot Edit Comment!",err},{status:500})
  }finally{
      await prisma.$disconnect();
  }
};

