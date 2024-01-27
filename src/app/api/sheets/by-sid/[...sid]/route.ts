import { NextApiResponse } from "next";
import prisma from "../../../../../db/prismaDb";
import { NextResponse,NextRequest  } from "next/server"
import { getAuthSession } from "@/lib/auth";

export async function main() {
    try{
        await prisma.$connect();
    }catch(err){
        return Error ("Database connection Unsuccessful");
    }
}


export const GET = async (req: NextRequest , res: NextApiResponse)=>{

        try{
            const searchQuery = req.nextUrl.searchParams.get("search");
            const slug = req.url.split("/sheets/by-sid/")[1];
            const sid = slug.split("/")[0];
            let take = parseInt(slug.split("/")[1],10);
            const skip = parseInt(slug.split("/")[2],10);

            await main();
            const sheetsBySid = await prisma.sheet.findMany({ 
                skip: skip||undefined,
                take: take || undefined,
                where: {
                    sid: {
                      equals: sid, 
                    },
                    ...(searchQuery ? {
                        OR: [
                          {
                            course_code: {
                              contains: searchQuery,
                              mode: "insensitive", 
                            }
                          },
                          {
                            name: {
                              contains: searchQuery,
                              mode: "insensitive", 
                            },
                          }
                        ]
                      } : {}),
                  },
                include:{
                    seller:{
                        select:{
                            full_name:true,
                            pen_name:true,
                            image:true,
                        }
                    }
                }
            });
            const total = await prisma.sheet.count({where:{
                sid: {
                  equals: sid, 
                },
                ...(searchQuery ? {
                    OR: [
                      {
                        course_code: {
                          contains: searchQuery,
                          mode: "insensitive", 
                        }
                      },
                      {
                        name: {
                          contains: searchQuery,
                          mode: "insensitive", 
                        },
                      }
                    ]
                  } : {}),
              },})
            const results = {
                sheets:sheetsBySid,
                metaData:{
                    hasNextPage: skip + take < total,
			        totalPages: Math.ceil(total / take),
                }
            }

            if(!sheetsBySid)
                return NextResponse.json({message: "Not Found"},{status:500});
            return NextResponse.json({message: "Success",results},{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error creating",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    }

