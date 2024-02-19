import { NextApiResponse } from "next";
import prisma, { dbConnect } from "../../../../db/prismaDb";
import { NextResponse } from "next/server";
import { error } from "console";
import { getAuthSession } from "@/lib/auth";

const SelectSheet = {
  id:true,
  name: true,
  cover_page: true,
  course_code: true,
  price: true,
  num_page:true,
  semester: true,
  type: true,
  year: true,
  date: true,
  file_path: true,
  sid: true,
};
export const GET = async (req: Request, res: NextApiResponse) => {
  const session = await getAuthSession();

  try {
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    const orderId = req.url.split("/order/")[1];
    await dbConnect();
    const order = await prisma.order.findFirst({ where: { id: orderId } });
    const sheets = await prisma.sheet.findMany({
      where: {
        id: { in: order?.sheetId },
      },
      select: SelectSheet,
    });

    const sellers = await prisma.seller.findMany({
      where: { id: { in: sheets.map((sheet) => sheet.sid) } },
      select: { pen_name: true, image: true, id: true },
    });

    const customSheets = await Promise.all(
      sellers.map(async (seller) => {
        const matchSheet = sheets.filter((sheet) => sheet.sid === seller.id);
        return { ...seller, matchSheet };
      })
    );

    const RatingsCheck = await prisma.rating.findMany({where:{orderId:order!.id}})

    const mergeOrder = {
      ...order,
      sellers: customSheets,
      ratingsCheck:RatingsCheck
    };

    if (!order)
      return NextResponse.json({ message: "Not Found" }, { status: 500 });

    return NextResponse.json(
      { message: "Success", order: mergeOrder },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
