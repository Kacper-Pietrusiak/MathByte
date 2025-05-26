"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  imageUrl?: string;
}

const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  "https://n8n.kacperpietrusiak.pl/webhook/kurs-zgloszenie";

const WEEKDAYS = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

export default function CourseCard({ course, imageUrl }: CourseCardProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { title, shortDescription, slug, tags, level, duration, price } = course;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const note = formData.get("note") as string;

    const selectedDays = formData.getAll("days") as string[];
    const availability = selectedDays.map((day) => ({
      day,
      from: formData.get(`from-${day}`) as string,
      to: formData.get(`to-${day}`) as string,
    }));

    const payload = {
      name,
      email,
      note,
      courseSlug: slug,
      availability,
    };

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Błąd wysyłki do webhooka.");
      }

      alert("Dziękujemy! Skontaktujemy się wkrótce.");
      setOpen(false);
      form.reset();
    } catch (err) {
      alert("Coś poszło nie tak. Spróbuj ponownie.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card className="hover:shadow-xl transition-shadow duration-300">
        {imageUrl && (
          <Link href={`/courses/${slug}`}>
            <div className="relative h-48 w-full cursor-pointer">
              <Image
                src={`http://192.168.0.181:1337${imageUrl}`}
                alt={title}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
          </Link>
        )}
        <CardContent className="p-4 space-y-2">
          <Link href={`/courses/${slug}`}>
            <h3 className="text-lg font-semibold leading-snug hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {shortDescription}
          </p>
          <div className="flex flex-wrap gap-1 pt-2">
            {tags?.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground pt-2">
            {level} • {duration} • {price} zł
          </div>
          <div className="pt-2">
            <Button variant="default" onClick={() => setOpen(true)}>
              Zgłoś zainteresowanie
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zgłoszenie zainteresowania</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Imię i nazwisko"
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Adres e-mail"
              className="w-full border p-2 rounded"
              required
            />

            <div>
              <label className="block font-medium text-sm mb-1">
                Dni i godziny dostępności
              </label>
              <div className="space-y-2">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <input type="checkbox" name="days" value={day} id={`check-${day}`} />
                    <label htmlFor={`check-${day}`} className="min-w-[100px] text-sm">
                      {day}
                    </label>
                    <input
                      type="time"
                      name={`from-${day}`}
                      className="border p-1 rounded text-sm"
                      defaultValue="16:00"
                    />
                    <span className="text-sm">–</span>
                    <input
                      type="time"
                      name={`to-${day}`}
                      className="border p-1 rounded text-sm"
                      defaultValue="18:00"
                    />
                  </div>
                ))}
              </div>
            </div>

            <textarea
              name="note"
              placeholder="Dodatkowe uwagi (opcjonalnie)"
              className="w-full border p-2 rounded"
            />

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
