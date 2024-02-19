import { NextResponse } from "next/server";
import { SheetCartProps } from "@/hooks/useCart";
import { v4 as uuidv4 } from "uuid";
import prisma, { dbConnect } from "@/db/prismaDb";
import { getAuthSession } from "@/lib/auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (request: any) => {
  const { products } = await request.json();
  const data: SheetCartProps[] = products;
  const session = await getAuthSession();
  const orderId = uuidv4();

  await dbConnect();
  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized Please login" },
      { status: 401 }
    );
  }

  try {
    let stripeItems: any = [];
    let metaDataProducts: any = [];

    for (const product of data) {
      stripeItems.push({
        price_data: {
          currency: "thb",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      });

      metaDataProducts.push({
        product: {
          prodId: product.id,
          ProductName: product.name,
          price: product.price,
          seller: {
            fullName: product.full_name,
            sellerId: product.sid,
          },
        },
      });
    }
    let metaDataProductsJsonString = JSON.stringify(metaDataProducts);
    // const metaDataProductsObject = JSON.parse(metaDataProductsJsonString);

    const userData = {
      userId: session.user.id,
      username: session.user.name,
      email: session.user.email,
    };
  

      const session_stripe = await stripe.checkout.sessions.create({
      payment_method_types: ["promptpay", "card"],
      line_items: stripeItems,
      mode: "payment",
      success_url: `http://localhost:3000/my-library/success/${orderId}`,
      cancel_url: "http://localhost:3000/my-library/cancel",
      metadata: {
        metaDataProducts: metaDataProductsJsonString,
        buyer: JSON.stringify(userData),
      },
    });

    const sheetsId = data.map((sheet) => sheet.id);

    await prisma.order.create({
      data: {
        id: orderId,
        sheetId: sheetsId,
        session_id: session_stripe.id,
        status: session_stripe.status,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: session_stripe.url });
  } catch (error) {
    console.error("Error Durring Create Session payment", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
