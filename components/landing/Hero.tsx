import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-x-16 gap-y-12">
        {/* Lewa kolumna */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Ponad 10 zadowolonych uczniów</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
  Przyszłość nauki<br />
  <span className="text-blue-600">matematyki, informatyki</span>
  <br />
  <span className="text-blue-600">& technologii</span>
</h1>



          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Indywidualne korepetycje dopasowane do Twoich potrzeb – bez stresu i presji.
            Dostępne online lub stacjonarnie w Ustroniu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="px-6 py-3 text-lg">
              <Link href="#how">Jak to działa</Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-3 text-lg">
              <Link href="/book">Umów lekcję</Link>
            </Button>
          </div>
        </div>

        {/* Prawa kolumna - ilustracja */}
        <div className="w-full max-w-[360px] mx-auto md:mx-0">
          <Image
            src="/hero.webp"
            alt="Ilustracja korepetycji z matematyki"
            width={360}
            height={360}
            className="object-contain drop-shadow-xl w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
