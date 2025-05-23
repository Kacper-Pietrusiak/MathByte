"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { pl as basePl } from "date-fns/locale";
import { Clock, Calendar as CalendarIcon, Video, User } from "lucide-react";
import { Day } from "date-fns";

const pl = { ...basePl, options: { ...basePl.options, weekStartsOn: 1 as Day } };

function formatDateForAPI(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

type LessonType = "online" | "in-person";

export default function BookPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [lessonType, setLessonType] = useState<LessonType>("in-person");

  useEffect(() => {
    if (isLoaded && !user) router.push("/sign-in");
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      const formattedDate = formatDateForAPI(selectedDate);
      const res = await fetch(`/api/availability?date=${formattedDate}`);
      const data = await res.json();
      setAvailableHours(data.hours || []);
      setSelectedHour(null);
    };

    fetchSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedHour) return;

    const formattedDate = formatDateForAPI(selectedDate);
    console.log('Selected date:', selectedDate.toLocaleDateString('pl-PL'));
    console.log('Sending to API:', formattedDate);

    const res = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: formattedDate,
        time: selectedHour,
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.fullName,
        lessonType,
      }),
    });

    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient leading-tight">
            Umów lekcję 1:1
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Wybierz dogodny dzień i godzinę. Każda lekcja trwa 60 minut i jest prowadzona przez doświadczonego nauczyciela.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 border border-gray-100">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">1. Wybierz dzień</h2>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-xl border shadow-sm bg-white"
              locale={pl}
              fromDate={new Date()}
              toDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
            />
            {selectedDate && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-600">
                  Wybrana data: {" "}
                  <span className="font-medium text-blue-700">
                    {selectedDate.toLocaleDateString("pl-PL", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">2. Wybierz godzinę</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableHours.length === 0 ? (
                  <div className="col-span-3 bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                    <p className="text-sm text-gray-500">
                      Wybierz datę, aby zobaczyć dostępne godziny
                    </p>
                  </div>
                ) : (
                  availableHours.map((hour) => (
                    <Button
                      key={hour}
                      variant={hour === selectedHour ? "default" : "outline"}
                      onClick={() => setSelectedHour(hour)}
                      className={`h-12 text-sm font-medium transition-all duration-200 ${
                        hour === selectedHour
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                          : "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {hour}
                    </Button>
                  ))
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Video className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">3. Wybierz typ lekcji</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={lessonType === "in-person" ? "default" : "outline"}
                    onClick={() => setLessonType("in-person")}
                    className={`h-auto py-4 text-sm font-medium transition-all duration-200 ${
                      lessonType === "in-person"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                        : "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <User className="w-5 h-5" />
                      <span className="font-semibold">Stacjonarnie</span>
                      <span className="text-xs opacity-90">ul. Cieszyńska 46C, 43-450 Ustroń</span>
                    </div>
                  </Button>
                  <Button
                    variant={lessonType === "online" ? "default" : "outline"}
                    onClick={() => setLessonType("online")}
                    className={`h-auto py-4 text-sm font-medium transition-all duration-200 ${
                      lessonType === "online"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                        : "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Video className="w-5 h-5" />
                      <span className="font-semibold">Online</span>
                      <span className="text-xs opacity-90">Google Meet</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
  <Button
    onClick={handleBooking}
    disabled={!selectedDate || !selectedHour}
    className="w-full py-5 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Przejdź do płatności
  </Button>

  {!selectedDate || !selectedHour ? (
    <p className="mt-3 text-sm text-gray-400 text-center">
      Wybierz datę i godzinę, aby kontynuować
    </p>
  ) : null}

  {/* 👇 DODAJ TO TUTAJ 👇 */}
  <div className="mt-6 text-sm text-center text-gray-500 space-y-2">
    <p>
      Klikając „Przejdź do płatności” akceptujesz{" "}
      <a
        href="/regulamin"
        className="text-blue-600 underline hover:text-purple-600 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        regulamin i zasady odwoływania lekcji
      </a>
      .
    </p>
    <p>
      Lekcję można odwołać najpóźniej <strong>72 godziny</strong> przed terminem. Po tym czasie nie przysługuje zwrot ani przełożenie.
    </p>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
