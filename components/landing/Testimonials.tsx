import { FaQuoteLeft, FaUser } from "react-icons/fa";

export function Testimonials() {
  const quotes = [
    {
      name: "Karina",
      role: "Mama uczennicy 2 klasy liceum",
      text: "Polecam z całego ❤️ Pana Kacpra jako korepetytora z matematyki. Moja córka dzięki jego poświęceniu, zaangażowaniu i cierpliwości wyszła z samych jedynek na same trójki i czwórki z matematyki.",
    },
    {
      name: "Kasia",
      role: "Mama ucznia 6 klasy szkoły podstawowej",
      text: "Pan Kacper to super korepetytor! Mój 12-latek nagle zaczął rozumieć matematykę. Pan Kacper tłumaczy wszystko spokojnie i jasno, przy tym ma dużo cierpliwości. Lekcje są na luzie, ale konkretne – nie ma nudy, a jednocześnie dużo się dzieje. Syn chętniej siada do matematyki i widać efekty w ocenach.",
    },
    {
      name: "Dorota",
      role: "Mama uczennicy 5 klasy szkoły podstawowej",
      text: "Pan Kacper ma wyjątkowe podejście do ucznia / młodego człowieka, który przychodzi po wsparcie do Niego. Swoją wiedzę przekazuje w sposób dostosowany do potrzeb psychofizycznych dziecka. Już po pierwszych zajęciach jest progres. Serdecznie polecam.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <p className="text-blue-600 text-2xl font-semibold mb-2">Opinie</p>
        <h2 className="text-4xl font-bold mb-3">Co mówią rodzice i uczniowie</h2>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-16">
          Sprawdź, dlaczego warto uczyć się z Mathbyte
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <FaUser className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div className="text-blue-600 dark:text-purple-400 text-2xl mb-2 flex justify-center">
                  <FaQuoteLeft />
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                  “{q.text}”
                </p>
              </div>
              <div className="mt-auto text-center">
                <p className="font-bold text-gray-900 dark:text-white">{q.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{q.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
