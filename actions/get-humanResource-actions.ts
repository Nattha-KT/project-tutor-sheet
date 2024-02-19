"use server"
import prisma from "@/db/prismaDb";
async function getHumanResource() {
  try {

    const [countUser,countSeller] = await Promise.all([
        prisma.user.count(),
        prisma.seller.count(),
    ])

    const managementData = {
        countUser,
        countSeller
    }

    return { error: null, success: true, managementData };
  } catch (error) {
    // Handle any potential errors here
    console.error("Error get sellers:", error);
    return { error: "Error cannot fetch Sellers", success: false };
  } finally {
    // Close the Prisma client when done
    await prisma.$disconnect();
  }
}
export default getHumanResource;
