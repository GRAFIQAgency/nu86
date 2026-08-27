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

  const directUrl = "https://czxoxjz.ikelp.com/rozvoz";

  const handleOpenDirect = () => {
    if (onOpenDirect) {
      onOpenDirect();
    } else {
      window.open(directUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-500/15 via-nubi-yellow/20 to-amber-500/15 border border-nubi-yellow/40 rounded-2xl p-4 md:p-5 mb-6 text-left shadow-xl backdrop-blur-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-nubi-yellow text-nubi-black flex items-center justify-center shrink-0 mt-0.5 shadow-md">
            <ShieldAlert size={22} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm md:text-base font-bold text-nubi-white flex items-center gap-2">
              <span>
                {isCs
                  ? "Hlášení o cookies na mobilu / v Safari / Brave?"
                  : "Cookie notice on Mobile / Safari / Brave?"}
              </span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-nubi-yellow/20 text-nubi-yellow border border-nubi-yellow/30">
                {isCs ? "Doporučeno" : "Recommended"}
              </span>
            </h4>
            <p className="text-xs md:text-sm text-nubi-white/70 mt-1 leading-relaxed max-w-2xl">
              {isCs
                ? "Mobilní zařízení (iPhone, Android) a prohlížeče jako Brave či Safari blokují cookies třetích stran ve vložených oknech. Pro bezproblémové objednání klikněte na tlačítko níže."
                : "Mobile browsers (iOS Safari, Brave) block third-party cookies inside embedded frames. To order without any restrictions, click below to open the dedicated order system."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-start md:justify-end">
          <button
            onClick={handleOpenDirect}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-nubi-yellow text-nubi-black hover:bg-nubi-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer group"
          >
            <span>{isCs ? "Objednat bez omezení" : "Order Directly"}</span>
            <ExternalLink
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-nubi-white/10 hover:bg-nubi-white/20 text-nubi-white text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            <Info size={14} />
            <span>{isCs ? "Jak povolit cookies" : "How to enable"}</span>
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
