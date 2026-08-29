/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
// @ts-ignore
import postscribe from "postscribe";
import {
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  Calendar,
  Clock,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Flame,
  Leaf,
  Search,
} from "lucide-react";
import { Logo } from "./components/Logo";
import { RezervacePage } from "./components/RezervacePage";
import { translations, Language } from "./translations";
import { IKELP_ORDER_URL } from "./config";
import { MENU_CATEGORIES, DISHES_LIST, DishItem } from "./data/menuData";

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}

// --- Components ---

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".loader-container", {
          opacity: 0,
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
          onComplete: onComplete
        });
      }
    });

    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      }
    });
  }, [onComplete]);

  return (
    <div className="loader-container fixed inset-0 z-[100] flex flex-col justify-end bg-nubi-black pb-12">
      <div className="px-6 flex items-end gap-6 w-full max-w-7xl mx-auto">
        <div className="flex-1 pb-3">
          <div className="h-1 bg-nubi-white/10 w-full overflow-hidden">
            <div 
              className="h-full bg-nubi-yellow origin-left"
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
        <div className="text-nubi-yellow font-black font-display text-5xl md:text-7xl w-24 md:w-32 text-right">
          {progress}%
        </div>
      </div>
    </div>
  );
};


const LanguageSwitcher = ({
  lang,
  setLang,
}: {
  lang: Language;
  setLang: (l: Language) => void;
}) => {
  return (
    <div className="flex gap-5 items-center ml-8 border-l border-nubi-white/10 pl-8 h-6">
      <button
        onClick={() => setLang("cs")}
        className={`text-sm font-black tracking-widest transition-colors ${lang === "cs" ? "text-nubi-yellow" : "text-nubi-white/40 hover:text-nubi-white"}`}
      >
        CS
      </button>
      <button
        onClick={() => setLang("en")}
        className={`text-sm font-black tracking-widest transition-colors ${lang === "en" ? "text-nubi-yellow" : "text-nubi-white/40 hover:text-nubi-white"}`}
      >
        EN
      </button>
    </div>
  );
};

