import Link from "next/link";

export function Pricing() {
  const plans = [
    {
      title: "Pojedyncza lekcja",
      price: "80 PLN",
      description: "60 minut indywidualnych zajęć",
      features: [
        "Idealna dla uczniów, którzy potrzebują pomocy w konkretnym zagadnieniu lub przed jedną kartkówką czy sprawdzianem.",
        "Bez zobowiązań – rezerwujesz tylko wtedy, gdy potrzebujesz.",
        "Pełna elastyczność – wybierasz dogodny termin bez cyklu.",
      ],
      href: "/book",
    },
    // {
    //   title: "Pakiet 4 lekcji",
    //   price: "280 PLN",
    //   description: "4×60 minut • ważne przez 30 dni",
    //   features: [
    //     "Oszczędzasz 15% względem pojedynczych lekcji — to korzystny wybór przy regularnej nauce.",
    //     "Masz pierwszeństwo w rezerwacji terminów na cały miesiąc.",
    //     "Możesz uczyć się raz w tygodniu lub intensywniej przed egzaminem.",
    //     "Regularność = lepsze efekty i trwałe zrozumienie materiału.",
    //   ],
    //   href: "/book",
    // },
    {
      title: "Pakiet kursowy",
      price: "Spytaj o dostepność",
      description: "Kompletny program",
      features: [
        "Najlepszy wybór dla uczniów chcących przyswoić nową i innowacyjną wiedzę w dziedzinie informatyki i technologii.",
        "Dostęp do bonusowych materiałów: PDF, quizy, zadania z odpowiedziami, nagrania (opcjonalnie).",
        "Zajęcia są ułożone w logiczny program: od podstaw po poziom zaawansowany.",
        "Możliwość dopasowania ścieżki do celu: programowanie, obsługa komputera, IOT",
      ],
      href: "/book",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Cennik</h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch h-full min-h-[500px]">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col justify-between border border-gray-700 max-w-[500px] w-full mx-auto h-full min-h-[500px]"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {plan.title}
                </h3>
                <p className="text-4xl font-bold mb-2 text-center text-blue-400">
                  {plan.price}
                </p>
                <p className="text-gray-400 mb-6 text-center text-sm font-semibold italic">
                  {plan.description}
                </p>
                <ul className="space-y-4 text-sm font-semibold text-gray-300 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={plan.href}
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
              >
                Umów lekcję
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
