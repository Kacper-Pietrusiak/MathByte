"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2, MapPin, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface Lesson {
  id: number;
  title: string;
  date: string;
  duration: number;
  description: string | null;
  studentId: string;
  isOnline: boolean;
  meetingUrl: string;
  isCancelled?: boolean;
  isRescheduled?: boolean;
}

export default function StudentLessonsPage() {
  const { user } = useUser();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    try {
      if (!user) return;
      const studentId = user.id;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/lessons?filters[studentId][$eq]=${studentId}&sort=date:asc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setLessons(data.data);
    } catch (error) {
      console.error("❌ Failed to fetch lessons", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchLessons();
  }, [user]);

  const cancelLesson = async (lessonId: number) => {
    const confirm = window.confirm("Czy na pewno chcesz odwołać lekcję? Możesz wybrać termin znajdujący sie w ciągu 7 dni.");
    if (!confirm) return;

    setLoading(true);
    try {
      const res = await fetch("https://n8n.kacperpietrusiak.pl/webhook/cancel-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ lessonId })
      });

      const response = await res.json();

      if (!res.ok || response.status !== "success") {
        throw new Error(response.message || "Nie udało się odwołać lekcji.");
      }

      toast.success("Lekcja została odwołana. Masz 7 dni na wybranie nowego terminu.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      await fetchLessons();
    } catch (error) {
      console.error(error);
      toast.error("Wystąpił błąd podczas odwoływania lekcji.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPolishDate = (date: DateTime) => {
    const day = date.day;
    const month = polishMonths[date.month.toString().padStart(2, "0")];
    const year = date.year;
    const time = date.toFormat("HH:mm");
    return `${day} ${month} ${year}, ${time}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">Moje Lekcje</h1>
        <p className="text-muted-foreground mt-2">
          Zarządzaj swoimi lekcjami i harmonogramem
        </p>
      </div>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="lessons">Nadchodzące Lekcje</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-700" />
                Nadchodzące Lekcje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
                  </div>
                ) : lessons.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Brak nadchodzących lekcji</p>
                    <Button asChild className="bg-blue-700 hover:bg-blue-800 text-white">
                      <Link href="/book">Zarezerwuj Nową Lekcję</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lessons.map((lesson) => {
                      const localDate = DateTime.fromISO(lesson.date).setZone("Europe/Warsaw");
                      const now = DateTime.now().setZone("Europe/Warsaw");
                      const hoursToLesson = localDate.diff(now, "hours").hours;
                      const canCancel = hoursToLesson >= 48 && !lesson.isRescheduled;

                      return (
                        <div
                          key={lesson.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4 bg-white hover:shadow-sm transition-colors"
                        >
                          <div className="space-y-1">
                            <p className="font-medium text-blue-700">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatPolishDate(localDate)} — {lesson.duration} min
                            </p>
                          </div>
                          <div className="flex gap-2 flex-wrap justify-end">
                            <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                              Szczegóły
                            </Button>
                            {lesson.isOnline && lesson.meetingUrl ? (
                              <Button size="sm" asChild className="bg-blue-700 hover:bg-blue-800 text-white">
                                <Link href={lesson.meetingUrl} target="_blank" className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  Dołącz do Spotkania
                                </Link>
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled className="border-blue-200 text-blue-300">
                                <MapPin className="h-4 w-4 mr-2" />
                                Cieszyńska 46C, Ustroń
                              </Button>
                            )}
                            {lesson.isCancelled ? (
                              <Button size="sm" asChild className="bg-blue-700 hover:bg-blue-800 text-white">
                                <Link href={`/student/reschedule/${lesson.id}`}>Wybierz nowy termin</Link>
                              </Button>
                            ) : lesson.isRescheduled ? (
                              <Button variant="outline" size="sm" disabled className="border-blue-200 text-blue-300">
                                Lekcja została przełożona
                              </Button>
                            ) : canCancel ? (
                              <Button variant="outline" size="sm" onClick={() => cancelLesson(lesson.id)} className="border-blue-200 hover:bg-blue-50">
                                Odwołaj lekcję
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" disabled className="border-blue-200 text-blue-300">
                                Nie można już odwołać
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <Button asChild className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white">
                      <Link href="/book">Zarezerwuj Nową Lekcję</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <ToastContainer />
    </div>
  );
}