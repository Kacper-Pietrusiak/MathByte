"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, ChevronDown } from "lucide-react"

export default function SupportPage() {
  const { user } = useUser()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setEmail(user.primaryEmailAddress.emailAddress)
    }
  }, [user])

  const faqs = [
    {
      question: "Jak mogę rozpocząć naukę?",
      answer:
        "Aby rozpocząć naukę, zaloguj się na swoje konto i przejdź do sekcji 'Lekcje'. Tam znajdziesz dostępne terminy i możliwość rezerwacji zajęć.",
    },
    {
      question: "Jak działają pakiety lekcji?",
      answer:
        "Pakiety lekcji pozwalają na zakup większej liczby zajęć w korzystnej cenie. Po zakupie pakietu, lekcje są dodawane do Twojego konta i możesz je wykorzystać w dowolnym momencie.",
    },
    {
      question: "Jak mogę odwołać lekcję?",
      answer:
        "Lekcję możesz odwołać do 24 godzin przed planowanym terminem. Wystarczy przejść do sekcji 'Moje lekcje' i kliknąć przycisk 'Odwołaj' przy wybranej lekcji.",
    },
    {
      question: "Jakie są metody płatności?",
      answer:
        "Akceptujemy płatności przez przelewy online oraz karty płatnicze. Wszystkie płatności są bezpiecznie przetwarzane przez naszego partnera płatniczego.",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("https://n8n.kacperpietrusiak.pl/webhook/contact-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      })

      if (res.ok) {
        setStatus("success")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

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
              <span>k.pietrusiak@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>+48 661 355 309</span>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Godziny pracy: Poniedziałek - Sobota, 7:00 - 20:00
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
                    <div className="pb-4 text-sm text-gray-600">{faq.answer}</div>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                placeholder="twoj@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
            </button>

            {status === "success" && (
              <p className="text-green-600 text-sm">Wiadomość została wysłana!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm">
                Wystąpił błąd podczas wysyłki. Spróbuj ponownie.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
