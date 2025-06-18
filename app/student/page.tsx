"use client"

import { useEffect, useState, useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Clock,
  ArrowRight
} from "lucide-react"
import { useRouter } from "next/navigation"
import { DateTime } from "luxon"

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

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useUser();
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNextLesson = useCallback(async () => {
    try {
      if (!user) return;
      const studentId = user.id;
      const now = new Date().toISOString();
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/lessons?filters[studentId][$eq]=${studentId}&filters[date][$gt]=${now}&sort=date:asc&pagination[limit]=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      
      if (data.data && data.data.length > 0) {
        setNextLesson(data.data[0]);
      }
    } catch (error) {
      console.error("❌ Failed to fetch next lesson", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchNextLesson();
  }, [user, fetchNextLesson]);

  const formatPolishDate = (date: DateTime) => {
    const day = date.day;
    const month = polishMonths[date.month.toString().padStart(2, "0")];
    const year = date.year;
    const time = date.toFormat("HH:mm");
    return `${day} ${month} ${year}, ${time}`;
  };

  const formatTimeUntil = (lessonDate: string) => {
    const localDate = DateTime.fromISO(lessonDate).setZone("Europe/Warsaw");
    const now = DateTime.now().setZone("Europe/Warsaw");
    const diff = localDate.diff(now, ["days", "hours", "minutes"]);
    
    if (diff.days > 0) {
      return `za ${diff.days} ${diff.days === 1 ? 'dzień' : diff.days < 5 ? 'dni' : 'dni'}`;
    } else if (diff.hours > 0) {
      return `za ${diff.hours} ${diff.hours === 1 ? 'godzinę' : diff.hours < 5 ? 'godziny' : 'godzin'}`;
    } else {
      return `za ${Math.round(diff.minutes)} ${Math.round(diff.minutes) === 1 ? 'minutę' : Math.round(diff.minutes) < 5 ? 'minuty' : 'minut'}`;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">Witaj ponownie! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Oto przegląd Twojego postępu w nauce
        </p>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BookCheck className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Ukończone lekcje</p>
              <p className="text-2xl font-bold text-blue-700">{stats.completedLessons}/{stats.totalLessons}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Punkty XP</p>
              <p className="text-2xl font-bold text-blue-700">{stats.xpPoints}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Serie dni</p>
              <p className="text-2xl font-bold text-blue-700">{stats.streakDays} dni</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Łącznie lekcji</p>
              <p className="text-2xl font-bold text-blue-700">{stats.totalLessons}</p>
            </div>
          </div>
        </Card>
      </div> */}

      {/* Next Lesson Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-2 p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Następna lekcja</h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : nextLesson ? (
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-700">{nextLesson.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {formatPolishDate(DateTime.fromISO(nextLesson.date).setZone("Europe/Warsaw"))} — {nextLesson.duration} min
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  {formatTimeUntil(nextLesson.date)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Brak nadchodzących lekcji</p>
              <Button 
                onClick={() => router.push('/book')}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                Zarezerwuj nową lekcję
              </Button>
            </div>
          )}
        </Card>

        {/* Quick Actions Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Szybkie akcje</h2>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/student/lessons')}
            >
              Moje lekcje <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/book')}
            >
              Zarezerwuj lekcję <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/student/payments')}
            >
              Zobacz płatności <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/student/support')}
            >
              Wsparcie <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Lessons */}
      {/* <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Ostatnie lekcje</h2>
          <Button 
            variant="link" 
            className="text-blue-700"
            onClick={() => router.push('/student/lessons')}
          >
            Zobacz wszystkie lekcje
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentLessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/student/lessons`)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-blue-700">{lesson.title}</h3>
                <span className="text-xs text-muted-foreground">{lesson.date}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-green-600 capitalize">{lesson.status}</span>
                </div>
                <Progress value={100} className="h-2 bg-green-100" />
              </div>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  )
}