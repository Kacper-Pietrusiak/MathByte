import { NextResponse } from "next/server";
import { google } from "googleapis";

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

// Google API client singleton
const auth = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  undefined,
  GOOGLE_PRIVATE_KEY,
  ["https://www.googleapis.com/auth/calendar.readonly"]
);
const calendar = google.calendar({ version: "v3", auth });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) return NextResponse.json({ hours: [] }, { status: 400 });

  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return NextResponse.json({ hours: [] }, { status: 400 });
  }

  try {
    const startISO = `${date}T14:00:00.000Z`; // 16:00 Warsaw
    const endISO = `${date}T16:00:00.000Z`;   // 18:00 Warsaw

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startISO,
        timeMax: endISO,
        items: [{ id: GOOGLE_CALENDAR_ID }],
      },
    });

    const busy = response.data.calendars?.[GOOGLE_CALENDAR_ID]?.busy || [];
    const busyMap = busy.map(p => ({
      start: new Date(p.start!),
      end: new Date(p.end!),
    }));

    const formatter = new Intl.DateTimeFormat("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Warsaw",
    });

    const slots = [14, 15].map((h) => {
      const start = new Date(`${date}T${String(h).padStart(2, '0')}:00:00.000Z`);
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      const isAvailable = !busyMap.some(b =>
        start < b.end && end > b.start
      );

      return isAvailable ? formatter.format(start) : null;
    }).filter(Boolean);

    return NextResponse.json({ hours: slots });
  } catch (error) {
    console.error("❌ Google Calendar API error:", error);
    return NextResponse.json({ hours: [] }, { status: 500 });
  }
}
