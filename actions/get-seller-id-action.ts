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
    const ratings  = await prisma.rating.findMany({where:{
      sid:id,
      category:"seller"
    }})

    const averageSellerRating = ratings.reduce((acc, curr) => acc + curr.point, 0)/ratings.length;

    const seller = {
      ...sellersWithSheetCount,
      sheetCount: sellersWithSheetCount?.sheet.length || 0,
      ratingSeller:averageSellerRating? averageSellerRating:0,
      reviewser:ratings.length
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
