import { NextResponse } from "next/server";
import { google } from 'googleapis';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ hours: [] }, { status: 400 });
  }

  // Check if the date is a weekend
  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 is Sunday, 6 is Saturday
    return NextResponse.json({ hours: [] }, { status: 400 });
  }

  try {
    // Initialize Google Calendar API
    const auth = new google.auth.JWT(
      GOOGLE_CLIENT_EMAIL,
      undefined,
      GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/calendar.readonly']
    );

    const calendar = google.calendar({ version: 'v3', auth });

    // Set time range to 16:00-19:00 Warsaw time (UTC+2)
    const startISO = `${date}T14:00:00.000Z`; // 16:00 Warsaw = 14:00 UTC
    const endISO = `${date}T17:00:00.000Z`;   // 19:00 Warsaw = 17:00 UTC

    // Get busy periods
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startISO,
        timeMax: endISO,
        items: [{ id: GOOGLE_CALENDAR_ID }],
      },
    });

    const busyPeriods = response.data.calendars?.[GOOGLE_CALENDAR_ID]?.busy || [];
    
    // Generate all possible hour-long slots
    const allSlots = [];
    const startTime = new Date(startISO);
    const endTime = new Date(endISO);
    
    for (let time = new Date(startTime); time < endTime; time.setHours(time.getHours() + 1)) {
      const slotEnd = new Date(time.getTime() + 60 * 60000); // 1 hour in milliseconds
      const isAvailable = !busyPeriods.some(busy => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        return (time >= busyStart && time < busyEnd) || 
               (slotEnd > busyStart && slotEnd <= busyEnd) ||
               (time <= busyStart && slotEnd >= busyEnd);
      });

      if (isAvailable) {
        allSlots.push(new Date(time));
      }
    }

    // Format available slots in Warsaw time
    const hours = allSlots.map(slot => 
      slot.toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Warsaw",
      })
    );

    return NextResponse.json({ hours });
  } catch (error) {
    console.error("❌ Google Calendar API error:", error);
    return NextResponse.json({ hours: [] }, { status: 500 });
  }
}
