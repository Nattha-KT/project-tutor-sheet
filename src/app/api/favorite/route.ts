import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { dbConnect } from "@/db/prismaDb";
import { getAuthSession } from "@/lib/auth";

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
        select: { sheetId: true },
      });
      
      const sheetIds = favorites.map((favorite) => favorite.sheetId);
      
      const sheets = await prisma.sheet.findMany({
        where: { id: { in: sheetIds } },
        select: {
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
        },
      });

      const favorite = await prisma.favorite.findMany({
        where: {
          userId: session.user.id,
          sheetId: {in: sheets.map((sheet)=>sheet.id)},
        },
      });

      
      const dataSheets = await Promise.all(
        sheets.map(async (sheet) => {
          const seller = await prisma.seller.findFirst({
            where: { id: sheet.sid },
            select: { pen_name: true },
          });
          const mapFavByMe = favorite.find(fav => fav.sheetId === sheet.id);
      
          return {
            ...sheet,
            pen_name: seller?.pen_name || null,
            favorite:mapFavByMe?true:false,
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
