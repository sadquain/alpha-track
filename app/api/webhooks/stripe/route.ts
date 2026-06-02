import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await request.text();

  if (!secret || !webhookSecret) {
    return NextResponse.json({ received: true, mode: "mock" });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  return NextResponse.json({ received: true, type: event.type });
}
