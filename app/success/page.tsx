// app/success/page.tsx
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto max-w-2xl px-6 py-12 text-center">
      <h1 className="text-3xl font-bold mb-6 text-green-600">✅ Transakcja zakończona sukcesem</h1>
      <p className="text-gray-700 text-lg mb-4">
        Dziękujemy za rezerwację lekcji!
      </p>
      <p className="text-gray-600 mb-8">
        Na podany adres e-mail zostało wysłane potwierdzenie płatności i szczegóły spotkania.
        Sprawdź również folder „Spam” lub „Oferty”.
      </p>
      <Link href="/student">
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
          Przejdź do panelu ucznia
        </button>
      </Link>
    </div>
  );
}
