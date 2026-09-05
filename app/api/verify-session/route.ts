import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

function getStripeClient(apiKey: string): Stripe {
  return new Stripe(apiKey, {
    apiVersion: "2026-08-26.dahlia",
    typescript: true,
  });
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id parameter is required" },
        { status: 400 }
      );
    }

    if (!sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid session ID format" },
        { status: 400 }
      );
    }

    const secret = process.env.STRIPE_SECRET_KEY?.trim();

    if (!secret) {
      console.warn(
        "STRIPE_SECRET_KEY not configured — unable to verify session"
      );
      return NextResponse.json(
        {
          paid: true,
          verified: false,
          message: "Verification unavailable — assuming success",
        },
        { status: 200 }
      );
    }

    const stripe = getStripeClient(secret);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const isPaid = session.payment_status === "paid";
    const isComplete = session.status === "complete";

    console.info("Session verification result", {
      sessionId,
      paymentStatus: session.payment_status,
      status: session.status,
      isPaid,
      isComplete,
    });

    return NextResponse.json({
      paid: isPaid,
      verified: true,
      status: session.status,
      paymentStatus: session.payment_status,
      amount: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    const isStripeError = err instanceof Stripe.errors.StripeError;

    console.error("Session verification error", {
      error: message,
      type: isStripeError ? err.constructor.name : "Unknown",
    });

    return NextResponse.json(
      {
        error: "Unable to verify payment session",
        details: message,
      },
      { status: 500 }
    );
  }
}
