import { NextApiRequest, NextApiResponse } from "next";
import prisma, { dbConnect } from "../../../../../db/prismaDb";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";


const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      image: true,
    },
  },
};

export const GET = async (req: Request, res: NextApiResponse) => {
  const session = await getAuthSession();
  const id = req.url.split("/by-id/")[1];
  try {
    await dbConnect();
    const sheetsById = await prisma.sheet
      .findFirst({
        where: { id },
        include: {
          seller: {
            select: {
              id: true,
              full_name: true,
              pen_name: true,
              image: true,
            },
          },
          comment: {
            select: {
              ...COMMENT_SELECT_FIELDS,
              _count: { select: { likes: true } },
            },
            orderBy: {
              createdAt: "desc", // หรือ 'desc'
            },
          },
        },
      })
      .then(async (sheet) => {
        if (!sheet) return;
        if (!session?.user) return sheet;

        const [likes, sheetShows, favorite, cart, ownership, ratingAll] =
          await Promise.all([
            prisma.like.findMany({
              where: {
                userId: session.user.id,
                commentId: { in: sheet.comment.map((comment) => comment.id) },
              },
            }),

            prisma.sheet.findMany({
              where: {
                sid: sheet.sid,
                id: {
                  not: sheet.id,
                },
                status_approve: true,
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
              orderBy: {
                id: "asc", // 'desc' ถ้าต้องการสุ่มจากมากไปน้อย
              },
              take: 4,
            }),

            prisma.favorite.findFirst({
              where: {
                userId: session.user.id,
                sheetId: sheet.id,
              },
            }),

            prisma.cart.findFirst({
              where: {
                userId: session.user.id,
                sheetId: sheet.id,
              },
            }),

            prisma.ownership.findFirst({
              where: {
                userId: session.user.id,
                sheetId: sheet.id,
              },
            }),

            prisma.rating.findMany(),
          ]);

        const commentsWithLikes = await Promise.all(
          sheet.comment.map(async (comment) => {
            const { _count, ...commentFields } = comment;
            const likedByMe = likes.find(
              (like) => like.commentId === comment.id
            );
            return {
              ...commentFields,
              likedByMe,
              likeCount: _count.likes,
            };
          })
        );
        
        //after fetch SheetShow
        const [favorites, carts, ownerships] = await Promise.all([
          prisma.favorite.findMany({
            where: {
              userId: session.user.id,
              sheetId: { in: sheetShows.map(sheet => sheet.id) },
            },
          }),
          prisma.cart.findMany({
            where: {
              userId: session.user.id,
              sheetId: { in: sheetShows.map(sheet => sheet.id) },
            },
          }),
          prisma.ownership.findMany({
            where: {
              userId: session.user.id,
              sheetId: { in: sheetShows.map(sheet => sheet.id) },
            },
          }),
        ]);


        const sheetShowCustom = await Promise.all(sheetShows.map((sheetShow)=>{
          const mapFavByUser= favorites.find(fav => fav.sheetId === sheetShow.id);
          const mapCartByUser= carts.find(cart => cart.sheetId === sheetShow.id);
          const mapOwnership= ownerships.find(ownership => ownership.sheetId === sheetShow.id);
          const sheetRatings = ratingAll.filter(rating => (rating.sheetId === sheetShow.id) && (rating.category === "sheet"));
          const sellerRatings= ratingAll.filter(rating => (rating.sid === sheetShow.sid) && (rating.category === "seller"));

          const averageSheetRating = sheetRatings.reduce((acc, curr) => acc + curr.point, 0)/sheetRatings.length;
          const averageSellerRating = sellerRatings.reduce((acc, curr) => acc + curr.point, 0)/sellerRatings.length;

          return {
            ...sheetShow,
            favorite:mapFavByUser?true:false,
            inCart:mapCartByUser?true:false,
            owner:mapOwnership?true:false,
            ratingSheet:averageSheetRating? averageSheetRating:0,
            ratingSeller:averageSellerRating? averageSellerRating:0,
            reviewserSheet:sheetRatings.length,
            reviewserSeller:sellerRatings.length,
          }
        }))

        const mapSheetRatings = ratingAll.filter((rating) => (rating.sheetId === sheet.id) && (rating.category === "sheet"));
        const mapSellerRatings= ratingAll.filter(rating => (rating.sid === sheet.seller.id )&&(rating.category === "seller"));

        const averageSheetRating = mapSheetRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSheetRatings.length;
        const averageSellerRating = mapSellerRatings.reduce((acc, curr) => acc + curr.point, 0)/mapSellerRatings.length;

 
        return {
          ...sheet,
          comment: commentsWithLikes,
          favorite: favorite ? true : false,
          inCart: cart ? true : false,
          owner: ownership ? true : false,
          sheetShows: sheetShowCustom,
          ratingSheet:averageSheetRating? averageSheetRating:0,
          ratingSeller:averageSellerRating? averageSellerRating:0,
          reviewserSheet:mapSheetRatings.length,
          reviewserSeller:mapSellerRatings.length,
        };
      });


    if (!sheetsById || sheetsById === undefined)
      return NextResponse.json({ message: "Not Found" }, { status: 500 });
    return NextResponse.json(
      { message: "Success", sheetsById },
      { status: 200 }
    );
  } catch (err) {
    console.log("error Occur between fetch data" ,err)
    return NextResponse.json(
      { message: "Error cannot get sheet by id", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextApiResponse) => {
  try {
    const id = req.url.split("/by-id/")[1];
    const {
      course_code,
      name,
      type,
      semester,
      year,
      class_details,
      content_details,
    } = await req.json();
    await dbConnect();
    const sheetsById = await prisma.sheet.update({
      data: {
        course_code,
        name,
        type,
        semester,
        year,
        class_details,
        content_details,
      },
      where: { id },
    });

    if (!sheetsById)
      return NextResponse.json({ message: "Not Found" }, { status: 500 });
    return NextResponse.json(
      { message: "Success", sheetsById },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextApiResponse) => {
  try {
    const id = req.url.split("/by-id/")[1];
    await dbConnect();
    const sheet = await prisma.sheet.delete({ where: { id } });

    return NextResponse.json({ message: "Success", sheet }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error Delete Sheet", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
