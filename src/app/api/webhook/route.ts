import { NextResponse } from "next/server";
import prisma from "@/db/prismaDb";

import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("Stripe-Signature");
  if (!sig) {
    console.log("No signature");
    return NextResponse.json({ error: "No signature" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err });
  }

  // กรณีที่ successfully เท่านั้นถึงจะได้ session มา และ session_id
  switch (event.type) {
    case "checkout.session.completed": // checkout  All Case
      const paymentIntent = event.data.object;
      if (!paymentIntent.metadata) {
        console.log("Error Metadata in Session_stripe is Null");
        break;
      }
      const buyer = JSON.parse(paymentIntent.metadata.buyer);
      const products = JSON.parse(paymentIntent.metadata.metaDataProducts);
      console.log(paymentIntent.id);

      const order = await prisma.order.update({
        data: { status: paymentIntent.status as string },
        where: { session_id: paymentIntent.id },
      });
      
      if (order.status !== "complete") {
        return;
      } else {
        await Promise.all(
          products.map(async (metaProduct: any) => {
            await prisma.cart.delete({
              where: {
                userId_sheetId: {
                  userId: buyer.userId,
                  sheetId: metaProduct.product.prodId,
                },
              },
            });
            const res = await prisma.ownership.create({
              data: {
                sheetId: metaProduct.product.prodId,
                userId: buyer.userId,
                orderId: order.id,
              },
            });
            if (!res) {
              console.log("Error Cannot Create Owner Product");
            } else {
              console.log("Create Owner Product Success!!");
            }
          })
        );
      }

      break;

    case "payment_intent.payment_failed": // PromptPay Case SubCheckout case checkout.session.expired
      // const paymentMethod = event.data.object;

      break;

    case "checkout.session.expired":
      const paymentIntentExpired = event.data.object;
      console.log(paymentIntentExpired);

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
