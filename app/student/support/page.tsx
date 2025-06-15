"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, ChevronDown } from "lucide-react"

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Jak mogę rozpocząć naukę?",
      answer: "Aby rozpocząć naukę, zaloguj się na swoje konto i przejdź do sekcji 'Lekcje'. Tam znajdziesz dostępne terminy i możliwość rezerwacji zajęć."
    },
    {
      question: "Jak działają pakiety lekcji?",
      answer: "Pakiety lekcji pozwalają na zakup większej liczby zajęć w korzystnej cenie. Po zakupie pakietu, lekcje są dodawane do Twojego konta i możesz je wykorzystać w dowolnym momencie."
    },
    {
      question: "Jak mogę odwołać lekcję?",
      answer: "Lekcję możesz odwołać do 24 godzin przed planowanym terminem. Wystarczy przejść do sekcji 'Moje lekcje' i kliknąć przycisk 'Odwołaj' przy wybranej lekcji."
    },
    {
      question: "Jakie są metody płatności?",
      answer: "Akceptujemy płatności przez przelewy online oraz karty płatnicze. Wszystkie płatności są bezpiecznie przetwarzane przez naszego partnera płatniczego."
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Wsparcie</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kontakt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>support@mathbyte.pl</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+48 123 456 789</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Godziny pracy: Poniedziałek - Piątek, 9:00 - 17:00
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Najczęściej zadawane pytania</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-0">
                  <button
                    className="flex w-full items-center justify-between py-4 text-left font-medium hover:underline"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    {faq.question}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formularz kontaktowy</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                placeholder="twoj@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Wiadomość
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Jak możemy Ci pomóc?"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Wyślij wiadomość
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 