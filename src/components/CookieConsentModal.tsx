import React, { useState, useEffect } from "react";
import {
  Cookie,
  ExternalLink,
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
    // Show after slight delay when user loads the page if not already consented
    const hasConsented = localStorage.getItem("nubi_cookies_consented") || sessionStorage.getItem("nubi_cookie_modal_dismissed");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("nubi_cookie_modal_dismissed", "true");
    setIsOpen(false);
  };

  const handleEnableAndAccept = () => {
    localStorage.setItem("nubi_cookies_consented", "true");
    sessionStorage.setItem("nubi_cookie_modal_dismissed", "true");
    setIsOpen(false);

    // Briefly open a clean temporary popup window to ikelp.com or reload the page so the browser registers first-party interaction
    try {
      const popup = window.open(directUrl, "ikelp_auth", "width=600,height=700,status=no,resizable=yes");
      if (popup) {
        // If popup opened, wait a short moment and reload the current page to pick up storage
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    } catch {
      // Fallback
    }

    // Direct page reload
    window.location.reload();
  };

  const handleOrderDirect1Click = () => {
    localStorage.setItem("nubi_cookies_consented", "true");
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
              {isCs ? "Online Nabídka & Rozvoz" : "Online Menu & Delivery"}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-black uppercase text-nubi-white tracking-tight">
              {isCs ? "Povolení cookies pro objednávku" : "Enable Cookies for Ordering"}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-nubi-white/80 leading-relaxed mb-6">
          {isCs
            ? "Pro bezproblémové načtení jídelního lístku a objednávkového košíku v prohlížeči (včetně Safari a Brave) klikněte na tlačítko níže."
            : "To seamlessly load the ordering menu and shopping cart in your browser (including Safari and Brave), click the button below."}
        </p>

        {/* Primary 1-Click Action Button */}
        <button
          id="btn-cookie-1click-order"
          onClick={handleEnableAndAccept}
          className="w-full py-4 px-6 rounded-2xl bg-nubi-yellow text-nubi-black hover:bg-nubi-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] group mb-3"
        >
          <CheckCircle2 size={19} className="text-nubi-black" />
          <span>{isCs ? "Povolit cookies a načíst nabídku" : "Enable cookies & load menu"}</span>
        </button>

        {/* Secondary Direct Option */}
        <button
          onClick={handleOrderDirect1Click}
          className="w-full py-2.5 px-4 rounded-xl bg-nubi-white/5 hover:bg-nubi-white/10 text-nubi-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer mb-2"
        >
          <ExternalLink size={14} className="text-nubi-yellow" />
          <span>{isCs ? "Nebo otevřít přímo v novém okně" : "Or open directly in a new tab"}</span>
        </button>
      </div>
    </div>
  );
};
