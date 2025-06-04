import Image from "next/image";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Zarejestruj się",
      text: "Szybki i prosty proces rejestracji",
    },
    {
      number: "2",
      title: "Zarezerwuj i opłać",
      text: "Bezpieczna płatność online przez Stripe",
    },
    {
      number: "3",
      title: "Wybierz termin",
      text: "Dopasuj lekcję do swojego planu dnia",
    },
    {
      number: "4",
      title: "Rozpocznij naukę",
      text: "Spotykamy się online lub stacjonarnie w Ustroniu",
    },
  ];

  return (
    <section id="how" className="py-20 bg-black text-white">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        {/* Lista kroków */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Jak to działa?</h2>
          <p className="text-gray-400 mb-6 font-semibold text-sm">
            Cały proces jest prosty i bez stresu – od rejestracji po pierwszą lekcję.
          </p>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 p-4 rounded-lg ${
                idx === 0 ? "bg-blue-600 text-white" : "bg-gray-800"
              }`}
            >
              <div className="text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-white text-black">
                {step.number}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm font-semibold text-white/90">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ilustracja */}
        <div className="w-full lg:w-1/2 flex justify-center">
        <Image
  src="/HowItWorks.png"
  alt="Ilustracja procesu"
  width={500}
  height={500}
  loading="lazy"
  decoding="async"
  sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </div>
    </section>
  );
}
