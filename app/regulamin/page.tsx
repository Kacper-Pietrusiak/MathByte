export default function RegulaminPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-8">Regulamin serwisu Mathbyte</h1>
  
        <div className="space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">§1 Postanowienia ogólne</h2>
            <p>1. Niniejszy regulamin określa zasady korzystania z serwisu edukacyjnego Mathbyte.pl oraz świadczenia usług indywidualnych lekcji z matematyki i programowania przez Kacpra Pietrusiaka, prowadzącego działalność nierejestrowaną.</p>
            <p>2. Użytkownik zobowiązany jest do zapoznania się z regulaminem i jego akceptacji przed dokonaniem zakupu lub rezerwacji lekcji.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§2 Definicje</h2>
            <p>1. Serwis – strona internetowa mathbyte.pl.</p>
            <p>2. Użytkownik – osoba korzystająca z Serwisu.</p>
            <p>3. Lekcja – usługa edukacyjna oferowana indywidualnie lub w pakiecie przez Organizatora.</p>
            <p>4. Organizator – Kacper Pietrusiak, prowadzący działalność nierejestrowaną.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§3 Rejestracja i konto użytkownika</h2>
            <p>1. Korzystanie z Serwisu wymaga rejestracji i zalogowania przez system Clerk.</p>
            <p>2. Użytkownik zobowiązuje się do podania prawdziwych danych oraz nieudostępniania swojego konta osobom trzecim.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§4 Rezerwacja i płatności</h2>
            <p>1. Rezerwacji lekcji dokonuje się za pomocą formularza dostępnego w Serwisie.</p>
            <p>2. Płatności dokonywane są za pośrednictwem systemu Stripe, zgodnie z wybraną ofertą.</p>
            <p>3. Potwierdzenie płatności zostaje przesłane na adres e-mail Użytkownika.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§5 Odwoływanie i przekładanie lekcji</h2>
            <p>1. Lekcję można odwołać najpóźniej 72 godziny (3 dni) przed jej planowanym rozpoczęciem.</p>
            <p>2. Odwołana lekcja nie przepada – możliwe jest jej przełożenie na inny termin ustalony indywidualnie.</p>
            <p>3. Odwołanie dokonane mniej niż 72 godziny przed rozpoczęciem skutkuje utratą lekcji i brakiem zwrotu środków.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§6 Obowiązki uczestnika</h2>
            <p>1. Uczestnik zobowiązuje się do punktualnego uczestnictwa w lekcjach.</p>
            <p>2. Spóźnienie nie powoduje przedłużenia lekcji.</p>
            <p>3. Uczestnik powinien przygotować odpowiednie narzędzia do zajęć (np. komputer, dostęp do internetu, kamerka).</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§7 Reklamacje</h2>
            <p>1. Reklamacje można składać mailowo na adres: k.pietrusiak@mathbyte.pl.</p>
            <p>2. Reklamacje będą rozpatrywane w terminie 14 dni od daty otrzymania zgłoszenia.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§8 Dane osobowe</h2>
            <p>1. Dane osobowe Użytkowników są przetwarzane zgodnie z polityką prywatności Serwisu.</p>
            <p>2. Administratorem danych jest Kacper Pietrusiak.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold mb-2">§9 Postanowienia końcowe</h2>
            <p>1. Regulamin wchodzi w życie z dniem jego publikacji na stronie mathbyte.pl.</p>
            <p>2. Organizator zastrzega sobie prawo do zmiany Regulaminu. O zmianach Użytkownicy zostaną poinformowani z 7-dniowym wyprzedzeniem.</p>
            <p>3. W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy Kodeksu cywilnego oraz ustawy o prawach konsumenta.</p>
          </section>
        </div>
      </div>
    );
  }
  