const Navbar = ({
  lang,
  setLang,
  onNavigateToRezervace,
}: {
  lang: Language;
  setLang: (l: Language) => void;
  onNavigateToRezervace: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.menu, href: "#menu" },
    { name: t.philosophy, href: "#philosophy" },
    { name: t.delivery, href: IKELP_ORDER_URL, isExternal: true },
    { name: t.contact, href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-nubi-black/90 py-3 border-b border-nubi-yellow/20" : "bg-transparent py-8"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <Logo className="w-32 h-auto transition-transform group-hover:scale-105" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-xs font-bold uppercase tracking-widest text-nubi-white/70 hover:text-nubi-yellow transition-colors flex items-center gap-1"
            >
              <span>{link.name}</span>
              {link.isExternal && <ExternalLink size={12} className="opacity-60" />}
            </a>
          ))}
          <button
            onClick={onNavigateToRezervace}
            className="px-8 py-2.5 bg-nubi-yellow text-nubi-black text-xs uppercase tracking-widest font-black hover:bg-nubi-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            {t.cta}
          </button>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-6">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <button
            className="text-nubi-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-nubi-black z-50 md:hidden flex flex-col p-10 gap-8"
          >
            <div className="flex justify-between items-center mb-10">
              <Logo className="w-12 h-10" />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="text-3xl font-display font-black uppercase tracking-tight text-white hover:text-nubi-yellow flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                {link.isExternal && <ExternalLink size={18} className="opacity-60" />}
              </a>
            ))}
            <button
              className="mt-auto w-full text-center py-5 bg-nubi-yellow text-nubi-black text-sm uppercase tracking-widest font-black cursor-pointer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigateToRezervace();
              }}
            >
              {t.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({
  lang,
  onNavigateToRezervace,
}: {
  lang: Language;
  onNavigateToRezervace?: () => void;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const t = translations[lang].hero;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-nubi-black">
      {/* Background with higher contrast */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
      >
        <img
          src="./hero.avif"
          onError={(e) => {
            // Fallback while you haven't uploaded 'hero.avif' to the public folder
            e.currentTarget.src = "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=2000";
          }}
          alt="Atmospheric Food"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-nubi-black via-nubi-black/60 to-transparent z-10" />

      <div className="relative z-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-black tracking-tight uppercase mb-8 leading-[1.2] md:leading-[1.2]"
        >
          {t.title1} <br />
          <span className="text-gradient-yellow">{t.title2}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-8 justify-center items-center"
        >
          <a
            href="#menu"
            className="bg-nubi-white text-nubi-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-nubi-yellow transition-colors"
          >
            {t.explore}
          </a>
          <a
            href={IKELP_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-nubi-yellow text-nubi-yellow px-10 py-3.5 font-black uppercase text-xs tracking-widest hover:bg-nubi-yellow hover:text-nubi-black transition-all text-center"
          >
            {t.order}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 flex gap-4 rotate-90 origin-left text-[10px] items-center tracking-[0.5em] uppercase text-nubi-white/30">
        <div className="w-12 h-px bg-nubi-white/20" />
        {t.est}
      </div>
    </section>
  );
};

const MenuSection = ({ lang }: { lang: Language }) => {
  const isCs = lang === "cs";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyVeggie, setOnlyVeggie] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setShowAllMobile(false);
  }, [activeCategory, onlySpicy, onlyVeggie, searchQuery, lang]);

  const filteredItems = useMemo(() => {
    return DISHES_LIST.filter((dish) => {
      // Category filter
      if (activeCategory !== "all" && dish.category !== activeCategory) {
        return false;
      }
      // Dietary filters
      if (onlySpicy && !dish.spicy) return false;
      if (onlyVeggie && !dish.vegetarian) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName =
          (dish.nameCs && dish.nameCs.toLowerCase().includes(q)) ||
          (dish.nameEn && dish.nameEn.toLowerCase().includes(q));
        const matchDesc =
          (dish.descriptionCs && dish.descriptionCs.toLowerCase().includes(q)) ||
          (dish.descriptionEn && dish.descriptionEn.toLowerCase().includes(q));
        const matchCode = dish.code && dish.code.toLowerCase().includes(q);
        return matchName || matchDesc || matchCode;
      }

      return true;
    });
  }, [activeCategory, onlySpicy, onlyVeggie, searchQuery]);

  const visibleItems = isMobile && !showAllMobile ? filteredItems.slice(0, 9) : filteredItems;
  const hasActiveFilters = activeCategory !== "all" || onlySpicy || onlyVeggie || searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setActiveCategory("all");
    setOnlySpicy(false);
    setOnlyVeggie(false);
    setSearchQuery("");
  };

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-nubi-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-l-4 border-nubi-yellow pl-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nubi-yellow/15 text-nubi-yellow text-[11px] font-black uppercase tracking-widest mb-3">
            <ShoppingBag size={13} />
            <span>{isCs ? "Jídelní lístek & Rozvoz" : "Menu & Ordering"}</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-nubi-white">
            {isCs ? "JÍDELNÍ LÍSTEK" : "MENU"}
          </h2>
          <p className="text-xs md:text-sm text-nubi-white/60 mt-3 font-medium tracking-wider uppercase max-w-2xl">
            {isCs
              ? "Reálná stálá nabídka Nu Bistro synchronizovaná přímo s rozvozovým systémem iKelp"
              : "Live Nu Bistro menu synchronized directly with the iKelp delivery system"}
          </p>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-nubi-white/40 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isCs
                  ? "Hledat jídlo, číslo (#01, #58) nebo surovinu..."
                  : "Search dishes by name, code (#01, #58) or ingredient..."
              }
              className="w-full bg-[#111113] border border-nubi-white/10 focus:border-nubi-yellow rounded-xl py-3 pl-11 pr-10 text-xs font-medium placeholder:text-nubi-white/30 text-nubi-white outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-nubi-white/40 hover:text-nubi-white px-2 py-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Selectable Dietary Filters */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setOnlySpicy(!onlySpicy)}
              className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border ${
                onlySpicy
                  ? "bg-red-600/30 text-red-400 border-red-500 shadow-md shadow-red-900/20"
                  : "bg-[#111113] text-nubi-white/60 border-nubi-white/10 hover:border-nubi-white/30 hover:text-nubi-white"
              }`}
            >
              <Flame size={14} className={onlySpicy ? "text-red-400" : "text-nubi-white/40"} />
              <span>{isCs ? "Pálivé" : "Spicy"}</span>
            </button>

            <button
              onClick={() => setOnlyVeggie(!onlyVeggie)}
              className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border ${
                onlyVeggie
                  ? "bg-emerald-600/30 text-emerald-400 border-emerald-500 shadow-md shadow-emerald-900/20"
                  : "bg-[#111113] text-nubi-white/60 border-nubi-white/10 hover:border-nubi-white/30 hover:text-nubi-white"
              }`}
            >
              <Leaf size={14} className={onlyVeggie ? "text-emerald-400" : "text-nubi-white/40"} />
              <span>{isCs ? "Bez masa" : "Bez masa"}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-2.5 rounded-full text-xs font-bold text-nubi-white/40 hover:text-nubi-yellow transition-colors underline cursor-pointer whitespace-nowrap"
              >
                {isCs ? "Reset filtrů" : "Reset filters"}
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                  isActive
                    ? "bg-nubi-yellow border-nubi-yellow text-nubi-black shadow-lg shadow-nubi-yellow/10"
                    : "border-nubi-white/10 bg-[#111113] text-nubi-white/60 hover:border-nubi-yellow/50 hover:text-nubi-white"
                }`}
              >
                {isCs ? cat.nameCs : cat.nameEn}
              </button>
            );
          })}
        </div>

        {/* Results Counter / Category Title */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-nubi-white/5">
          <span className="text-xs text-nubi-white/40 font-bold uppercase tracking-widest">
            {isCs
              ? `Zobrazeno ${filteredItems.length} pokrmů`
              : `Showing ${filteredItems.length} dishes`}
          </span>
          <span className="text-[11px] text-nubi-yellow/80 font-bold uppercase tracking-wider">
            {isCs ? "Klikněte pro objednání ↗" : "Click to order ↗"}
          </span>
        </div>

        {/* Empty State if No Matches */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center bg-[#0F0F0F] rounded-2xl border border-nubi-white/5 p-8">
            <p className="text-base text-nubi-white/70 font-bold uppercase mb-2">
              {isCs ? "Nebyly nalezeny žádné pokrmy" : "No dishes found"}
            </p>
            <p className="text-xs text-nubi-white/40 mb-6">
              {isCs
                ? "Zkuste změnit vyhledávání nebo upravit zvolené filtry."
                : "Try adjusting your search query or active dietary filters."}
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-nubi-yellow text-nubi-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-nubi-white transition-colors"
            >
              {isCs ? "Zobrazit celou nabídku" : "Show full menu"}
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {visibleItems.map((dish) => {
              const name = isCs ? dish.nameCs : dish.nameEn;
              const desc = isCs ? dish.descriptionCs : dish.descriptionEn;

              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(IKELP_ORDER_URL, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="group relative bg-[#0F0F0F] hover:bg-[#141416] p-6 border border-nubi-white/8 hover:border-nubi-yellow/60 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {dish.code && (
                          <span className="px-2 py-0.5 rounded bg-nubi-yellow text-nubi-black text-[10px] font-black uppercase tracking-wider">
                            #{dish.code}
                          </span>
                        )}
                        {dish.popular && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold uppercase tracking-wider">
                            {isCs ? "Oblíbené" : "Popular"}
                          </span>
                        )}
                        {dish.spicy && (
                          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Flame size={10} />
                            <span>{isCs ? "Pálivé" : "Spicy"}</span>
                          </span>
                        )}
                        {dish.vegetarian && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Leaf size={10} />
                            <span>{isCs ? "Bez masa" : "Veggie"}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-display font-black text-nubi-yellow shrink-0">
                        {dish.price} Kč
                      </span>
                    </div>

                    <h3 className="text-base font-bold uppercase tracking-tight text-nubi-white group-hover:text-nubi-yellow transition-colors mb-2">
                      {name}
                    </h3>
                    {desc && (
                      <p className="text-nubi-white/50 text-xs leading-relaxed font-normal line-clamp-3">
                        {desc}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-3 border-t border-nubi-white/5 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-nubi-yellow font-black uppercase tracking-widest flex items-center gap-1.5">
                      <span>{isCs ? "Objednat na iKelp" : "Order on iKelp"}</span>
                      <ExternalLink size={12} />
                    </span>
                    <ChevronRight size={16} className="text-nubi-yellow transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load more or open online ordering button */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {isMobile && !showAllMobile && filteredItems.length > 9 && (
            <button
              onClick={() => setShowAllMobile(true)}
              className="w-full sm:w-auto border-2 border-nubi-yellow text-nubi-yellow px-8 py-3.5 font-black uppercase text-xs tracking-widest hover:bg-nubi-yellow hover:text-nubi-black transition-all cursor-pointer"
            >
              {isCs ? "Zobrazit další pokrmy" : "Load More Dishes"}
            </button>
          )}
          <a
            href={IKELP_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-nubi-yellow text-nubi-black px-8 py-3.5 font-black uppercase text-xs tracking-widest hover:bg-nubi-white transition-all text-center flex items-center justify-center gap-2 shadow-xl shadow-nubi-yellow/10"
          >
            <ShoppingBag size={15} />
            <span>{isCs ? "Přejít k online objednávce" : "Go to Online Ordering on iKelp"}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].experience;
  return (
    <section id="philosophy" className="py-40 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 border-l-4 border-t-4 border-nubi-yellow" />
          <div className="aspect-square bg-nubi-gray overflow-hidden">
            <img
              src="./menu/about-us.jpg"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200";
              }}
              alt="Kitchen energy"
              className="w-full h-full object-cover grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute bottom-6 right-6 bg-nubi-yellow p-8">
            <span className="text-nubi-black font-black text-5xl">99%</span>
            <span className="block text-nubi-black text-[10px] font-bold uppercase tracking-widest">
              {t.intensity}
            </span>
          </div>
        </div>

        <div>
          <span className="text-nubi-yellow uppercase tracking-[0.5em] text-[10px] mb-8 block font-black">
            {t.badge}
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-10 leading-none">
            {t.title}
          </h2>
          <p className="text-nubi-white/70 text-lg leading-relaxed mb-10 font-medium italic border-l-2 border-nubi-white/10 pl-8">
            {t.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {t.features.map((feature, i) => (
              <div key={i} className="p-6 border border-nubi-white/10">
                <h4 className="text-nubi-yellow font-black text-sm uppercase mb-2">
                  {feature.title}
                </h4>
                <p className="text-[10px] text-nubi-white/50 leading-loose uppercase tracking-widest">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

declare global {
  interface Window {
    posmobile?: {
      api: {
        init: (options: { appId: string; delBtnId: string }) => void;
      };
    };
  }
}

const ContactSection = ({
  lang,
  onNavigateToRezervace,
}: {
  lang: Language;
  onNavigateToRezervace: () => void;
}) => {
  const t = translations[lang].footer;

  const handleFooterOrderClick = () => {
    if (typeof window !== "undefined") {
      window.open(IKELP_ORDER_URL, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const initPOS = () => {
      if (typeof window !== "undefined" && window.posmobile?.api) {
        try {
          window.posmobile.api.init({
            appId: "nu86",
            delBtnId: "pm-delivery-pubstat",
          });
        } catch (e) {
          console.error("Error initializing posmobile in footer:", e);
        }
      }
    };

    if (typeof window !== "undefined" && window.posmobile?.api) {
      initPOS();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://api.ikelp.com/Scripts/js/ikelp.posmobile.1.0.js"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://api.ikelp.com/Scripts/js/ikelp.posmobile.1.0.js";
        script.type = "text/javascript";
        script.async = true;
        script.onload = () => {
          initPOS();
        };
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener("load", initPOS);
        initPOS();
      }
    }
  }, []);

  return (
    <footer
      id="contact"
      className="py-32 bg-nubi-black px-6 border-t border-nubi-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        <div className="md:col-span-2 flex flex-col items-start gap-8">
          <Logo className="w-48 h-auto" />
          <p className="text-nubi-white/40 text-sm leading-relaxed max-w-sm font-medium tracking-tight">
            {t.description}
          </p>

          {/* iKelp Delivery Status Button Widget - Redirects to IKELP_ORDER_URL */}
          <div className="pt-2 w-full max-w-sm">
            <div
              className="relative w-full min-h-[60px] flex items-stretch cursor-pointer group"
              onClick={handleFooterOrderClick}
              role="button"
              tabIndex={0}
              aria-label="Objednat rozvoz online"
              title="Objednat rozvoz online (otevře e-shop)"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFooterOrderClick();
                }
              }}
            >
              <div
                id="pm-delivery-pubstat"
                className="pm-delivery-pubstat-wr w-full min-h-[44px] overflow-visible flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-left">
                    <span className="block text-xs font-black text-nubi-white uppercase tracking-wider">
                      {lang === "cs" ? "Objednat rozvoz online" : "Order delivery online"}
                    </span>
                    <span className="block text-[10px] text-nubi-yellow font-bold uppercase tracking-widest">
                      {lang === "cs" ? "iKelp e-shop aktivní ↗" : "iKelp e-shop active ↗"}
                    </span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-nubi-yellow group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="absolute inset-0 z-20 cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/groups/202127294382401/user/61571856325566/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook
                size={22}
                className="text-nubi-white/40 hover:text-nubi-yellow transition-colors"
              />
            </a>
          </div>
        </div>

        <div className="space-y-10">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-nubi-yellow font-black">
            {t.coordinatesTitle}
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <MapPin size={20} className="text-nubi-yellow shrink-0" />
              <span className="text-xs uppercase tracking-widest leading-loose text-nubi-white/60">
                {t.address}
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <Phone size={20} className="text-nubi-yellow shrink-0" />
              <span className="text-xs tracking-widest text-nubi-white/60">
                +420 731 076 819
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-nubi-yellow font-black">
            {t.availabilityTitle}
          </h3>
          <div className="space-y-4">
            {["10h - 21h", "11h - 21h"].map(
              (time, i) => (
                <div
                  key={i}
                  className="flex justify-between text-[10px] uppercase tracking-widest font-bold"
                >
                  <span className="text-nubi-white/30">{t.days[i]}</span>
                  <span>{time}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-nubi-white/5 flex flex-col md:flex-row justify-between gap-6 text-[9px] uppercase tracking-[0.3em] font-black text-nubi-white/20">
        <p>{t.rights}</p>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>("cs");
  const [loading, setLoading] = useState(true);

  const getInitialRoute = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path === "/rezervace" ||
        path.startsWith("/rezervace") ||
        hash === "#rezervace" ||
        hash === "#reservations"
      ) {
        return "/rezervace";
      }
    }
    return "/";
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  useEffect(() => {
    const handleNavigationCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (
        path === "/rezervace" ||
        path.startsWith("/rezervace") ||
        hash === "#rezervace" ||
        hash === "#reservations"
      ) {
        setCurrentRoute("/rezervace");
      } else {
        setCurrentRoute("/");
      }
    };

    handleNavigationCheck();

    window.addEventListener("popstate", handleNavigationCheck);
    window.addEventListener("hashchange", handleNavigationCheck);
    return () => {
      window.removeEventListener("popstate", handleNavigationCheck);
      window.removeEventListener("hashchange", handleNavigationCheck);
    };
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== "undefined") {
      if (window.location.pathname !== route) {
        window.history.pushState(null, "", route);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  if (currentRoute === "/rezervace") {
    return (
      <RezervacePage
        lang={lang}
        setLang={setLang}
        onNavigateHome={() => navigateTo("/")}
      />
    );
  }

  return (
    <div className="bg-nubi-black text-nubi-white font-sans selection:bg-nubi-yellow selection:text-nubi-black">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar
        lang={lang}
        setLang={setLang}
        onNavigateToRezervace={() => navigateTo("/rezervace")}
      />
      <Hero
        lang={lang}
        onNavigateToRezervace={() => navigateTo("/rezervace")}
      />
      <MenuSection lang={lang} />
      <ExperienceSection lang={lang} />
      <ContactSection
        lang={lang}
        onNavigateToRezervace={() => navigateTo("/rezervace")}
      />
    </div>
  );
}
