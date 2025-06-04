'use client';

import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export function FAQ() {
  const faqs = [
    {
      question: "Jak wyglądają lekcje?",
      answer: "Każda lekcja jest dostosowana do Twoich potrzeb, poziomu i stylu nauki.",
    },
    {
      question: "Czy mogę odwołać lub przełożyć lekcję?",
      answer: "Tak — możesz to zrobić do 24 godzin przed planowanym terminem.",
    },
    {
      question: "Czy zajęcia są tylko online?",
      answer: "Nie — możesz wybrać lekcje online lub stacjonarne w Ustroniu.",
    },
    {
      question: "Jak mogę zapłacić?",
      answer: "Płatności realizowane są bezpiecznie online przez Stripe.",
    },
    {
      question: "Czy muszę coś przygotować?",
      answer: "Wystarczy zeszyt, coś do pisania i ewentualnie kalkulator.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-center gap-x-24 gap-y-10">
        {/* LEWA STRONA */}
        <div className="w-full md:w-1/2 max-w-md">
          <p className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Najczęściej zadawane</p>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
            Pytania i odpowiedzi
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl w-full mt-6">
            <Image
              src="/faq.png"
              alt="Ilustracja FAQ"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* PRAWA STRONA */}
        <div className="w-full md:w-1/2 max-w-xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-500 bg-gray-50 dark:bg-gray-800 shadow-md"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left text-base font-medium text-gray-900 dark:text-white"
                >
                  {faq.question}
                  {isOpen ? (
                    <FaMinus className="text-blue-600" />
                  ) : (
                    <FaPlus className="text-blue-600" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300 text-sm font-semibold leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
