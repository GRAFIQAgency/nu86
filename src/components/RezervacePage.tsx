import React from "react";
import { ArrowLeft, MapPin, Phone, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { CookieNotice } from "./CookieNotice";
import { Language, translations } from "../translations";

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-nubi-white/10 bg-nubi-white/5 hover:bg-nubi-yellow hover:text-nubi-black hover:border-nubi-yellow text-xs font-black uppercase tracking-widest transition-all duration-300 group"
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
              href="https://czxoxjz.ikelp.com/rozvoz"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nubi-yellow text-nubi-black text-xs font-black uppercase tracking-widest hover:bg-nubi-white transition-all duration-300 shadow-md"
            >
              <span>{isCs ? "Otevřít v novém okně" : "Open in new window"}</span>
              <ExternalLink size={14} />
            </a>

            <div className="flex gap-3 items-center border-l border-nubi-white/10 pl-4 h-6">
              <button
                onClick={() => setLang("cs")}
                className={`text-xs font-black tracking-widest transition-colors ${
                  lang === "cs"
                    ? "text-nubi-yellow"
                    : "text-nubi-white/40 hover:text-nubi-white"
                }`}
              >
                CS
              </button>
              <button
                onClick={() => setLang("en")}
                className={`text-xs font-black tracking-widest transition-colors ${
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-8 flex flex-col">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight text-nubi-white">
              {isCs ? "Rezervace & Rozvoz" : "Reservations & Delivery"}
            </h1>
            <p className="text-xs md:text-sm text-nubi-white/50 mt-1 uppercase tracking-widest font-medium">
              {isCs
                ? "Vyberte si ze stálé nabídky a objednejte online s doručením nebo vyzvednutím"
                : "Choose from our menu and order online for delivery or pickup"}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-nubi-white/60">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-nubi-yellow" />
              <span>+420 731 076 819</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin size={14} className="text-nubi-yellow" />
              <span>{translations[lang].footer.address}</span>
            </div>
          </div>
        </div>

        {/* Embedded iKelp Frame */}
        <div className="flex-1 w-full bg-[#09090B] rounded-2xl overflow-hidden shadow-2xl border border-nubi-white/10 min-h-[750px] md:min-h-[850px] relative">
          <iframe
            src="/rozvoz"
            id="pm-menu-jidelni-listek-rezervace"
            title="Rezervace & Rozvoz"
            className="w-full h-full min-h-[750px] md:min-h-[850px] border-0 block"
            allow="geolocation; payment; storage-access; cross-origin-isolated"
          />
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="py-6 border-t border-nubi-white/5 px-6 text-center text-[10px] uppercase tracking-widest text-nubi-white/30">
        <p>© 2026 NU BISTRO — {isCs ? "Všechna práva vyhrazena" : "All rights reserved"}</p>
      </footer>
    </div>
  );
};
