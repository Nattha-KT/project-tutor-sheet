import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma, { dbConnect } from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { Role } from "@prisma/client";


type Seller = {
  pen_name: string;
  full_name: string;
  phone: string;
  bank_name: string;
  bank_id: string;
  address: string;
  image: string;
};

export const GET = async (req: Request) => {
  try {
    const session = await getAuthSession();
    const id = session?.user.sid;
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    await dbConnect();

    const seller = await prisma.seller.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: { sheet: true },
        },
      },
    }).then(async(seller)=>{
      if(!seller) return;

      const ratings  = await prisma.rating.findMany({where:{
        sid:seller.id,
        category:"seller"
      }})

      const averageSellerRating = ratings.reduce((acc, curr) => acc + curr.point, 0)/ratings.length;

      return {
        ...seller,
        ratingSeller:averageSellerRating? averageSellerRating:0,
        reviewser:ratings.length
      }
    })


    const sellerCustom = {
      ...seller,
      _count: seller && seller._count.sheet,
    };

    if (!seller)
      return NextResponse.json({ message: "Not Found" }, { status: 500 });
    return NextResponse.json(
      { message: "Success", seller: sellerCustom },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const {
      pen_name,
      full_name,
      phone,
      bank_name,
      bank_id,
      address,
      image,
    }: Seller = await req.json();
    await dbConnect();
    const seller = await prisma.seller.create({
      data: { pen_name, full_name, phone, bank_name, bank_id, address, image },
    });
    return NextResponse.json({ message: "Success", seller }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    const id = session?.user.sid;
    const { pen_name, full_name, phone, bank_name, bank_id, address,about_me } =
      await req.json();
    await dbConnect();
    const seller = await prisma.seller.update({
      data: { pen_name, full_name, phone, bank_name, bank_id, address,about_me },
      where: { id },
    });
    return NextResponse.json({ message: "Success", seller }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request) => {
  //route นี้อย่าลืมว่าต้องเชคก่อนว่าใช่ admin ไหม

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    const id = session?.user.sid;
    await dbConnect();
    const res = await prisma.user.updateMany({
      data: { role: "USER" as Role },
      where: { sid: id },
    });
    await prisma.seller.delete({ where: { id } });

    return NextResponse.json({ message: "Success", res }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error Delete Seller", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
