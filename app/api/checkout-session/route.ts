import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  const body = await req.json();
  const {
    email,
    bookingId,
    studentId,
    date,
    time,
    lessonType,
    mode = "single", // domyślnie single, jeśli brak
  } = body;

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

  if (!origin) {
    return NextResponse.json({ error: "Missing origin" }, { status: 400 });
  }

  // 🎯 Dane dynamiczne w zależności od trybu
  const modes = {
    single: {
      unit_amount: 8000,
      product_name: "Lekcja 1:1",
      lessons: 1,
    },
    "4pack": {
      unit_amount: 28000,
      product_name: "Pakiet 4 lekcji 1:1",
      lessons: 4,
    },
  };

  const selected = modes[mode as keyof typeof modes];

  if (!selected) {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "blik"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "pln",
          unit_amount: selected.unit_amount,
          product_data: { name: selected.product_name },
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: bookingId || "",
      studentId: studentId || "",
      date: date || "",
      time: time || "",
      mode,
      location: lessonType || "",
      lessons: selected.lessons.toString(),
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book`,
  });

  return NextResponse.json({ url: session.url });
}
