import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

async function getClerkUserEmail(userId: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch user from Clerk:", await res.text());
      return null;
    }

    const user = await res.json();
    return user.email_addresses?.[0]?.email_address || null;
  } catch (err) {
    console.error("❌ Error fetching user from Clerk:", err);
    return null;
  }
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("❌ Missing Stripe signature");
    return new NextResponse("Missing signature", { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Invalid Stripe signature:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("📦 Stripe event type:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    console.log("📥 Metadata from Stripe:", metadata);

    const studentId = metadata?.studentId;
    const date = metadata?.date;
    const time = metadata?.time;

    if (!studentId || !date || !time) {
      console.error("❌ Missing metadata:", { studentId, date, time });
      return new NextResponse("Missing metadata", { status: 400 });
    }

    const email = await getClerkUserEmail(studentId);
    if (!email) {
      console.error("❌ Failed to fetch email for studentId:", studentId);
      return new NextResponse("Missing email", { status: 400 });
    }

    // N8N HOOK — utworzenie wydarzenia w Google Calendar
    try {
      const n8nWebhookUrl = "https://n8n.kacperpietrusiak.pl/webhook/book-lesson";

      const payload = {
        date,
        time,
        email,
        name: session.customer_details?.name || "Uczeń",
      };

      console.log("📡 Sending payload to N8N:", payload);

      const res = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "MathbyteBot/1.0",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error(`❌ N8N responded with status ${res.status}`);
        console.error("❌ Response body:", responseText);
        throw new Error(`N8N webhook call failed`);
      }

      console.log("📤 N8N triggered successfully:", responseText);
    } catch (err) {
      console.error("❌ Failed to call N8N webhook:", err);
    }

    return new NextResponse("Webhook received", { status: 200 });
  }

  return new NextResponse("Event not handled", { status: 200 });
}
