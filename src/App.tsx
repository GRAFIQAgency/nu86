/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
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
} from "lucide-react";
import { Logo } from "./components/Logo";
import { translations, Language } from "./translations";

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

const MENU_IMAGES = [
  "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
];

const PRICES = ["$14", "$22", "$32", "$38", "$18", "$20"];

// --- Components ---

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
}: {
  lang: Language;
  setLang: (l: Language) => void;
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
    { name: t.delivery, href: "#reservations" },
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
              className="text-xs font-bold uppercase tracking-widest text-nubi-white/70 hover:text-nubi-yellow transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#reservations"
            className="px-8 py-2.5 bg-nubi-yellow text-nubi-black text-xs uppercase tracking-widest font-black hover:bg-nubi-white transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {t.cta}
          </a>
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
                className="text-4xl font-display font-black uppercase tracking-tight text-white hover:text-nubi-yellow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#reservations"
              className="mt-auto w-full text-center py-5 bg-nubi-yellow text-nubi-black text-sm uppercase tracking-widest font-black"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
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
          src="https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=2000"
          alt="Atmospheric Food"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-nubi-black via-nubi-black/60 to-transparent z-10" />

      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex justify-center"
        >
          <Logo className="w-64 h-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-black tracking-tight uppercase mb-8"
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
            href="#reservations"
            className="border-2 border-nubi-yellow text-nubi-yellow px-10 py-3.5 font-black uppercase text-xs tracking-widest hover:bg-nubi-yellow hover:text-nubi-black transition-all"
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
  const t = translations[lang].menu;
  const cats = [
    t.categories.all,
    t.categories.small,
    t.categories.main,
    t.categories.desserts,
    t.categories.drinks,
  ];
  const [activeCategory, setActiveCategory] = useState(t.categories.all);

  // Sync active category on language change if it matches a category translation
  useEffect(() => {
    setActiveCategory(t.categories.all);
  }, [lang, t.categories.all]);

  const items: MenuItem[] = t.items.map((item, i) => ({
    ...item,
    price: PRICES[i],
    image: MENU_IMAGES[i],
  }));

  const filteredItems =
    activeCategory === t.categories.all
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-32 px-6 bg-nubi-black">
      <div className="max-w-7xl mx-auto">
        <div className="border-l-4 border-nubi-yellow pl-8 mb-20">
          <span className="text-nubi-yellow uppercase tracking-[0.4em] text-[10px] mb-4 block font-black">
            {t.badge}
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter">
            {t.title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-20">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-[10px] uppercase tracking-widest font-black transition-all border ${
                activeCategory === cat
                  ? "bg-nubi-yellow border-nubi-yellow text-nubi-black"
                  : "border-nubi-white/10 text-nubi-white/40 hover:border-nubi-yellow hover:text-nubi-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#0F0F0F] p-6 border border-nubi-white/5 hover:border-nubi-yellow/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden mb-6 aspect-video grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-nubi-yellow text-nubi-black px-3 py-1 text-[10px] font-black">
                    {item.price}
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase mb-3 tracking-tight group-hover:text-nubi-yellow transition-colors">
                  {item.name}
                </h3>
                <p className="text-nubi-white/50 text-xs leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-nubi-yellow font-black uppercase tracking-widest">
                    {t.order}
                  </span>
                  <ChevronRight size={16} className="text-nubi-yellow" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200"
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
    posmobile: any;
  }
}

const IKelpDeliverySection = () => {
  useEffect(() => {
    const el = document.getElementById("ikelp-container-anchor");
    if (!el) return;

    postscribe(
      el,
      `
      <div id='pm-delivery-pubstat' class='pm-delivery-pubstat-wr'></div> 
      <script type='text/javascript' src='https://api.ikelp.com/Scripts/js/ikelp.posmobile.1.0.js'></script>
      <script type='text/javascript'>(function () { posmobile.api.init({ appId: 'czxoxjz', delBtnId: 'pm-delivery-pubstat' }); })();</script>
    `,
    );

    return () => {
      if (el) el.innerHTML = "";
    };
  }, []);

  return (
    <section
      id="reservations"
      className="py-32 bg-nubi-yellow w-full flex flex-col items-center justify-center min-h-[400px]"
    >
      <div className="w-full max-w-4xl mx-auto px-6 text-center text-nubi-black">
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase mb-12">
          Delivery / Rozvoz
        </h2>

        <div className="bg-nubi-black/5 p-4 md:p-12 rounded-2xl border-2 border-nubi-black/10 w-full min-h-[150px] flex flex-col justify-center items-center">
          <p className="text-sm font-bold uppercase tracking-widest mb-6 opacity-60">
            Objednejte si rozvoz nebo s sebou
          </p>
          <div
            id="ikelp-container-anchor"
            className="w-full flex justify-center items-center"
          />
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  return (
    <footer
      id="contact"
      className="py-32 bg-nubi-black px-6 border-t border-nubi-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        <div className="md:col-span-2 flex flex-col items-start gap-10">
          <Logo className="w-48 h-auto" />
          <p className="text-nubi-white/40 text-sm leading-relaxed max-w-sm font-medium tracking-tight">
            {t.description}
          </p>
          <div className="flex gap-6">
            <Instagram
              size={22}
              className="text-nubi-white/40 hover:text-nubi-yellow transition-colors"
            />
            <Facebook
              size={22}
              className="text-nubi-white/40 hover:text-nubi-yellow transition-colors"
            />
            <Twitter
              size={22}
              className="text-nubi-white/40 hover:text-nubi-yellow transition-colors"
            />
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
                +44 800 NUBI 2026
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-nubi-yellow font-black">
            {t.availabilityTitle}
          </h3>
          <div className="space-y-4">
            {["18:00 — 02:00", "18:00 — 04:00", "12:00 — 23:00"].map(
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
        <div className="flex gap-10">
          {t.links.map((link, i) => (
            <a
              key={i}
              href="#"
              className="hover:text-nubi-yellow transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>("cs");

  return (
    <div className="bg-nubi-black text-nubi-white font-sans selection:bg-nubi-yellow selection:text-nubi-black">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <MenuSection lang={lang} />
      <ExperienceSection lang={lang} />
      <IKelpDeliverySection />
      <ContactSection lang={lang} />
    </div>
  );
}
