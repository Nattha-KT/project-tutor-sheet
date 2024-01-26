"use server"

import prisma from "@/db/prismaDb";
async function getSeller(){
   try {
    const sellersWithSheetCount = await prisma.seller.findMany({
        include: {
          sheet: true
        }
      })

      const sellers = sellersWithSheetCount.map((seller) => {
        return {
          ...seller,
          sheetCount: seller.sheet.length
        };
      });

        return {data:sellers}
    } catch (error) {
        // Handle any potential errors here
        console.error("Error get sellers:", error);
        return {error: "Error cannot fetch Sellers" ,success:false}
    } finally {
        // Close the Prisma client when done
        await prisma.$disconnect();
    }
 
  }
  export default getSeller;