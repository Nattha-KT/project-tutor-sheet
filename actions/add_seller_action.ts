"use server"

import prisma from "@/lib/prismaDb";

export const addSeller = async (formData:FormData) => {

    const penName = formData.get("pen_name") as string;
    const fullName = formData.get("full_name") as string;
    const idNumber = formData.get("id_number") as string;
    const phone = formData.get("phone") as string;
    const bankName = formData.get("bank_name") as string;
    const bankId = formData.get("bank_id") as string;
    const address = formData.get("address") as string;
    try {
        await prisma.seller.create({
            data: {
                    pen_name: penName,
                    full_name: fullName,
                    phone: phone,
                    bank_name: bankName,
                    bank_id: bankId,
                    address: address,
             },
        });
    } catch (error) {
        // Handle any potential errors here
        console.error("Error adding seller:", error);
    } finally {
        // Close the Prisma client when done
        await prisma.$disconnect();
    }
}