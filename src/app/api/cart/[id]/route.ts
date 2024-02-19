import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { dbConnect } from "@/db/prismaDb";
import { getAuthSession } from "@/lib/auth";

export const POST = async (req: Request) => {
  try {
    const sheetId = req.url.split("/cart/")[1];
    const session = await getAuthSession();
    if (session === null || session === undefined) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = {
      sheetId: sheetId,
      userId: session.user.id,
    };
    await dbConnect();
    const cart = await prisma.cart
      .findUnique({
        where: { userId_sheetId: data },
      })
      .then(async (cart) => {
        if (cart === null) {
          await prisma.cart.create({ data });
          return { favorite: true };
        } else {
          await prisma.cart.delete({ where: { userId_sheetId: data } });
          return { favorite: false };
        }
      });

    return NextResponse.json({ message: "Success", cart }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error Cannot Toggle Like!", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  try {
    const sheetId = req.url.split("/cart/")[1];
    const session = await getAuthSession();
    if (session === null || session === undefined) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = {
      sheetId: sheetId,
      userId: session.user.id,
    };
    await dbConnect();
    await prisma.cart.delete({ where: {userId_sheetId:data} });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error Can't Delete SheetCart", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
