"use server";

import prisma from "@/db/prismaDb";
async function getSheetBySeller(sid:string) {
  try {
    const sheets = await prisma.sheet.findMany({
      where:{sid},
    });

    return { error: null, success: true, sheets };
  } catch (error) {
    // Handle any potential errors here
    console.error("Error get sellers:", error);
    return { error: "Error cannot fetch Sellers", success: false };
  } finally {
    // Close the Prisma client when done
    await prisma.$disconnect();
  }
}
export default getSheetBySeller;
