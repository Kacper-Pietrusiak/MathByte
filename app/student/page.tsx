"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lesson } from "@/types/lesson";
import { cancelLesson, fetchLessons, formatPolishDate } from "@/lib/lessons";


export default function StudentDashboard() {
  const { user } = useUser();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (!user) return;
    const loadLessons = async () => {
      const fetchedLessons = await fetchLessons(user.id);
      setLessons(fetchedLessons);
      setLoading(false);
    };
    loadLessons();
  }, [user]);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ToastContainer />
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="flex items-center gap-2">
              <Link href="/">← Wróć</Link>
            </Button>
            <h1 className="text-lg font-semibold">Panel Studenta</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/student/ai-toolbox">🧠 AI Toolbox</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 space-y-8">
        <Tabs defaultValue="lessons" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="lessons">Lekcje</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Nadchodzące Lekcje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  ) : lessons.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">Brak nadchodzących lekcji</p>
                      <Button asChild>
                        <Link href="/book">Zarezerwuj Nową Lekcję</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      {lessons.map((lesson) => {
                        const localDate = DateTime.fromISO(lesson.date).setZone("Europe/Warsaw");
                        const now = DateTime.now().setZone("Europe/Warsaw");
                        const hoursToLesson = localDate.diff(now, "hours").hours;
                        const canCancel = hoursToLesson >= 48;

                        return (
                          <div
                            key={lesson.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <div className="space-y-1">
                              <p className="font-semibold">{lesson.title}</p>
                              <p className="text-sm text-gray-500">
                                {formatPolishDate(localDate)} — {lesson.duration} min
                              </p>
                            </div>
                            <div className="flex gap-2 flex-wrap justify-end">
                              <Button variant="outline" size="sm">Szczegóły</Button>
                              {lesson.isOnline && lesson.meetingUrl ? (
                                <Button size="sm" asChild>
                                  <Link href={lesson.meetingUrl} target="_blank">
                                    Dołącz do Spotkania
                                  </Link>
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled>
                                  📍 Cieszyńska 46C, Ustroń
                                </Button>
                              )}
                              {lesson.isCancelled ? (
                                <Button size="sm" asChild>
                                  <Link href={`/student/reschedule/${lesson.id}`}>Wybierz nowy termin</Link>
                                </Button>
                              ) : canCancel ? (
                                <Button
  variant="outline"
  size="sm"
  onClick={async () => {
    await cancelLesson(lesson.id);
    if (!user) return;
    await fetchLessons(user.id).then(setLessons);
  }}
>
  Odwołaj lekcję
</Button>

                              ) : (
                                <Button variant="outline" size="sm" disabled>
                                  Nie można już odwołać
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <Button asChild className="w-full mt-6">
                        <Link href="/book">Zarezerwuj Nową Lekcję</Link>
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
