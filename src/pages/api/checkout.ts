import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

const priceId = "price_1PidrsKSp9XR7KADOJIc2qvy"

const successUrl = `${process.env.NEXT_URL}/success`;
const cancelUrl = `${process.env.NEXT_URL}/`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
