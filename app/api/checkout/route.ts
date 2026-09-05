import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const PRICE_ID =
  process.env.STRIPE_PRICE_ID || "price_1UCPt37pd3R2ckxORRZN5wdj";

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00";

function appUrl(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    const base = appUrl(req);

    if (!secret) {
      return NextResponse.json({
        url: PAYMENT_LINK,
        mode: "payment_link_fallback",
        message:
          "STRIPE_SECRET_KEY not set — redirecting to Stripe Payment Link.",
      });
    }

    const stripe = new Stripe(secret);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?canceled=1`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL", url: PAYMENT_LINK },
        { status: 502 }
      );
    }

    return NextResponse.json({
      url: session.url,
      id: session.id,
      mode: "checkout_session",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json(
      {
        error: message,
        url: PAYMENT_LINK,
        mode: "payment_link_fallback",
      },
      { status: 200 }
    );
  }
}
