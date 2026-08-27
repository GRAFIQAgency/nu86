import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ExternalLink,
  Flame,
  Leaf,
  Star,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Language } from "../translations";
import { DISHES_LIST, MENU_CATEGORIES, DishItem, MenuCategory } from "../data/menuData";
import { IKELP_ORDER_URL } from "../config";

interface NativeMenuProps {
  lang: Language;
  onDishClick?: (dish: DishItem) => void;
  showSearch?: boolean;
  limitCategories?: boolean;
}

export const NativeMenu: React.FC<NativeMenuProps> = ({
  lang,
  onDishClick,
  showSearch = true,
}) => {
  const isCs = lang === "cs";
  const [activeCategory, setActiveCategory] = useState<MenuCategory["id"]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyVeggie, setOnlyVeggie] = useState(false);

  const handleOrderRedirect = (dish?: DishItem) => {
    if (dish && onDishClick) {
      onDishClick(dish);
    }
    if (typeof window !== "undefined") {
      window.open(IKELP_ORDER_URL, "_blank", "noopener,noreferrer");
    }
  };

  const filteredDishes = useMemo(() => {
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
  }, [activeCategory, searchQuery, onlySpicy, onlyVeggie]);

  const currentCatObj = MENU_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="w-full text-nubi-white">
      {/* Top Direct Order CTA Banner */}
      <div className="mb-10 p-6 md:p-8 rounded-2xl bg-[#121214] border border-nubi-yellow/30 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-nubi-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nubi-yellow/15 border border-nubi-yellow/30 text-nubi-yellow text-[11px] font-black uppercase tracking-widest">
              <Sparkles size={13} />
              <span>{isCs ? "Online Objednávka & Rozvoz" : "Online Ordering & Delivery"}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black uppercase text-nubi-white tracking-tight">
              {isCs ? "Kliknutím na jakékoliv jídlo přejdete do košíku" : "Click any dish to order in full menu"}
            </h3>
            <p className="text-xs md:text-sm text-nubi-white/70 leading-relaxed font-medium">
              {isCs
                ? "Vyberte si ze stálého jídelního lístku níže. Kliknutím na pokrm nebo tlačítko otevřete přímé objednání s doručením k vám domů."
                : "Browse our menu below. Click on any item to open direct ordering with takeout or delivery to your home."}
            </p>
          </div>

          <button
            onClick={() => handleOrderRedirect()}
            className="shrink-0 w-full md:w-auto px-8 py-4 rounded-xl bg-nubi-yellow text-nubi-black hover:bg-nubi-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingBag size={16} />
            <span>{isCs ? "Otevřít objednávkový systém" : "Open Online Ordering"}</span>
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8">
        {/* Search */}
        {showSearch && (
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
                  ? "Hledat jídlo, číslo nebo surovinu (např. Kung Pao, 58, káva)..."
                  : "Search dishes by name or number (e.g. Kung Pao, 58, Rolls)..."
              }
              className="w-full bg-[#121214] border border-nubi-white/10 focus:border-nubi-yellow rounded-xl py-3 pl-11 pr-4 text-xs font-medium placeholder:text-nubi-white/30 text-nubi-white outline-none transition-colors"
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
        )}

        {/* Dietary Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setOnlySpicy(!onlySpicy)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              onlySpicy
                ? "bg-red-500/20 border-red-500 text-red-400"
                : "bg-[#121214] border-nubi-white/10 text-nubi-white/50 hover:border-nubi-white/20 hover:text-nubi-white"
            }`}
          >
            <Flame size={14} className={onlySpicy ? "text-red-400" : "text-nubi-white/40"} />
            <span>{isCs ? "Pálivé" : "Spicy"}</span>
          </button>

          <button
            onClick={() => setOnlyVeggie(!onlyVeggie)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              onlyVeggie
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                : "bg-[#121214] border-nubi-white/10 text-nubi-white/50 hover:border-nubi-white/20 hover:text-nubi-white"
            }`}
          >
            <Leaf size={14} className={onlyVeggie ? "text-emerald-400" : "text-nubi-white/40"} />
            <span>{isCs ? "Bez masa" : "Vegetarian"}</span>
          </button>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border shrink-0 ${
                isActive
                  ? "bg-nubi-yellow text-nubi-black border-nubi-yellow shadow-lg shadow-nubi-yellow/10 transform scale-[1.02]"
                  : "bg-[#121214] text-nubi-white/60 border-nubi-white/10 hover:border-nubi-yellow/40 hover:text-nubi-white"
              }`}
            >
              {isCs ? cat.nameCs : cat.nameEn}
            </button>
          );
        })}
      </div>

      {/* Category Header Info */}
      {currentCatObj && activeCategory !== "all" && (
        <div className="mb-6 border-l-2 border-nubi-yellow pl-4">
          <h4 className="text-lg font-display font-black uppercase text-nubi-yellow">
            {isCs ? currentCatObj.nameCs : currentCatObj.nameEn}
          </h4>
          <p className="text-xs text-nubi-white/50 font-medium mt-0.5">
            {isCs ? currentCatObj.descCs : currentCatObj.descEn}
          </p>
        </div>
      )}

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-[#121214] border border-nubi-white/10">
          <p className="text-nubi-white/50 text-sm font-semibold mb-4">
            {isCs
              ? "Žádné položky neodpovídají zadanému filtru."
              : "No dishes match your selected filter."}
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
              setOnlySpicy(false);
              setOnlyVeggie(false);
            }}
            className="px-6 py-2.5 rounded-full bg-nubi-white/10 text-nubi-white hover:bg-nubi-yellow hover:text-nubi-black text-xs font-black uppercase tracking-wider transition-colors"
          >
            {isCs ? "Zobrazit všechny pokrmy" : "Show all dishes"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredDishes.map((dish) => {
              const name = isCs ? dish.nameCs : dish.nameEn;
              const desc = isCs ? dish.descriptionCs : dish.descriptionEn;

              return (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleOrderRedirect(dish)}
                  className="group relative bg-[#111113] hover:bg-[#161619] border border-nubi-white/8 hover:border-nubi-yellow/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-nubi-yellow/5 transform hover:-translate-y-1"
                >
                  <div>
                    {/* Dish Badges & Code */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {dish.code && (
                          <span className="px-2.5 py-0.5 rounded-md bg-nubi-yellow text-nubi-black text-[11px] font-black uppercase tracking-wider">
                            #{dish.code}
                          </span>
                        )}
                        {dish.popular && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Star size={10} className="fill-amber-300" />
                            <span>{isCs ? "Oblíbené" : "Popular"}</span>
                          </span>
                        )}
                        {dish.spicy && (
                          <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Flame size={10} />
                            <span>{isCs ? "Pálivé" : "Spicy"}</span>
                          </span>
                        )}
                        {dish.vegetarian && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Leaf size={10} />
                            <span>{isCs ? "Bez masa" : "Veggie"}</span>
                          </span>
                        )}
                      </div>

                      {/* Direct Link Hint Icon */}
                      <ArrowUpRight
                        size={16}
                        className="text-nubi-white/30 group-hover:text-nubi-yellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                      />
                    </div>

                    {/* Dish Title */}
                    <h3 className="text-base font-bold text-nubi-white group-hover:text-nubi-yellow transition-colors tracking-tight line-clamp-2 mb-2">
                      {name}
                    </h3>

                    {/* Dish Description */}
                    {desc && (
                      <p className="text-xs text-nubi-white/60 font-normal leading-relaxed line-clamp-3 mb-4">
                        {desc}
                      </p>
                    )}
                  </div>

                  {/* Price & Order Action Bar */}
                  <div className="pt-3 mt-2 border-t border-nubi-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-nubi-white/40 block">
                        {isCs ? "Cena" : "Price"}
                      </span>
                      <span className="text-lg font-display font-black text-nubi-yellow">
                        {dish.price} Kč
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderRedirect(dish);
                      }}
                      className="px-4 py-2 rounded-lg bg-nubi-white/5 group-hover:bg-nubi-yellow text-nubi-white group-hover:text-nubi-black text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 cursor-pointer border border-nubi-white/10 group-hover:border-nubi-yellow"
                    >
                      <span>{isCs ? "Objednat" : "Order"}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

