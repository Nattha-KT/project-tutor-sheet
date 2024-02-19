import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { dbConnect } from "@/db/prismaDb";
import { getAuthSession } from "@/lib/auth";

const dataSheet = {
  id: true,
  name: true,
  course_code: true,
  cover_page: true,
  semester: true,
  year: true,
  type: true,
  price: true,
  num_page: true,
  sid: true,
};

export const GET = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    const uid = session?.user.id;
    await dbConnect();

    const carts = await prisma.cart.findMany({
      where: { userId: uid },
      include: {
        sheet: {
          select: dataSheet,
        },
      },
    });

    const dataSheets = await Promise.all(
      carts.map(async (cart) => {
        const seller = await prisma.seller.findFirst({
          where: { id: cart.sheet.sid },
          select: { pen_name: true, full_name: true },
        });
        return {
          ...cart.sheet,
          pen_name: seller?.pen_name || null,
          full_name:seller?.full_name || null,
          inCart: true,
        };
      })
    );

    return NextResponse.json(
      { message: "success", dataSheets },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
