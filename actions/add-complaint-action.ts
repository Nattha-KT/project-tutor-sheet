"use server"

import prisma from "@/db/prismaDb";
async function addComplaint(formData: FormData,userId:string) {
   try {
    // console.log(userId)
        await prisma.complaint.create({
            data: {
                userId: userId ,
                head:formData.get('head') as string,
                category: formData.get('category') as string,
                role: formData.get('role') as string,
                level: formData.get('level') as string,
                content: formData.get('content') as string,
            },
        });
        return {error:null,success:true}
    } catch (error) {
        // Handle any potential errors here
        console.error("Error adding seller:", error);
        return {error: "Error cannot add complaint" ,success:false}
    } finally {
        // Close the Prisma client when done
        await prisma.$disconnect();
    }
 
  }

  export default addComplaint