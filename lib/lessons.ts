// /lib/lessons.ts

import { Lesson } from "@/types/lesson";
import { DateTime } from "luxon";

const polishMonths: Record<string, string> = {
  "01": "stycznia",
  "02": "lutego",
  "03": "marca",
  "04": "kwietnia",
  "05": "maja",
  "06": "czerwca",
  "07": "lipca",
  "08": "sierpnia",
  "09": "września",
  "10": "października",
  "11": "listopada",
  "12": "grudnia"
};

export const formatPolishDate = (date: DateTime): string => {
  const day = date.day;
  const month = polishMonths[date.month.toString().padStart(2, "0")];
  const year = date.year;
  const time = date.toFormat("HH:mm");
  return `${day} ${month} ${year}, ${time}`;
};

// /lib/lessons.ts (dodaj poniżej `formatPolishDate`)

export const fetchLessons = async (studentId: string): Promise<Lesson[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/lessons?filters[studentId][$eq]=${studentId}&sort=date:asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data.data;
  };
  
  import { toast } from "react-toastify";

export const cancelLesson = async (lessonId: number): Promise<void> => {
  const confirm = window.confirm(
    "Czy na pewno chcesz odwołać lekcję? Możesz wybrać termin znajdujący się w ciągu 7 dni."
  );
  if (!confirm) return;

  try {
    const res = await fetch("https://n8n.kacperpietrusiak.pl/webhook/cancel-lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonId }),
    });

    // sprawdź, czy odpowiedź zawiera dane
    let response;
    const text = await res.text();
    try {
      response = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Niepoprawny JSON z serwera.");
    }

    if (!res.ok || response.status !== "success") {
      throw new Error(response.message || "Nie udało się odwołać lekcji.");
    }

    toast.success("Lekcja została odwołana. Masz 7 dni na wybranie nowego terminu.");
  } catch (error: Error | unknown) {
    console.error(error);
    toast.error("Wystąpił błąd podczas odwoływania lekcji.");
  }
};
  
