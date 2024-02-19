import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { dbConnect } from "@/db/prismaDb";
import { getAuthSession } from "@/lib/auth";


const dataSheet={
  id:true,
  name:true,
  course_code: true,
  cover_page:true,
  semester: true,
  year: true,
  type: true,
  price: true,
  num_page: true,
  sid: true,
}


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

    const favorites = await prisma.favorite.findMany({
        where: { userId: uid },
        include: { sheet: {
          select:dataSheet
        }}
      });

      const cart = await prisma.cart.findMany({
        where:{userId: uid}
      })

      
      const ownerships = await prisma.ownership.findMany({
        where: {
          userId: session.user.id,
          sheetId: {in: favorites.map((favorite)=>favorite.sheet.id)},
        },
      });

      const dataSheets = await Promise.all(
        favorites.map(async (favorite) => {
          const seller = await prisma.seller.findFirst({
            where: { id: favorite.sheet.sid },
            select: { pen_name: true },
          });
          const inCart = cart.find(cart=>cart.sheetId === favorite.sheet.id)
          const mapOwnership= ownerships.find(ownership => ownership.sheetId === favorite.sheet.id);

          return {
            ...favorite.sheet,
            pen_name: seller?.pen_name || null,
            favorite:true,
            inCart:inCart?true:false,
            owner:mapOwnership?true:false,
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
