// app/api/user-metadata/route.ts

import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const user = await (await clerkClient()).users.getUser(userId);
    const metadata = user.publicMetadata || {};

    return NextResponse.json({
      lessons_remaining: metadata.lessons_remaining || 0,
      lessons_expiry: metadata.lessons_expiry || null,
    });
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}
