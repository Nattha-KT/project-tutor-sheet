import prisma, { dbConnect } from "../../../db/prismaDb";
import { NextResponse } from "next/server";


export const GET = async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const faq = await prisma.faq.findMany();
    return NextResponse.json({ message: "success", faq }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { title, answer } = await req.json();
    await dbConnect();
    const faq = await prisma.faq.create({ data: { title, answer } });
    return NextResponse.json({ message: "Success", faq }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

