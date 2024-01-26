"use server";

import prisma from "@/db/prismaDb";
async function getSellerById(id:string) {
  try {
    const sellersWithSheetCount = await prisma.seller.findFirst({
      where:{id},
      include: {
        sheet: {
          select:{
            id:true,
          }
        },
        user: {
          select:{
            email: true,
            name: true,
          }
        },
      },
    });

    const seller = {
      ...sellersWithSheetCount,
      sheetCount: sellersWithSheetCount?.sheet.length || 0,
    };

    return { error: null, success: true, seller };
  } catch (error) {
    // Handle any potential errors here
    console.error("Error get sellers:", error);
    return { error: "Error cannot fetch Sellers", success: false };
  } finally {
    // Close the Prisma client when done
    await prisma.$disconnect();
  }
}
export default getSellerById;
