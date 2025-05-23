import Image from "next/image";

export function WhyMathbyte() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        {/* Lewa kolumna – ilustracja */}
        <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/whyMathbyte.png"
            alt="Dlaczego Mathbyte?"
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>

        {/* Prawa kolumna – tekst */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
            Dlaczego Mathbyte?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            Ucz się matematyki bez stresu — z indywidualnym podejściem, nowoczesnymi narzędziami i elastycznym terminarzem.
            Niezależnie od tego, czy jesteś w szkole podstawowej, średniej czy przygotowujesz się do egzaminów — pomogę Ci osiągnąć cel.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🧑‍🏫",
                title: "Doświadczony nauczyciel",
                desc: "Zajęcia prowadzone przez korepetytora i programistę z praktyką",
              },
              {
                icon: "📍",
                title: "Dowolne miejsce",
                desc: "Lekcje dostępne online lub stacjonarnie w Ustroniu",
              },
              {
                icon: "🎯",
                title: "Nauka dopasowana do Ciebie",
                desc: "Dla uczniów szkół podstawowych, średnich i zdających egzaminy",
              },
              {
                icon: "💡",
                title: "Nowoczesne narzędzia",
                desc: "Korzystam z Cal.com, Stripe i własnej platformy online",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
