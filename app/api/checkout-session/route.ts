import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Najnowsza stabilna wersja
});

export async function POST(req: Request) {
  const { email, bookingId, studentId, date, time, lessonType } = await req.json();
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

  if (!origin) {
    return NextResponse.json({ error: "Missing origin" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: 8000,
          product_data: { name: "Lekcja 1:1" },
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId,
      studentId,
      date,
      time,
      mode: "single",
      location: lessonType,
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book`,
  });
  

  return NextResponse.json({ url: session.url });
}

