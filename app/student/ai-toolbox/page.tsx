"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, FileText, Share2, BookOpen } from "lucide-react";

const tools = [
  {
    title: "Planer Nauki",
    description: "Wprowadź swój cel i dostępność – AI stworzy dla Ciebie spersonalizowany tygodniowy plan nauki.",
    icon: Calendar,
    route: "/student/ai-toolbox/planner",
    buttonText: "Stwórz Plan",
    isPro: false
  },
  {
    title: "Quiz z Tematu",
    description: "Wpisz temat – AI wygeneruje 5 pytań wielokrotnego wyboru z odpowiedziami.",
    icon: FileText,
    route: "/ai-toolbox/quiz",
    buttonText: "Generuj Quiz",
    isPro: false
  },
  {
    title: "Social Media Post",
    description: "Otrzymaj gotowy post na Instagram/Facebook z tytułem, treścią, hashtagami i wezwaniem do działania.",
    icon: Share2,
    route: "/ai-toolbox/post",
    buttonText: "Generuj Post",
    isPro: true
  },
  {
    title: "Fiszki",
    description: "Wpisz temat – AI wygeneruje pary pytanie ↔ odpowiedź do szybkiej nauki.",
    icon: BookOpen,
    route: "/ai-toolbox/flashcards",
    buttonText: "Generuj Fiszki",
    isPro: true
  }
];

export default function AIToolbox() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">🧠 AI Toolbox</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Użyj potężnych narzędzi AI, aby uczyć się szybciej, lepiej się organizować i efektywniej przygotowywać do egzaminów.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <tool.icon className="h-5 w-5" />
                      {tool.title}
                    </CardTitle>
                    {tool.isPro && (
                      <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                        PRO
                      </span>
                    )}
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={tool.route}>{tool.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500">
          Wszystkie funkcje AI są zasilane przez Mathbyte AI – zbudowane na bazie LLaMA 3 lub OpenAI.
        </div>
      </div>
    </div>
  );
}
