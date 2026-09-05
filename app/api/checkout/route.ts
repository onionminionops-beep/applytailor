import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const PRICE_ID =
  process.env.STRIPE_PRICE_ID || "price_1UCPt37pd3R2ckxORRZN5wdj";

const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
  "https://buy.stripe.com/6oU9AN16E4gg7XY578eUU00";

const INTEGRATION_ID = "applytlr_kjn82mpa";

function appUrl(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

function getStripeClient(apiKey: string): Stripe {
  return new Stripe(apiKey, {
    apiVersion: "2026-08-26.dahlia",
    typescript: true,
  });
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY?.trim();
    const base = appUrl(req);

    if (!secret) {
      console.warn(
        "STRIPE_SECRET_KEY not configured — falling back to Payment Link"
      );
      return NextResponse.json({
        url: PAYMENT_LINK,
        mode: "payment_link_fallback",
        message:
          "STRIPE_SECRET_KEY not set — redirecting to Stripe Payment Link.",
      });
    }

    if (!secret.startsWith("sk_live_") && !secret.startsWith("rk_live_")) {
      console.warn(
        "Non-live Stripe key detected — ensure you're using live keys in production"
      );
    }

    const stripe = getStripeClient(secret);

    const clientSessionId = generateSessionId();
    const timestamp = new Date().toISOString();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?canceled=1`,
      allow_promotion_codes: true,
      integration_identifier: INTEGRATION_ID,
      metadata: {
        product: "resume_tailor",
        client_session: clientSessionId,
        created_at: timestamp,
      },
    });

    if (!session.url) {
      console.error("Stripe checkout session created but no URL returned", {
        sessionId: session.id,
      });
      return NextResponse.json(
        {
          error: "Stripe did not return a checkout URL",
          url: PAYMENT_LINK,
          mode: "payment_link_fallback",
        },
        { status: 502 }
      );
    }

    console.info("Checkout session created successfully", {
      sessionId: session.id,
      clientSession: clientSessionId,
    });

    return NextResponse.json({
      url: session.url,
      id: session.id,
      mode: "checkout_session",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    const isStripeError = err instanceof Stripe.errors.StripeError;

    console.error("Checkout creation failed", {
      error: message,
      type: isStripeError ? err.constructor.name : "Unknown",
      code: isStripeError ? err.code : undefined,
    });

    return NextResponse.json(
      {
        error: isStripeError
          ? `Payment setup failed: ${message}`
          : "Unable to create checkout session. Please try the payment link.",
        url: PAYMENT_LINK,
        mode: "payment_link_fallback",
      },
      { status: 200 }
    );
  }
}
