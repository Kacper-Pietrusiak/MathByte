import { FaEnvelope, FaPhone, FaFacebook, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-16 pb-8 min-h-[200px]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Dane kontaktowe */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
            <div className="space-y-3">
              <a
                href="mailto:k.pietrusiak@mathbyte.pl"
                className="flex items-center justify-center md:justify-start hover:text-blue-400 transition-colors"
              >
                <FaEnvelope className="mr-2" />
                k.pietrusiak@mathbyte.pl
              </a>
              <a
                href="tel:+48123456789"
                className="flex items-center justify-center md:justify-start hover:text-blue-400 transition-colors"
              >
                <FaPhone className="mr-2" />
                +48 661 355 309
              </a>
            </div>
          </div>

          {/* Media społecznościowe */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">Social Media</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Szybkie linki */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-white mb-4">Szybkie linki</h3>
            <div className="space-y-2">
              <a
                href="#how"
                className="block hover:text-blue-400 transition-colors"
              >
                Jak to działa
              </a>
              <a
                href="#pricing"
                className="block hover:text-blue-400 transition-colors"
              >
                Cennik
              </a>
              <a
                href="#testimonials"
                className="block hover:text-blue-400 transition-colors"
              >
                Opinie
              </a>
            </div>
          </div>
        </div>

        {/* Stopka */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} MathByte. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
