import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../db/prismaDb";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";


export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database connection Unsuccessful");
  }
}

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
    await main();
    const sheetsById = await prisma.sheet.findFirst({
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
    }).then(async sheet => {
      if (!sheet) return;
      if (!session?.user) return sheet;
    
      const likes = await prisma.like.findMany({
        where: {
          userId: session.user.id,
          commentId: { in: sheet.comment.map(comment => comment.id) },
        },
      });

      const sheetShow = await prisma.sheet.findMany({
        where: { 
          sid: sheet.sid,
          id: {
            not: sheet.id,
          }, 
        },
        include:{
          seller:{
              select:{
                  full_name:true,
                  pen_name:true,
                  image:true,
              }
          }
      },
        orderBy: {
          id: 'asc', // 'desc' ถ้าต้องการสุ่มจากมากไปน้อย
        },
        take: 4, 
      });
    
      const commentsWithLikes = await Promise.all(sheet.comment.map(async comment => {
        const { _count, ...commentFields } = comment;
        const likedByMe = likes.find(like => like.commentId === comment.id);
        return {
          ...commentFields,
          likedByMe,
          likeCount: _count.likes,
        };
      }));

      const favorite = await prisma.favorite.findFirst({
        where: {
          userId: session.user.id,
          sheetId: sheet.id,
        },
      });
    
      return {
        ...sheet,
        comment: commentsWithLikes,
        favorite: favorite?true:false,
        sheetShow:sheetShow
      };
    });

      if (!sheetsById || sheetsById === undefined)
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
    await main();
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
    await main();
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
