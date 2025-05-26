// pages/api/interest.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, note, courseSlug } = req.body;

  // Walidacja minimalna
  if (!name || !email || !courseSlug) {
    return res.status(400).json({ message: "Brak wymaganych pól" });
  }

  // 🔧 Tu możesz wysłać do Strapi, Google Sheets, n8n, itd.
  console.log("Zgłoszenie zainteresowania:", {
    courseSlug,
    name,
    email,
    note,
  });

  return res.status(200).json({ message: "Zgłoszenie przyjęte" });
}
