import { NextApiRequest, NextApiResponse } from 'next';
import prisma, { dbConnect } from "../../../../db/prismaDb";
import { NextResponse } from "next/server"
import { Role } from '@prisma/client';
import { getAuthSession } from '@/lib/auth';

type Seller={
    pen_name: string,
    full_name: string,
    phone:string,
    bank_name: string,
    bank_id: string
    address:string,
  }


//Note!!!!! เส้นนี้้ถูกใช้ใน Role User เพื่อโชวหน้าโปรไฟล์นะ
export const GET = async (req: Request)=>{

    const session = await getAuthSession();
        try{
            const id = req.url.split("/seller/")[1];
            await dbConnect();
            const seller = await prisma.seller.findFirst({
                where:{id},
                include:{
                    sheet:true,
                    _count:{
                        select:{
                            sheet:true,
                        }
                    }
                }
            }).then(async (seller)=>{
                if(!seller) return null;
                if (!session)  {
                    const [ratingSeller,ratingAll] = await Promise.all([
                      prisma.rating.findMany({where:{
                        sid:seller.id,
                        category:"seller"
                        }}),
    
                        prisma.rating.findMany(),
                    ])

                    const filterdSheet = seller.sheet.filter((sheet) => sheet.status_approve === true);
                    const averageSellerRating = ratingSeller.reduce((acc, curr) => acc + curr.point, 0)/ratingSeller.length;

                    const sheetsShowCustom = await Promise.all(filterdSheet.map((sheet)=>{
                        const sheetRatings = ratingAll.filter(rating => (rating.sheetId === sheet.id) && (rating.category === "sheet"));
                        const sellerRatings= ratingAll.filter(rating => (rating.sid === sheet.sid) && (rating.category === "seller"));
              
                        const averageSheetRating = sheetRatings.reduce((acc, curr) => acc + curr.point, 0)/sheetRatings.length;
                        const averageSellerRating = sellerRatings.reduce((acc, curr) => acc + curr.point, 0)/sellerRatings.length;
              
                        return {
                          ...sheet,
                          ratingSheet:averageSheetRating? averageSheetRating:0,
                          ratingSeller:averageSellerRating? averageSellerRating:0,
                          reviewserSheet:sheetRatings.length,
                          reviewserSeller:sellerRatings.length,
                        }
                      }))

                      return {
                        ...seller,
                        sheet:sheetsShowCustom,
                        ratingSeller:averageSellerRating? averageSellerRating:0,
                        reviewsers:ratingSeller.length
                      }
                };

                const [favorites, carts, ownerships,ratingSeller,ratingAll] = await Promise.all([

                    prisma.favorite.findMany({
                        where: {
                          userId: session.user.id,
                          sheetId: { in: seller.sheet.map(sheet => sheet.id) },
                        },
                    }),
                    prisma.cart.findMany({
                    where: {
                        userId: session.user.id,
                        sheetId: { in: seller.sheet.map(sheet => sheet.id) },
                    },
                    }),
                    prisma.ownership.findMany({
                    where: {
                        userId: session.user.id,
                        sheetId: { in: seller.sheet.map(sheet => sheet.id) },
                    },
                    }),

                    prisma.rating.findMany({where:{
                    sid:seller.id,
                    category:"seller"
                    }}),

                    prisma.rating.findMany(),
                ])


                const filterdSheet = seller.sheet.filter((sheet) => sheet.status_approve === true);

                const sheetsShowCustom = await Promise.all(filterdSheet.map((sheet)=>{
                    const mapFavByUser= favorites.find(fav => fav.sheetId === sheet.id);
                    const mapCartByUser= carts.find(cart => cart.sheetId === sheet.id);
                    const mapOwnership= ownerships.find(ownership => ownership.sheetId === sheet.id);
                    const sheetRatings = ratingAll.filter(rating => (rating.sheetId === sheet.id) && (rating.category === "sheet"));
                    const sellerRatings= ratingAll.filter(rating => (rating.sid === sheet.sid) && (rating.category === "seller"));
          
                    const averageSheetRating = sheetRatings.reduce((acc, curr) => acc + curr.point, 0)/sheetRatings.length;
                    const averageSellerRating = sellerRatings.reduce((acc, curr) => acc + curr.point, 0)/sellerRatings.length;
          
                    return {
                      ...sheet,
                      favorite:mapFavByUser?true:false,
                      inCart:mapCartByUser?true:false,
                      owner:mapOwnership?true:false,
                      ratingSheet:averageSheetRating? averageSheetRating:0,
                      ratingSeller:averageSellerRating? averageSellerRating:0,
                      reviewserSheet:sheetRatings.length,
                      reviewserSeller:sellerRatings.length,
                    }
                  }))

            
                const averageSellerRating = ratingSeller.reduce((acc, curr) => acc + curr.point, 0)/ratingSeller.length;

                return {
                    ...seller,
                    sheet:sheetsShowCustom,
                    ratingSeller:averageSellerRating? averageSellerRating:0,
                    reviewsers:ratingSeller.length
                  }
            })

            if (!seller) {
                return NextResponse.json({ message: "Not Found" }, { status: 500 });
            }
          
            const totalSheets = seller._count.sheet; // นับทั้งหมด
            const approvedSheets = await prisma.sheet.count({
              where: { sid: id, status_approve: true },
            }); 

            return NextResponse.json( { message: "Success", totalSheets, approvedSheets,seller },{status:200});
    
        }catch(err){
            return NextResponse.json({message: "Error creating",err},{status:500})
        }finally{
            await prisma.$disconnect();
        }
    }

export const PUT = async (req: Request,)=>{

    //route นี้อย่าลืมว่าต้องเชคก่อนว่าใช่ admin ไหม

    try{
        const id = req.url.split("/seller/")[1];
        const {pen_name,full_name,phone,bank_name,bank_id,address}:Seller = await req.json();
        await dbConnect();
        const seller = await prisma.seller.update({
            data:{pen_name,full_name,phone,bank_name,bank_id,address},
            where :{id},
        });
        return NextResponse.json({message: "Success",seller},{status:200});

    }catch(err){
        return NextResponse.json({message: "Error",err},{status:500})
    }finally{
        await prisma.$disconnect();
    }

};

export const DELETE = async (req: Request) => {

    //route นี้อย่าลืมว่าต้องเชคก่อนว่าใช่ admin ไหม

    try {
      const id = req.url.split("/seller/")[1];
      await dbConnect();
      const res = await prisma.user.updateMany({
          data: { role: "USER" as Role},
          where: { sid: id },
        });
      await prisma.seller.delete({ where: { id } });
  
      return NextResponse.json({ message: "Success",res }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { message: "Error Delete Seller", err },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  };