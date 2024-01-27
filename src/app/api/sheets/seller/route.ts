import { NextApiResponse } from "next";
// import prisma from "../../../../lib/prismaDb";
import prisma from "@/db/prismaDb";
import { NextResponse } from "next/server";
import { Sheet } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database connection Unsuccessful");
  }
}

export const GET = async () => {
  try {
    const session = await getAuthSession();
    const sid = session?.user.sid;
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized Please login" },
        { status: 401 }
      );
    }
    await main();
    const sheets = await prisma.sheet.findMany({
      where: { sid },
    });
    return NextResponse.json({ message: "Success", sheets }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
