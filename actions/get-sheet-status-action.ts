"use server"

import prisma from "@/db/prismaDb";
async function getSheetbyStatus(status: boolean){
   try {
    // console.log(userId)
        const sheets = await prisma.sheet.findMany({
            where: { status_approve: status },
            include: {
                seller:true
            }
        });
        return {error:null,success:true,data:sheets}
    } catch (error) {
        // Handle any potential errors here
        console.error("Error get sheet by status:", error);
        return {error: "Error cannot fetch sheet by status" ,success:false}
    } finally {
        // Close the Prisma client when done
        await prisma.$disconnect();
    }
 
  }
  export default getSheetbyStatus