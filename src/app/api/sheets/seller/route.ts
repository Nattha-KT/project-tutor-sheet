import { dbConnect } from '@/db/prismaDb';
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export const GET = async () => {
  try {
    const session = await getAuthSession();
    const sid = session?.user.sid;
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    await dbConnect();
    const sheets = await prisma.sheet.findMany({
      where: { sid:sid },
    });
    return NextResponse.json({ message: "Success", sheets }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
