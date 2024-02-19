import { getAuthSession } from "@/lib/auth";
import prisma, { dbConnect } from "../../../db/prismaDb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const session = await getAuthSession();

  try {
    await dbConnect();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    const ratings = await prisma.rating.findMany();
    return NextResponse.json({ message: "success", ratings }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: Response) => {
  const session = await getAuthSession();
  try {
    const { sellerRating, productsRating, orderId } = await req.json();
    await dbConnect();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    const products = Promise.all(
      productsRating.map(async (product: any) => {
        await prisma.rating.create({
          data: {
            point: product.rating as number,
            category: "sheet",
            userId: session.user.id as string,
            sid: product.sellerId as string,
            orderId: orderId as string,
            sheetId: product.productId as string,
          },
        });
      })
    );

    const sellerRate = await prisma.rating.create({
      data: {
        point: sellerRating.rating as number,
        category: "seller",
        userId: session.user.id as string,
        sid: sellerRating.sellerId as string,
        orderId: orderId as string,
        sheetId: null,
      },
    });

    if (!(sellerRate && products)) {
      return NextResponse.json(
        { message: "Error Cannot save all rating" },
        { status: 500 }
      );
    }

    // const faq = await prisma.faq.create({ data: { title, answer } });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log("Error Cannot save all rating", err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
