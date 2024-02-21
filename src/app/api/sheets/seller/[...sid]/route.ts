import { NextApiResponse } from "next";
import prisma, { dbConnect } from "../../../../../db/prismaDb";
import { NextResponse,NextRequest  } from "next/server"
import { getAuthSession } from "@/lib/auth";



export const GET = async (req: NextRequest , res: NextApiResponse)=>{

        try{
            const session = await getAuthSession();
            const searchQuery = req.nextUrl.searchParams.get("search");
            const slug = req.url.split("/sheets/seller/")[1];
            const sid = session?.user.sid;
            let take = parseInt(slug.split("/")[1],10);
            const skip = parseInt(slug.split("/")[2],10);

            await dbConnect();
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
                            id:true,
                            full_name:true,
                            pen_name:true,
                            image:true,
                        }
                    }
                }
            }).then(async (sheets) => {
              if (!sheets) return;
              if (!session) return sheets;
        
              const [favorites,ratings] = await Promise.all([
                prisma.favorite.findMany({
                  where: {
                    userId: session.user.id,
                    sheetId: {in: sheets.map((sheet)=>sheet.id)},
                  },
                }),

                prisma.rating.findMany({where:{
                  OR: [
                    { sheetId: { in: sheets.map(sheet => sheet.id) } },
                    { sheetId: null }
                  ]
                }})
              ]);
        
              const sheetWithFavorite = await Promise.all(sheets.map(async sheet => {
                const mapFavByMe = favorites.find(fav => fav.sheetId === sheet.id);

                const mapSheetRatings= ratings.filter(rating => (rating.sheetId === sheet.id)&&(rating.category === "sheet"));
                const mapSellerRatings= ratings.filter(rating => (rating.sid === sheet.seller.id )&&(rating.category === "seller"));

                const averageSheetRating = mapSheetRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSheetRatings.length;
                const averageSellerRating = mapSellerRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSellerRatings.length;

                return {
                  ...sheet,
                  favorite:mapFavByMe?true:false,
                  ratingSheet:averageSheetRating? averageSheetRating:0,
                  ratingSeller:averageSellerRating? averageSellerRating:0
                };
              }));
            
              return sheetWithFavorite;
            
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

