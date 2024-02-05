import { NextApiResponse } from "next";
import prisma from "../../../../../db/prismaDb";
import { NextResponse, NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database connection Unsuccessful");
  }
}

export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const session = await getAuthSession();
    const searchQuery = req.nextUrl.searchParams.get("search");
    // const filterByAll = req.nextUrl.searchParams.get("filter");
    const slug = req.url.split("/store/")[1];
    let take = parseInt(slug.split("/")[0], 10);
    const skip = parseInt(slug.split("/")[1], 10);

    await main();
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
        },
        include: {
          seller: {
            select: {
              full_name: true,
              pen_name: true,
              image: true,
            },
          },
        },
      },
      
    ).then(async (sheets) => {
      if (!sheets) return;
      if (!session) return sheets;

      const favorite = await prisma.favorite.findMany({
        where: {
          userId: session.user.id,
          sheetId: {in: sheets.map((sheet)=>sheet.id)},
        },
      });

      const sheetWithFavorite = await Promise.all(sheets.map(async sheet => {
        const mapFavByMe = favorite.find(fav => fav.sheetId === sheet.id);
        return {
          ...sheet,
          favorite:mapFavByMe?true:false,
        };
      }));
    
      return sheetWithFavorite;
    
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
    return NextResponse.json(
      { message: "Error creating", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
