import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const { plan = "pro" } = await request.json().catch(() => ({ plan: "pro" }));
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      { checkoutUrl: `/pricing?checkout=${plan}`, mode: "mock" },
      { status: 200 },
    );
  }

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/pricing?canceled=true`,
    line_items: [{ price: process.env[`STRIPE_${String(plan).toUpperCase()}_PRICE_ID`] ?? "", quantity: 1 }],
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
