import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database connection Unsuccessful");
  }
}

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
    await main();
    const seller = await prisma.seller.findFirst({ where: { id } });
    if (!seller)
      return NextResponse.json({ message: "Not Found" }, { status: 500 });
    return NextResponse.json({ message: "Success", seller }, { status: 200 });
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
    await main();
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
    const { pen_name, full_name, phone, bank_name, bank_id, address }: Seller =
      await req.json();
    await main();
    const seller = await prisma.seller.update({
      data: { pen_name, full_name, phone, bank_name, bank_id, address },
      where: { id },
    });
    return NextResponse.json({ message: "Success", seller }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
