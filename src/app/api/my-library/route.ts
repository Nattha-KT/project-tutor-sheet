import { getAuthSession } from "@/lib/auth";
import prisma, { dbConnect } from "../../../db/prismaDb";
import { NextResponse } from "next/server";

const SelectSheet = {
  id: true,
  course_code: true,
  name: true,
  semester: true,
  type: true,
  year: true,
  price: true,
  num_page: true,
  cover_page: true,
  file_path: true,
  sid: true,
};

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
    const orders = await prisma.order
      .findMany({
        where: {
          userId: session.user.id,
          status: "complete",
        },
        select: {
          sheetId: true,
          createdAt: true,
        },
      })
      .then(async (orders) => {
        if (!orders) return null;

        const orderCustoms = await Promise.all(
          orders.map(async (order) => {
            const sheets = await prisma.sheet.findMany({
              where: { id: { in: order.sheetId } },
              select: SelectSheet,
            });

            const sellers = await prisma.seller.findMany({
              where: { id: { in: sheets.map((sheet) => sheet.sid) } },
              select:{
                id:true,
                pen_name: true,
              }
            });

            const sheetsAssignSeller = sheets.map((sheet)=>{
                const matchSeller = sellers.find((seller)=> seller.id ===sheet.sid)
                return {
                    ...sheet,
                    pen_name:matchSeller? matchSeller.pen_name:"Unknown"
                }
            })

            return {
              ...order,
              sheets: sheetsAssignSeller,
            };
          })
        );

        return orderCustoms;
      });
    return NextResponse.json({ message: "success", orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
