// app/api/interest/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, note, courseSlug } = body;

  if (!name || !email || !courseSlug) {
    return NextResponse.json({ message: "Brak wymaganych pól" }, { status: 400 });
  }

  // 🔧 Możesz tu wysłać do Strapi, Google Sheets, n8n, itd.
  console.log("Zgłoszenie zainteresowania:", {
    courseSlug,
    name,
    email,
    note,
  });

  return NextResponse.json({ message: "Zgłoszenie przyjęte" });
}

export function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
