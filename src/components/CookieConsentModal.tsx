import React, { useState, useEffect } from "react";
import {
  Cookie,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { Language } from "../translations";

interface CookieConsentModalProps {
  lang: Language;
  onOpenDirect?: () => void;
}

export const CookieConsentModal: React.FC<CookieConsentModalProps> = ({
  lang,
  onOpenDirect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCs = lang === "cs";
  const directUrl = "https://czxoxjz.ikelp.com/rozvoz";

  useEffect(() => {
    // Show after slight delay when user loads the page if not already dismissed in this session
    const hasSeen = sessionStorage.getItem("nubi_cookie_modal_dismissed");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("nubi_cookie_modal_dismissed", "true");
    setIsOpen(false);
  };

  const handleOrderDirect1Click = () => {
    sessionStorage.setItem("nubi_cookie_modal_dismissed", "true");
    setIsOpen(false);
    if (onOpenDirect) {
      onOpenDirect();
    } else {
      window.open(directUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="nubi-cookie-modal-backdrop"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      style={{ animation: "fadeIn 0.25s ease-out forwards" }}
    >
      <div
        id="nubi-cookie-modal-card"
        className="relative w-full max-w-lg bg-[#121216] border-2 border-nubi-yellow/70 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(247,208,2,0.25)] text-nubi-white overflow-hidden"
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-nubi-yellow/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-nubi-white/10 hover:bg-nubi-white/20 text-nubi-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label={isCs ? "Zavřít" : "Close"}
        >
          <X size={18} />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-nubi-yellow text-nubi-black flex items-center justify-center shrink-0 shadow-lg font-bold">
            <Cookie size={26} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-nubi-yellow block mb-0.5">
              {isCs ? "Objednávka & Rozvoz" : "Online Ordering"}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-nubi-white tracking-tight">
              {isCs ? "Povolení pro online objednávku" : "Enable Online Ordering"}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-nubi-white/80 leading-relaxed mb-6">
          {isCs
            ? "Mobilní zařízení (Safari / Brave) z bezpečnostních důvodů blokují okno s jídelním lístkem. 1 kliknutím níže otevřete objednávkový systém přímo bez jakýchkoliv chyb a bez nutnosti cokoliv složitě nastavovat."
            : "Mobile browsers (Safari / Brave) block embedded ordering frames. 1-click below opens the ordering system directly with full access, no errors, and zero complicated settings."}
        </p>

        {/* Primary 1-Click Action Button */}
        <button
          id="btn-cookie-1click-order"
          onClick={handleOrderDirect1Click}
          className="w-full py-4 px-6 rounded-2xl bg-nubi-yellow text-nubi-black hover:bg-nubi-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] group mb-3"
        >
          <Sparkles size={18} className="text-nubi-black" />
          <span>{isCs ? "1 Kliknutím objednat bez chyb" : "1-Click Order Without Errors"}</span>
          <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Secondary / Close Button */}
        <button
          onClick={handleClose}
          className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-nubi-white/50 hover:text-nubi-white transition-colors cursor-pointer"
        >
          {isCs ? "Pokračovat na webu" : "Continue browsing website"}
        </button>
      </div>
    </div>
  );
};
