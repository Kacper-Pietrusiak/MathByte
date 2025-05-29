"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Video, User } from "lucide-react";
import { Lesson } from "@/types/lesson";


export default function ReschedulePage() {
  const { id } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const cancelledDay = lesson ? new Date(lesson.date).toDateString() : null;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/lessons?filters[id][$eq]=${id}&publicationState=preview`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            },
          }
        );

        console.log('API URL:', `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/lessons?filters[id][$eq]=${id}&publicationState=preview`);
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Full response data:', data);

        if (!data.data || data.data.length === 0) {
          toast.error("Nie znaleziono lekcji.");
          return;
        }

        const lessonData = data.data[0];
        setLesson(lessonData);
        setSelectedDate(new Date(lessonData.date));
      } catch (error) {
        console.error("Błąd pobierania lekcji:", error);
        toast.error("Nie udało się pobrać danych.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLesson();
  }, [id]);

  useEffect(() => {
    const fetchAvailableHours = async () => {
      if (!selectedDate || !lesson) return;

      const selectedDayStr = selectedDate.toDateString();
      if (cancelledDay === selectedDayStr) {
        setAvailableHours([]); // blokujemy godziny dla tej daty
        return;
      }

      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const slotsRes = await fetch(`/api/availability?date=${dateStr}`);
        const slotsData = await slotsRes.json();
        setAvailableHours(slotsData.hours || []);
        setSelectedDateTime(null);
      } catch (error) {
        console.error("Błąd pobierania dostępnych godzin:", error);
        toast.error("Nie udało się pobrać dostępnych godzin.");
      }
    };

    fetchAvailableHours();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, lesson]);

  const handleReschedule = async () => {
    if (!selectedDateTime) {
      toast.error("Wybierz nowy termin.");
      return;
    }

    try {
      const res = await fetch("https://n8n.kacperpietrusiak.pl/webhook/reschedule-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson?.documentId,
          newDate: selectedDateTime,
          isOnline: isOnline,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.status !== "success") {
        throw new Error(result.message || "Błąd rezerwacji");
      }

      toast.success("Nowy termin został zapisany!");
      router.push("/student");
    } catch (err) {
      console.error("Failed to reschedule lesson:", err);
      toast.error("Wystąpił błąd przy zmianie terminu.");
    }
  };

  if (loading) return <p>Ładowanie...</p>;
  if (!lesson) return <p>Nie znaleziono lekcji</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        Wybierz nowy termin dla: {lesson.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 items-stretch">
        {/* KALENDARZ */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col justify-between">
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">Wybierz datę</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={pl}
            disabled={(date) => {
              const tomorrow = new Date();
              tomorrow.setHours(0, 0, 0, 0);
              tomorrow.setDate(tomorrow.getDate() + 1);
              const sevenDaysLater = new Date(tomorrow);
              sevenDaysLater.setDate(tomorrow.getDate() + 6);
              const isSameDayAsCancelled = !!cancelledDay && date.toDateString() === cancelledDay;
              return date < tomorrow || date > sevenDaysLater || isSameDayAsCancelled;
            }}
            className="rounded-md border"
            classNames={{
              day_selected: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
              day_today: "bg-blue-100 text-blue-900",
              day_disabled: "text-gray-400",
              day_hidden: "invisible",
            }}
          />
        </div>

        {/* GODZINY + FORMA */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Wybierz godzinę</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
              {availableHours.map((hour) => {
                const fullDateISO = new Date(`${format(selectedDate!, 'yyyy-MM-dd')}T${hour}:00+02:00`).toISOString();

                return (
                  <Button
                    key={hour}
                    variant={selectedDateTime === fullDateISO ? "default" : "outline"}
                    onClick={() => setSelectedDateTime(fullDateISO)}
                    className={`py-2 text-sm font-medium ${
                      selectedDateTime === fullDateISO ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-blue-50"
                    }`}
                  >
                    {hour}
                  </Button>
                );
              })}
            </div>

            <div className="border-t pt-4 sm:pt-6">
              <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">Forma zajęć</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant={!isOnline ? "default" : "outline"}
                  onClick={() => setIsOnline(false)}
                  className={`flex-1 h-auto py-3 font-semibold text-left ${
                    !isOnline
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 mt-0.5" />
                    <div>
                      <div className="font-semibold">Stacjonarnie</div>
                      <div className="text-xs opacity-90">Cieszyńska 46C, Ustroń</div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={isOnline ? "default" : "outline"}
                  onClick={() => setIsOnline(true)}
                  className={`flex-1 h-auto py-3 font-semibold text-left ${
                    isOnline
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <Video className="w-4 h-4 mt-0.5" />
                    <div>
                      <div className="font-semibold">Online</div>
                      <div className="text-xs opacity-90">Google Meet</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <p className="text-yellow-800 text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Po ponownej rezerwacji terminu nie można już jej odwołać
        </p>
      </div>

      <Button
        onClick={handleReschedule}
        disabled={!selectedDateTime}
        className="w-full py-3 font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:text-gray-500 rounded-xl shadow"
      >
        Zarezerwuj nowy termin
      </Button>
    </div>
  );
}
