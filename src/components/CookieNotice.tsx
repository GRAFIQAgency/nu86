import React, { useState, useEffect } from "react";
import {
  Cookie,
  ExternalLink,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  X,
  ChevronRight,
  Info,
} from "lucide-react";
import { Language } from "../translations";

interface CookieNoticeProps {
  lang: Language;
  onOpenDirect?: () => void;
}

export const CookieNotice: React.FC<CookieNoticeProps> = ({
  lang,
  onOpenDirect,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const isCs = lang === "cs";

  const directUrl = "https://nu86.ikelp.com/rozvoz";

  const handleOpenDirect = () => {
    if (onOpenDirect) {
      onOpenDirect();
    } else {
      window.open(directUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full bg-[#18181B] border-2 border-nubi-yellow rounded-2xl p-5 md:p-6 mb-6 text-left shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-nubi-yellow text-nubi-black flex items-center justify-center shrink-0 shadow-lg">
            <Cookie size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase font-black px-2.5 py-0.5 rounded bg-nubi-yellow text-nubi-black">
                {isCs ? "DŮLEŽITÉ UPOZORNĚNÍ" : "IMPORTANT"}
              </span>
              <span className="text-xs font-bold text-nubi-yellow">
                {isCs ? "Mobil / Safari / Brave" : "Mobile / Safari / Brave"}
              </span>
            </div>
            <h4 className="text-base md:text-lg font-bold text-nubi-white">
              {isCs
                ? "Máte potíže s načtením nebo hlášením o cookies?"
                : "Having trouble with menu loading or cookies?"}
            </h4>
            <p className="text-xs md:text-sm text-nubi-white/80 mt-1 leading-relaxed max-w-2xl font-medium">
              {isCs
                ? "Pokud váš telefon či prohlížeč blokuje cookies uvnitř okna, jedním kliknutím otevřete přímé objednání bez chyb."
                : "If your browser blocks cookies inside the frame, 1-click opens direct ordering without errors."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleOpenDirect}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-nubi-yellow text-nubi-black hover:bg-nubi-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer transform hover:scale-105"
          >
            <span>{isCs ? "1 Kliknutím objednat přímo" : "1-Click Direct Order"}</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Expandable step-by-step instructions for Brave, Safari, Chrome */}
      {showInstructions && (
        <div className="mt-4 pt-4 border-t border-nubi-white/10 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-nubi-white/80">
          <div className="bg-nubi-black/40 rounded-xl p-3.5 border border-nubi-white/5">
            <p className="font-bold text-nubi-yellow flex items-center gap-1.5 mb-1.5">
              <Smartphone size={14} />
              <span>iPhone / Safari:</span>
            </p>
            <p className="text-[11px] leading-relaxed text-nubi-white/70">
              {isCs
                ? "Přejděte do Nastavení telefonu > Safari > Vypněte 'Zabránit sledování napříč stránkami'."
                : "Go to iPhone Settings > Safari > Disable 'Prevent Cross-Site Tracking'."}
            </p>
          </div>

          <div className="bg-nubi-black/40 rounded-xl p-3.5 border border-nubi-white/5">
            <p className="font-bold text-nubi-yellow flex items-center gap-1.5 mb-1.5">
              <ShieldAlert size={14} />
              <span>Brave Browser:</span>
            </p>
            <p className="text-[11px] leading-relaxed text-nubi-white/70">
              {isCs
                ? "Klikněte na ikonu lva (Brave Shields) v adresním řádku a přepněte štít na Vypnuto pro tento web."
                : "Click the Lion icon (Brave Shields) next to the URL bar and toggle Shields to OFF for this site."}
            </p>
          </div>

          <div className="bg-nubi-black/40 rounded-xl p-3.5 border border-nubi-white/5">
            <p className="font-bold text-nubi-yellow flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 size={14} />
              <span>{isCs ? "Nejrychlejší řešení:" : "Fastest Solution:"}</span>
            </p>
            <p className="text-[11px] leading-relaxed text-nubi-white/70">
              {isCs
                ? "Jednoduše otevřete objednávku přes tlačítko 'Objednat bez omezení' – funguje ihned všude."
                : "Simply open the order via 'Order Directly' — works immediately everywhere."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
