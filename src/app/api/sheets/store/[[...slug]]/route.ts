import { NextApiResponse } from "next";
import prisma, { dbConnect } from "../../../../../db/prismaDb";
import { NextResponse, NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";


export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const session = await getAuthSession();
    const searchQuery = req.nextUrl.searchParams.get("search");
    // const filterByAll = req.nextUrl.searchParams.get("filter");
    const slug = req.url.split("/store/")[1];
    let take = parseInt(slug.split("/")[0], 10);
    const skip = parseInt(slug.split("/")[1], 10);

    await dbConnect();
    const sheetsBySid = await prisma.sheet.findMany(
      {
        skip: skip || undefined,
        take: take || undefined,
        where: {
          ...(searchQuery
            ? {
                OR: [
                  {
                    course_code: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                  {
                    name: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                  {
                    seller: {
                      OR: [
                        {
                          full_name: {
                            contains: searchQuery,
                            mode: "insensitive",
                          },
                        },
                        {
                          pen_name: {
                            contains: searchQuery,
                            mode: "insensitive",
                          },
                        },
                      ],
                    },
                  },
                ],
              }
            : {}),
            status_approve:true,
        },
        include: {
          seller: {
            select: {
              id:true,
              full_name: true,
              pen_name: true,
              image: true,
            },
          },
        },
      },
      
    ).then(async (sheets) => {
      if (!sheets) return;


      if (!session)  {
          const ratingAll = await prisma.rating.findMany()
          const sheetsCustom = await Promise.all(sheets.map(async sheet => {
            const mapSheetRatings= ratingAll.filter(rating => (rating.sheetId === sheet.id)&&(rating.category === "sheet"));
            const mapSellerRatings= ratingAll.filter(rating => (rating.sid === sheet.seller.id )&&(rating.category === "seller"));
    
            const averageSheetRating = mapSheetRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSheetRatings.length;
            const averageSellerRating = mapSellerRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSellerRatings.length;
            
            return {
              ...sheet,
              ratingSheet:averageSheetRating? averageSheetRating:0,
              ratingSeller:averageSellerRating? averageSellerRating:0,
              reviewserSheet:mapSheetRatings.length,
              reviewserSeller:mapSellerRatings.length,
            };
          }));
          return sheetsCustom 
      };

      const [favorites, carts, ownerships,ratingAll] = await Promise.all([
        prisma.favorite.findMany({
          where: {
            userId: session.user.id,
            sheetId: { in: sheets.map(sheet => sheet.id) },
          },
        }),
        prisma.cart.findMany({
          where: {
            userId: session.user.id,
            sheetId: { in: sheets.map(sheet => sheet.id) },
          },
        }),
        prisma.ownership.findMany({
          where: {
            userId: session.user.id,
            sheetId: { in: sheets.map(sheet => sheet.id) },
          },
        }),
        prisma.rating.findMany(),
      ]);


      const sheetsCustom = await Promise.all(sheets.map(async sheet => {
        const mapFavByUser= favorites.find(fav => fav.sheetId === sheet.id);
        const mapCartByUser= carts.find(cart => cart.sheetId === sheet.id);
        const mapOwnership= ownerships.find(ownership => ownership.sheetId === sheet.id);
        const mapSheetRatings= ratingAll.filter(rating => (rating.sheetId === sheet.id)&&(rating.category === "sheet"));
        const mapSellerRatings= ratingAll.filter(rating => (rating.sid === sheet.seller.id )&&(rating.category === "seller"));

        const averageSheetRating = mapSheetRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSheetRatings.length;
        const averageSellerRating = mapSellerRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSellerRatings.length;

        // console.log("averageSheetRating :",averageSheetRating ? averageSheetRating:0)
        // console.log("averageSellerRating",averageSellerRating ? averageSellerRating:0)
        
        return {
          ...sheet,
          favorite:mapFavByUser?true:false,
          inCart:mapCartByUser?true:false,
          owner:mapOwnership?true:false,
          ratingSheet:averageSheetRating? averageSheetRating:0,
          ratingSeller:averageSellerRating? averageSellerRating:0,
          reviewserSheet:mapSheetRatings.length,
          reviewserSeller:mapSellerRatings.length,
        };
      }));
    
      return sheetsCustom;
    
    });

    const totalItems = await prisma.sheet.count({
      where: {
        ...(searchQuery
          ? {
              OR: [
                {
                  course_code: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
                {
                  name: {
                    contains: searchQuery,
                    mode: "insensitive",
                  },
                },
                {
                  seller: {
                    OR: [
                      {
                        full_name: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                      {
                        pen_name: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              ],
            }
          : {}),
      },
    });

    const results = {
      sheets: sheetsBySid,
      metaData: {
        hasNextPage: take != 0 ? skip + take < totalItems : false,
        totalPages: take != 0 ? Math.ceil(totalItems / take) : 0,
      },
    };
    
    if (!sheetsBySid)
      return NextResponse.json({ message: "Not Found" }, { status: 500 });
    return NextResponse.json({ message: "Success", results }, { status: 200 });
  } catch (err) {
    console.log("error Occur between fetch data")
    return NextResponse.json(
      { message: "Error creating", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
