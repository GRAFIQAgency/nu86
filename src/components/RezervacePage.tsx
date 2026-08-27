import React from "react";
import { ArrowLeft, MapPin, Phone, ExternalLink, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { NativeMenu } from "./NativeMenu";
import { Language, translations } from "../translations";
import { IKELP_ORDER_URL } from "../config";

interface RezervacePageProps {
  lang: Language;
  setLang: (l: Language) => void;
  onNavigateHome: () => void;
}

export const RezervacePage: React.FC<RezervacePageProps> = ({
  lang,
  setLang,
  onNavigateHome,
}) => {
  const isCs = lang === "cs";

  return (
    <div className="min-h-screen bg-nubi-black text-nubi-white flex flex-col selection:bg-nubi-yellow selection:text-nubi-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-nubi-black/95 backdrop-blur-md border-b border-nubi-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nubi-white/10 bg-nubi-white/5 hover:bg-nubi-yellow hover:text-nubi-black hover:border-nubi-yellow text-xs font-black uppercase tracking-widest transition-all duration-300 group cursor-pointer"
              aria-label={isCs ? "Zpět na hlavní stránku" : "Back to Home"}
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>{isCs ? "Zpět" : "Back"}</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <Logo className="w-28 md:w-36 h-auto transition-transform group-hover:scale-105" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={IKELP_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-nubi-yellow text-nubi-black text-xs font-black uppercase tracking-widest hover:bg-nubi-white transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
            >
              <ShoppingBag size={14} />
              <span>{isCs ? "Otevřít košík / e-shop" : "Open Cart / E-shop"}</span>
              <ExternalLink size={14} />
            </a>

            <div className="flex gap-3 items-center border-l border-nubi-white/10 pl-4 h-6">
              <button
                onClick={() => setLang("cs")}
                className={`text-xs font-black tracking-widest transition-colors cursor-pointer ${
                  lang === "cs"
                    ? "text-nubi-yellow"
                    : "text-nubi-white/40 hover:text-nubi-white"
                }`}
              >
                CS
              </button>
              <button
                onClick={() => setLang("en")}
                className={`text-xs font-black tracking-widest transition-colors cursor-pointer ${
                  lang === "en"
                    ? "text-nubi-yellow"
                    : "text-nubi-white/40 hover:text-nubi-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-nubi-white/10">
          <div>
            <h1 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tight text-nubi-white">
              {isCs ? "Jídelní Lístek & Objednávka" : "Menu & Ordering"}
            </h1>
            <p className="text-xs md:text-sm text-nubi-white/60 mt-2 uppercase tracking-widest font-semibold">
              {isCs
                ? "Vyberte si ze stálé nabídky a objednejte online s doručením nebo vyzvednutím"
                : "Choose from our regular menu and order online for delivery or pickup"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-nubi-white/70">
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-nubi-yellow" />
              <a href="tel:+420731076819" className="hover:text-nubi-yellow transition-colors">
                +420 731 076 819
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <MapPin size={15} className="text-nubi-yellow" />
              <span>{translations[lang].footer.address}</span>
            </div>
          </div>
        </div>

        {/* Native Interactive Menu with Direct Ordering */}
        <NativeMenu lang={lang} />
      </main>

      {/* Clean Footer */}
      <footer className="py-8 border-t border-nubi-white/5 px-6 text-center text-xs uppercase tracking-widest text-nubi-white/40">
        <p>© 2026 NU BISTRO — {isCs ? "Všechna práva vyhrazena" : "All rights reserved"}</p>
      </footer>
    </div>
  );
};

