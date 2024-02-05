
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { dbConnect } from '@/db/prismaDb';
import {  getAuthSession } from "@/lib/auth";

export const POST = async (req: Request) => {
  try {
    const sheetId = req.url.split("/favorite/")[1];
    const session = await getAuthSession();
    if (session === null || session === undefined) {
        return  NextResponse.json({message: "Unauthorized"},{status:401})
      }
      const data = {
        sheetId: sheetId,
        userId: session.user.id,
      };
    await dbConnect();
    const favorite = await prisma.favorite
      .findUnique({
        where: { userId_sheetId: data },
      })
      .then(async (favorite) => {
        if (favorite === null) {
;          await prisma.favorite.create({ data });
          return { favorite: true };
        } else {
          await prisma.favorite.delete({ where: { userId_sheetId: data } });
          return { favorite: false };
        }
      });

    return NextResponse.json({message: "Success",favorite},{status:200});
  } catch (err) {
     return NextResponse.json({message: "Error Cannot Toggle Like!",err},{status:500})
  } finally {
    await prisma.$disconnect();
  }
};