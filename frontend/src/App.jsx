import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  Home,
  Phone,
  User,
  ShoppingCart,
  Menu,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Search,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Flame,
  MessageCircle,
  ArrowUp,
  X,
  Crosshair,
  ChevronDown,
  Landmark,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { fetchCities, fetchMenu, submitOrder, fetchHealth } from "./api";

/* ---------------------------------------------------------------------- */
/*  DESIGN TOKENS & FALLBACK DATA                                          */
/* ---------------------------------------------------------------------- */
const COLORS = {
  red: "#E31B23",
  green: "#2D7A38",
  bg: "#F8F9FA",
  white: "#FFFFFF",
  dark: "#1A1A1A",
};

const DEFAULT_CITIES = [
  {
    id: "khi",
    name: "Karachi",
    icon: "fort",
    branches: [
      { id: "khi-clifton", name: "Clifton Block 4", deliveryEtaMinutes: 35 },
      { id: "khi-gulshan", name: "Gulshan-e-Iqbal Block 13", deliveryEtaMinutes: 40 },
      { id: "khi-dha", name: "DHA Phase 5 Badar Commercial", deliveryEtaMinutes: 30 },
    ],
  },
  {
    id: "lhr",
    name: "Lahore",
    icon: "minar",
    branches: [
      { id: "lhr-gulberg", name: "Gulberg III Main Boulevard", deliveryEtaMinutes: 35 },
      { id: "lhr-johar", name: "Johar Town G-1 Market", deliveryEtaMinutes: 40 },
      { id: "lhr-dha", name: "DHA Phase 6 Commercial Broadway", deliveryEtaMinutes: 30 },
    ],
  },
  {
    id: "isb",
    name: "Islamabad",
    icon: "building",
    branches: [
      { id: "isb-f7", name: "F-7 Markaz Jinnah Super", deliveryEtaMinutes: 35 },
      { id: "isb-g11", name: "G-11 Markaz", deliveryEtaMinutes: 40 },
    ],
  },
  {
    id: "hyd",
    name: "Hyderabad",
    icon: "clock",
    branches: [{ id: "hyd-latifabad", name: "Latifabad Unit 7", deliveryEtaMinutes: 40 }],
  },
  {
    id: "guj",
    name: "Gujranwala",
    icon: "castle",
    branches: [{ id: "guj-model-town", name: "Model Town", deliveryEtaMinutes: 40 }],
  },
  {
    id: "fsd",
    name: "Faisalabad",
    icon: "tower",
    branches: [{ id: "fsd-d-ground", name: "D-Ground Peoples Colony", deliveryEtaMinutes: 40 }],
  },
  {
    id: "sgd",
    name: "Sargodha",
    icon: "mosque",
    branches: [{ id: "sgd-university-road", name: "University Road", deliveryEtaMinutes: 45 }],
  },
  {
    id: "uet",
    name: "Quetta",
    icon: "building",
    branches: [{ id: "uet-jinnah-road", name: "Jinnah Road Commercial", deliveryEtaMinutes: 45 }],
  },
  {
    id: "mbd",
    name: "Mandi Bahauddin",
    icon: "arch",
    branches: [{ id: "mbd-main-bazar", name: "Main Bazar Saddar", deliveryEtaMinutes: 45 }],
  },
];

const TOP_CHIPS = [
  "Pizza Deals",
  "Summer Deals",
  "Say Less, Stuff More",
  "Stuffed Pizza Roll",
  "Snackin Combo",
];

const SUB_CHIPS = ["Mighty Family Platter", "Triple The Madness", "Double The Fun"];

const money = (n) => `RS. ${Number(n || 0).toLocaleString("en-PK")}`;

/* ---------------------------------------------------------------------- */
/*  PIZZA ART & ICONS                                                      */
/* ---------------------------------------------------------------------- */
function PizzaArt({ tone = "classic", className = "" }) {
  const crust =
    tone === "pepperoni"
      ? "radial-gradient(circle at 50% 50%, #f3d99b 0%, #eac97e 45%, #d9a94f 60%, #c98f34 100%)"
      : "radial-gradient(circle at 50% 50%, #f6e3b4 0%, #eccd88 45%, #d9ab55 65%, #b9843a 100%)";
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ background: crust }}>
      <div
        className="absolute inset-[12%] rounded-full"
        style={{
          background:
            tone === "pepperoni"
              ? "repeating-conic-gradient(#c23b2b 0deg 8deg, #d94f3d 8deg 16deg)"
              : "repeating-conic-gradient(#8a9b4f 0deg 10deg, #6f8a3f 10deg 20deg)",
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-[30%] rounded-full bg-[#e7c26a]/70" />
    </div>
  );
}

function AddButton({ onAdd, size = "md" }) {
  const dims = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  return (
    <button
      onClick={onAdd}
      type="button"
      aria-label="Add to cart"
      className={`${dims} shrink-0 rounded-full bg-[#E31B23] text-white flex items-center justify-center shadow-md hover:bg-[#c9181f] active:scale-90 transition-transform`}
    >
      <Plus size={18} strokeWidth={3} />
    </button>
  );
}

function CityIcon({ type }) {
  const common = "w-7 h-7 text-[#1A1A1A]";
  switch (type) {
    case "fort":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <path d="M4 21V10l3-2 2 2 3-3 3 3 2-2 3 2v11H4z" />
          <path d="M4 21h16" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <circle cx="12" cy="13" r="7" />
          <path d="M12 9v4l3 2M9 3h6" />
        </svg>
      );
    case "minar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <path d="M12 2l3 4H9l3-4zM9 6h6v4H9zM7 10h10l-1 11H8L7 10z" />
        </svg>
      );
    case "castle":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <path d="M4 21V9h3V7h2v2h2V6h2v3h2V7h2v2h3v12H4z" />
        </svg>
      );
    case "tower":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <path d="M9 21V9l3-5 3 5v12M6 21h12" />
        </svg>
      );
    case "mosque":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <path d="M4 21v-6a8 8 0 0 1 16 0v6M4 21h16M9 21v-4a3 3 0 0 1 6 0v4" />
        </svg>
      );
    case "building":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <rect x="6" y="4" width="12" height="17" />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={common}>
          <path d="M4 21V10l8-6 8 6v11M4 21h16M10 21v-6h4v6" />
        </svg>
      );
  }
}

/* ---------------------------------------------------------------------- */
/*  LOCATION MODAL (connected with backend cities & branches)              */
/* ---------------------------------------------------------------------- */
function LocationModal({
  open,
  onClose,
  cities,
  selectedCity,
  setSelectedCity,
  selectedBranch,
  setSelectedBranch,
  orderType,
  setOrderType,
}) {
  if (!open) return null;

  const currentCityObj = cities.find((c) => c.name.toLowerCase() === selectedCity.toLowerCase()) || cities[0];
  const branches = currentCityObj?.branches || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#E31B23] pt-6 pb-8 flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/90 hover:text-white"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="bg-white rounded-2xl px-5 py-2 shadow-lg text-center">
            <span className="font-black text-lg tracking-tight">
              <span className="text-[#E31B23]">California</span>
              <br />
              <span className="text-[#2D7A38] -mt-1 block text-sm">PIZZA</span>
            </span>
          </div>
        </div>

        <div className="px-5 pt-5 pb-6">
          <p className="text-center text-xs font-bold tracking-wide text-[#1A1A1A]/70 mb-3">
            Select your order type
          </p>
          <div className="flex bg-[#F1F1F1] rounded-full p-1 mb-5">
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
                orderType === "delivery" ? "bg-[#E31B23] text-white shadow-sm" : "text-[#1A1A1A]/60"
              }`}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-colors ${
                orderType === "pickup" ? "bg-[#E31B23] text-white shadow-sm" : "text-[#1A1A1A]/60"
              }`}
            >
              Pick-up
            </button>
          </div>

          <p className="text-center text-xs font-bold tracking-wide text-[#1A1A1A]/70 mb-3">
            Please select city
          </p>
          <div className="grid grid-cols-4 xs:grid-cols-5 gap-x-2 gap-y-3 mb-5">
            {cities.map((c) => {
              const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();
              return (
                <button
                  key={c.id || c.name}
                  type="button"
                  onClick={() => {
                    setSelectedCity(c.name);
                    if (c.branches && c.branches.length > 0) {
                      setSelectedBranch(c.branches[0]);
                    }
                  }}
                  className="flex flex-col items-center gap-1.5 group focus:outline-none"
                >
                  <div
                    className={`w-12 h-12 xs:w-14 xs:h-14 rounded-xl border flex items-center justify-center bg-white transition-all ${
                      isSelected
                        ? "border-[#E31B23] border-2 shadow-md scale-105"
                        : "border-[#E5E5E5] hover:border-gray-400"
                    }`}
                  >
                    <CityIcon type={c.icon} />
                  </div>
                  <span
                    className={`text-[9.5px] font-bold text-center leading-tight ${
                      isSelected ? "text-[#E31B23]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {c.name.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs font-bold tracking-wide text-[#1A1A1A]/70 mb-2">
            Select branch location ({branches.length} available)
          </p>
          <div className="relative mb-6">
            <select
              value={selectedBranch?.id || ""}
              onChange={(e) => {
                const b = branches.find((item) => item.id === e.target.value);
                if (b) setSelectedBranch(b);
              }}
              className="w-full appearance-none border border-[#E5E5E5] bg-white rounded-lg py-2.5 px-3 pr-8 text-sm text-[#1A1A1A] font-medium outline-none focus:border-[#E31B23]"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} (ETA ~{b.deliveryEtaMinutes} mins)
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 pointer-events-none"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#E31B23] hover:bg-[#c9181f] transition-colors text-white font-bold rounded-full py-3.5 shadow-md"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  NAVBAR                                                                  */
/* ---------------------------------------------------------------------- */
function Navbar({ city, onOpenLocation, cartCount, onOpenCart, apiOnline }) {
  return (
    <>
      <div className="bg-[#E31B23] h-1.5 w-full" />
      <header className="bg-white border-b border-[#EFEFEF] sticky top-0 z-30 shadow-xs">
        {/* Top bar with location, hotline, and live API status */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-[#F1F1F1] overflow-x-auto text-xs">
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 bg-[#F8F9FA] hover:bg-gray-100 transition-colors rounded-full pl-2.5 pr-2 py-1.5 shrink-0 border border-gray-200"
          >
            <MapPin size={14} className="text-[#E31B23]" />
            <span className="text-[10px] leading-tight text-left">
              <span className="block text-[8px] text-[#1A1A1A]/50 font-semibold">LOCATION</span>
              <span className="block font-bold text-[#1A1A1A]">{city}</span>
            </span>
            <ChevronRight size={14} className="text-[#1A1A1A]/40" />
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {/* API Status Badge */}
            <div
              className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                apiOnline
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
              title={apiOnline ? "Express API Connected" : "Express API Connecting/Offline"}
            >
              <span className={`w-2 h-2 rounded-full ${apiOnline ? "bg-green-500 animate-pulse" : "bg-amber-400"}`} />
              <span>{apiOnline ? "API Live" : "API Offline"}</span>
            </div>

            <a
              href="tel:02111753753"
              className="flex items-center gap-1.5 bg-[#F8F9FA] rounded-full px-2.5 py-1.5 shrink-0 border border-gray-200"
            >
              <Phone size={12} className="text-[#1A1A1A]" />
              <span className="text-[11px] font-bold text-[#1A1A1A]">021-111-753</span>
            </a>
          </div>
        </div>

        {/* Main Brand header */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="font-black text-xl leading-none tracking-tight cursor-pointer">
            <span className="text-[#E31B23]">California</span>
            <br />
            <span className="text-[#2D7A38] text-xs tracking-[0.2em]">PIZZA</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} className="text-[#1A1A1A]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E31B23] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/*  CATEGORY CHIPS                                                          */
/* ---------------------------------------------------------------------- */
function Chip({ label, active, onClick }) {
  const activeCls = "bg-[#E31B23] border-[#E31B23] text-white shadow-sm";
  const idleCls = "bg-white border-[#2D7A38] text-[#2D7A38] hover:bg-green-50";
  return (
    <button
      onClick={onClick}
      type="button"
      className={`shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-[11px] font-extrabold tracking-wide transition-all ${
        active ? activeCls : idleCls
      }`}
    >
      {label.toUpperCase()}
    </button>
  );
}

function CategoryChips({ activeTop, setActiveTop, activeSub, setActiveSub }) {
  return (
    <div className="sticky top-[98px] z-20 bg-white/95 backdrop-blur-sm border-b border-[#F1F1F1] shadow-xs">
      <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto no-scrollbar">
        {TOP_CHIPS.map((c) => (
          <Chip key={c} label={c} active={activeTop === c} onClick={() => setActiveTop(c)} />
        ))}
      </div>
      <div className="flex items-center gap-2 px-3 pb-2 overflow-x-auto no-scrollbar">
        {SUB_CHIPS.map((c) => (
          <Chip key={c} label={c} active={activeSub === c} onClick={() => setActiveSub(c)} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  HERO CAROUSEL                                                           */
/* ---------------------------------------------------------------------- */
function HeroCarousel() {
  const slides = ["Chass · Tikka · Boti", "Smokey Seekh Special", "United By Flavour"];
  const [idx, setIdx] = useState(0);
  const go = (d) => setIdx((i) => (i + d + slides.length) % slides.length);

  return (
    <div className="relative mx-3 mt-3 rounded-2xl overflow-hidden shadow-sm">
      <div
        className="relative h-44 xs:h-48 flex items-center justify-center text-center px-6"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.08), transparent 40%), linear-gradient(135deg, #1f4a24, #2D7A38)",
        }}
      >
        <PizzaArt tone="classic" className="absolute -left-6 -top-6 w-28 h-28 opacity-90" />
        <PizzaArt tone="pepperoni" className="absolute -right-6 -top-4 w-24 h-24 opacity-90" />
        <PizzaArt tone="classic" className="absolute -left-4 -bottom-8 w-24 h-24 opacity-90" />

        <div className="relative z-10">
          <p className="text-white font-black text-3xl xs:text-4xl leading-none tracking-tight drop-shadow-lg">
            United By
          </p>
          <p className="text-white font-black text-3xl xs:text-4xl leading-none tracking-tight drop-shadow-lg mt-1">
            Fl<span className="text-[#E8C84A]">4</span>vour
          </p>
        </div>

        <button
          onClick={() => go(-1)}
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => go(1)}
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2 bg-[#2D7A38]">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  SEARCH BAR                                                              */
/* ---------------------------------------------------------------------- */
function SearchBar({ query, setQuery, onClear }) {
  return (
    <div className="mx-3 mt-4 flex items-center rounded-full border-2 border-[#E31B23]/30 bg-white pl-4 pr-1.5 py-1 shadow-sm focus-within:border-[#E31B23] transition-colors">
      <Search size={16} className="text-[#E31B23] shrink-0" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for pizza, rolls, fries..."
        className="flex-1 bg-transparent outline-none text-sm px-2 py-1 placeholder:text-[#1A1A1A]/40 text-[#1A1A1A]"
      />
      {query && (
        <button
          type="button"
          onClick={onClear}
          className="p-1 text-gray-400 hover:text-gray-600 mr-1"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
      <div className="w-8 h-8 rounded-full bg-[#E31B23] text-white flex items-center justify-center shrink-0">
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  POPULAR ITEMS                                                           */
/* ---------------------------------------------------------------------- */
function PopularItems({ items, onAdd }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-6">
      <div className="px-3 flex items-center gap-1.5 mb-0.5">
        <Flame size={18} className="text-[#E31B23]" fill="#E31B23" />
        <h2 className="font-black text-lg text-[#1A1A1A]">POPULAR ITEMS</h2>
      </div>
      <p className="px-3 text-[11px] font-bold text-[#1A1A1A]/50 mb-3">MOST ORDERED RIGHT NOW</p>
      <div className="flex gap-3 overflow-x-auto px-3 pb-2 snap-x snap-mandatory no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="snap-start shrink-0 w-36">
            <div
              className={`relative w-36 h-36 rounded-2xl overflow-hidden bg-gradient-to-br ${
                item.hue || "from-[#f3f0c4] to-[#dfe9c4]"
              } flex items-end p-2 shadow-xs`}
            >
              <span
                className={`text-[10px] font-black leading-tight whitespace-pre-line ${
                  item.dark ? "text-white" : "text-[#1A1A1A]"
                }`}
              >
                {item.tag || item.name}
              </span>
              <div className="absolute right-2 bottom-2">
                <AddButton onAdd={() => onAdd(item)} size="sm" />
              </div>
            </div>
            <p className="text-[11px] font-bold mt-1.5 text-[#1A1A1A] truncate">{item.name}</p>
            <p className="text-[11px] font-extrabold text-[#2D7A38]">{money(item.price)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  FLAVOUR PIZZAS                                                          */
/* ---------------------------------------------------------------------- */
function FlavourPizzas({ items, onAdd, forwardRef }) {
  if (!items || items.length === 0) return null;
  return (
    <section ref={forwardRef} className="mt-8">
      <div className="flex items-center gap-3 px-3 mb-4">
        <div className="flex-1 h-px bg-[repeating-linear-gradient(90deg,#2D7A38_0,#2D7A38_6px,transparent_6px,transparent_12px)]" />
        <p className="font-black text-lg text-[#2D7A38] text-center">
          United By Fl<span className="text-[#E8C84A]">4</span>vour
        </p>
        <div className="flex-1 h-px bg-[repeating-linear-gradient(90deg,#2D7A38_0,#2D7A38_6px,transparent_6px,transparent_12px)]" />
      </div>
      <div className="grid grid-cols-2 gap-3 px-3">
        {items.map((p) => (
          <div key={p.id} className="rounded-xl overflow-hidden border border-[#EFEFEF] bg-white shadow-xs">
            <div
              className="relative aspect-square flex items-center justify-center p-4"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #1f4a24 0 2px, #245c2b 2px 4px), radial-gradient(circle, #2D7A38, #1f4a24)",
              }}
            >
              <PizzaArt tone="classic" className="w-[72%] h-[72%] ring-4 ring-black/10" />
              {p.urdu && (
                <span className="absolute bottom-2 left-0 right-0 text-center text-white font-black text-xs tracking-wide drop-shadow">
                  {p.urdu}
                </span>
              )}
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-extrabold text-[#1A1A1A] leading-tight">{p.name}</p>
                <p className="text-[10px] text-[#1A1A1A]/50 mt-1">
                  From <span className="text-[#2D7A38] font-bold">{money(p.price)}</span>
                </p>
              </div>
              <AddButton onAdd={() => onAdd(p)} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  DEAL GRID (2-column layout)                                             */
/* ---------------------------------------------------------------------- */
function DealGrid({ title, items, onAdd, forwardRef }) {
  if (!items || items.length === 0) return null;
  return (
    <section ref={forwardRef} className="mt-8 px-3">
      <h2 className="font-black text-lg text-[#1A1A1A] mb-3">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-[#EFEFEF] bg-white overflow-hidden flex flex-col shadow-xs">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-[#fdf6e3] to-[#f5e6b8] flex items-center justify-center">
              {it.ribbon && (
                <span className="absolute top-1.5 left-1.5 bg-[#E31B23] text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs">
                  {it.ribbon}
                </span>
              )}
              {it.tag && (
                <span className="absolute top-1.5 right-1.5 bg-[#1A1A1A] text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs">
                  {it.tag}
                </span>
              )}
              <PizzaArt tone="pepperoni" className="w-16 h-16" />
            </div>
            <div className="p-2.5 flex flex-col flex-1">
              <p className="text-[11px] font-extrabold text-[#1A1A1A] leading-tight">{it.name}</p>
              {it.description && (
                <p className="text-[9.5px] text-[#1A1A1A]/50 leading-snug mt-1 line-clamp-2">{it.description}</p>
              )}
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-[12px] font-extrabold text-[#2D7A38]">{money(it.price)}</span>
                <AddButton onAdd={() => onAdd(it)} size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  COMPACT GRID (Rolls & Snacks)                                           */
/* ---------------------------------------------------------------------- */
function CompactGrid({ title, items, onAdd, forwardRef, checker }) {
  if (!items || items.length === 0) return null;
  return (
    <section ref={forwardRef} className="mt-8 px-3">
      <h2 className="font-black text-lg text-[#1A1A1A] mb-3">{title}</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="rounded-xl border border-[#EFEFEF] bg-white p-2.5 flex items-center gap-3 shadow-xs"
          >
            <div
              className={`w-20 h-16 rounded-lg shrink-0 flex items-center justify-center overflow-hidden ${
                checker
                  ? "bg-[repeating-conic-gradient(#e7ecd9_0_25%,#ffffff_0_50%)] [background-size:12px_12px]"
                  : "bg-gradient-to-br from-[#fdf1de] to-[#f3d9ab]"
              }`}
            >
              <div className="w-12 h-9 rounded bg-[#E31B23] flex items-center justify-center shadow-xs">
                <span className="text-white text-[7px] font-black leading-none text-center px-1">
                  {checker ? "SNACK" : "STUFFED\nPIZZA"}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-extrabold text-[#1A1A1A] leading-tight truncate">{it.name}</p>
              {it.description && (
                <p className="text-[9.5px] text-[#1A1A1A]/50 leading-snug mt-1 line-clamp-2">{it.description}</p>
              )}
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[12px] font-extrabold text-[#2D7A38]">{money(it.price)}</span>
                <AddButton onAdd={() => onAdd(it)} size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  CART DRAWER                                                             */
/* ---------------------------------------------------------------------- */
function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  orderType,
  city,
  onProceedCheckout,
}) {
  if (!open) return null;

  const cartList = Object.values(cart);
  const subtotal = cartList.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const deliveryFee = orderType === "delivery" && subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#E31B23] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h3 className="font-extrabold text-lg">Your Order Cart</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Mode & Location Banner */}
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between text-xs border-b border-gray-200">
          <span className="font-bold text-gray-700">
            {orderType.toUpperCase()} IN {city.toUpperCase()}
          </span>
          {cartList.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-red-600 hover:text-red-800 font-semibold"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartList.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
              <ShoppingCart size={48} className="text-gray-300 mb-3" />
              <p className="font-bold text-base text-gray-600">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Explore our mouth-watering pizza deals and snacks to add items to your cart!
              </p>
            </div>
          ) : (
            cartList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 rounded-xl p-3 bg-[#F8F9FA]"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-xs text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs font-semibold text-[#2D7A38] mt-0.5">
                    {money(item.price)} each
                  </p>
                  <p className="text-[11px] font-bold text-gray-500 mt-0.5">
                    Total: {money(item.price * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-xs">
                  <button
                    onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-black w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-1"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartList.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">{money(subtotal)}</span>
            </div>
            {orderType === "delivery" && (
              <div className="flex justify-between text-xs text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold">{money(deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t border-gray-100 pt-2">
              <span>Grand Total</span>
              <span className="text-[#2D7A38] text-base">{money(grandTotal)}</span>
            </div>

            <button
              onClick={onProceedCheckout}
              className="w-full mt-2 bg-[#E31B23] hover:bg-[#c9181f] text-white font-bold py-3.5 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  CHECKOUT MODAL (Order form submitted to backend)                       */
/* ---------------------------------------------------------------------- */
function CheckoutModal({
  open,
  onClose,
  cart,
  orderType,
  city,
  branch,
  onOrderSuccess,
}) {
  if (!open) return null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartList = Object.values(cart);
  const subtotal = cartList.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const deliveryFee = orderType === "delivery" && subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (orderType === "delivery" && !address.trim()) {
      setError("Delivery address is required for home delivery.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        orderType,
        city,
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          address: orderType === "delivery" ? address.trim() : `Branch Pickup: ${branch?.name || "Main"}`,
        },
        items: cartList.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
        totalAmount: grandTotal,
        notes: notes.trim() || undefined,
      };

      const res = await submitOrder(orderPayload);
      onOrderSuccess(res.order || { orderId: `ORD-${Date.now().toString().slice(-6)}`, ...orderPayload });
    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "Failed to place order. Please verify backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl animate-in fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#E31B23] text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg">Checkout & Confirmation</h3>
            <p className="text-[11px] text-white/80">
              {orderType.toUpperCase()} · {city} {branch ? `(${branch.name})` : ""}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Faizan Ali"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 03001234567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          {orderType === "delivery" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Complete Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Apartment #, Street, Area / Landmark..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Order Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please send extra garlic sauce, call on arrival"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-1.5">
            <div className="font-bold text-gray-700 mb-1">Order Summary ({cartList.length} items)</div>
            {cartList.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-600">
                <span className="truncate pr-2">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-semibold shrink-0">{money(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-1.5 flex justify-between font-black text-sm text-gray-900">
              <span>Total to Pay:</span>
              <span className="text-[#2D7A38]">{money(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7A38] hover:bg-[#24622d] text-white font-bold py-3.5 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Sending order to backend...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>Confirm & Place Order ({money(grandTotal)})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ORDER SUCCESS MODAL                                                     */
/* ---------------------------------------------------------------------- */
function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-6 text-center animate-in zoom-in-95">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} />
        </div>

        <h3 className="text-xl font-black text-gray-900">Order Confirmed!</h3>
        <p className="text-xs text-gray-500 mt-1">
          Thank you for choosing California Pizza. Your order has been placed in our system.
        </p>

        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-extrabold text-[#E31B23] text-sm">#{order.orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status:</span>
            <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-[10px] uppercase">
              {order.status || "Confirmed"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Type:</span>
            <span className="font-semibold capitalize text-gray-800">{order.orderType}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">City / Location:</span>
            <span className="font-semibold text-gray-800">{order.city}</span>
          </div>

          {order.estimated && (
            <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2">
              <Clock size={16} className="shrink-0" />
              <span className="font-bold">
                Estimated {order.orderType === "delivery" ? "Delivery" : "Pickup"}: ~
                {order.estimated.deliveryEtaMinutes || order.estimated.pickupEtaMinutes || 35} mins
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-200 font-extrabold text-sm text-gray-900">
            <span>Total Amount:</span>
            <span className="text-[#2D7A38]">{money(order.totalAmount)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="mt-5 w-full bg-[#E31B23] hover:bg-[#c9181f] text-white font-bold py-3.5 rounded-full shadow-md transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  FLOATING BUTTONS                                                        */
/* ---------------------------------------------------------------------- */
function FloatingButtons({ onSearchClick, showTop, onTop, cartCount, onOpenCart }) {
  return (
    <>
      <a
        href="https://wa.me/923000000000"
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-24 z-30 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} fill="white" className="text-[#25D366]" />
      </a>

      {/* Floating Bottom Cart Bar when items in cart */}
      {cartCount > 0 && (
        <div className="fixed bottom-3 left-0 right-0 z-40 max-w-md mx-auto px-3">
          <button
            onClick={onOpenCart}
            type="button"
            className="w-full bg-[#E31B23] hover:bg-[#c9181f] text-white py-3 px-4 rounded-full shadow-2xl flex items-center justify-between font-bold text-sm transition-transform active:scale-98"
          >
            <div className="flex items-center gap-2">
              <span className="bg-white text-[#E31B23] rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">
                {cartCount}
              </span>
              <span>View Cart & Checkout</span>
            </div>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      <div className="fixed bottom-16 left-0 right-0 z-30 flex items-center justify-between px-4 pointer-events-none max-w-md mx-auto">
        <button
          onClick={onSearchClick}
          type="button"
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#E31B23] text-white flex items-center justify-center shadow-lg hover:bg-[#c9181f] transition-colors"
          aria-label="Jump to search"
        >
          <Search size={18} />
        </button>
        {showTop && (
          <button
            onClick={onTop}
            type="button"
            className="pointer-events-auto w-11 h-11 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-lg hover:bg-black transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        )}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/*  MAIN APP COMPONENT                                                      */
/* ---------------------------------------------------------------------- */
export default function App() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [selectedBranch, setSelectedBranch] = useState(DEFAULT_CITIES[0].branches[0]);
  const [orderType, setOrderType] = useState("delivery");

  const [menuItems, setMenuItems] = useState([]);
  const [apiOnline, setApiOnline] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState(true);

  const [activeTop, setActiveTop] = useState("Pizza Deals");
  const [activeSub, setActiveSub] = useState("Mighty Family Platter");

  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [showTop, setShowTop] = useState(false);

  const scrollRootRef = useRef(null);
  const familyRef = useRef(null);
  const tripleRef = useRef(null);
  const summerRef = useRef(null);
  const rollsRef = useRef(null);
  const snackRef = useRef(null);
  const searchRef = useRef(null);
  const topRef = useRef(null);

  // Check health and load cities and menu from backend API
  useEffect(() => {
    let isMounted = true;

    async function initData() {
      try {
        const health = await fetchHealth();
        if (isMounted && health?.status === "ok") {
          setApiOnline(true);
        }
      } catch (e) {
        console.warn("Backend health check warning:", e.message);
      }

      try {
        const cityData = await fetchCities();
        if (isMounted && cityData && cityData.length > 0) {
          setCities(cityData);
          setSelectedCity(cityData[0].name);
          if (cityData[0].branches?.length > 0) {
            setSelectedBranch(cityData[0].branches[0]);
          }
          setApiOnline(true);
        }
      } catch (e) {
        console.warn("Could not fetch cities, using defaults:", e.message);
      }

      try {
        const menuRes = await fetchMenu();
        if (isMounted && menuRes?.items) {
          setMenuItems(menuRes.items);
          setApiOnline(true);
        }
      } catch (e) {
        console.warn("Could not fetch menu, fallback data will be used:", e.message);
      } finally {
        if (isMounted) setLoadingMenu(false);
      }
    }

    initData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items by category or search query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return menuItems;
    const term = query.toLowerCase().trim();
    return menuItems.filter(
      (it) =>
        it.name.toLowerCase().includes(term) ||
        (it.description && it.description.toLowerCase().includes(term)) ||
        (it.category && it.category.toLowerCase().includes(term))
    );
  }, [menuItems, query]);

  // Grouped items
  const popularItems = useMemo(
    () => filteredItems.filter((i) => i.isPopular),
    [filteredItems]
  );
  const flavourItems = useMemo(
    () => filteredItems.filter((i) => i.category === "Flavours"),
    [filteredItems]
  );
  const familyPlatters = useMemo(
    () => filteredItems.filter((i) => i.category === "Mighty Family Platter"),
    [filteredItems]
  );
  const tripleMadness = useMemo(
    () => filteredItems.filter((i) => i.category === "Triple The Madness"),
    [filteredItems]
  );
  const summerSurprise = useMemo(
    () => filteredItems.filter((i) => i.category === "Summer Deals"),
    [filteredItems]
  );
  const stuffedRolls = useMemo(
    () => filteredItems.filter((i) => i.category === "Stuffed Pizza Roll"),
    [filteredItems]
  );
  const snackinCombo = useMemo(
    () => filteredItems.filter((i) => i.category === "Snackin Combo"),
    [filteredItems]
  );

  // Total items count in cart
  const cartCount = Object.values(cart).reduce((a, b) => a + b.quantity, 0);

  // Cart operations
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const newQty = (existing?.quantity || 0) + 1;
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: newQty,
        },
      };
    });
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: qty,
        },
      };
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  // Smooth scroll
  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScroll = (e) => {
    setShowTop(e.currentTarget.scrollTop > 500);
  };

  const handleSubChip = (label) => {
    setActiveSub(label);
    if (label === "Mighty Family Platter") scrollTo(familyRef);
    if (label === "Triple The Madness") scrollTo(tripleRef);
    if (label === "Double The Fun") scrollTo(summerRef);
  };

  const handleTopChip = (label) => {
    setActiveTop(label);
    if (label === "Stuffed Pizza Roll") scrollTo(rollsRef);
    if (label === "Snackin Combo") scrollTo(snackRef);
    if (label === "Pizza Deals") scrollTo(topRef);
    if (label === "Summer Deals") scrollTo(summerRef);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#1A1A1A]">
      {/* Location Modal */}
      <LocationModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        orderType={orderType}
        setOrderType={setOrderType}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        orderType={orderType}
        city={selectedCity}
        onProceedCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        orderType={orderType}
        city={selectedCity}
        branch={selectedBranch}
        onOrderSuccess={(order) => {
          setCheckoutOpen(false);
          clearCart();
          setConfirmedOrder(order);
        }}
      />

      {/* Order Success Confirmation */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Mobile container viewport */}
      <div
        ref={scrollRootRef}
        onScroll={handleScroll}
        className="max-w-md mx-auto bg-[#F8F9FA] min-h-screen relative shadow-xl overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <div ref={topRef} />
        <Navbar
          city={selectedCity}
          onOpenLocation={() => setLocationOpen(true)}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          apiOnline={apiOnline}
        />

        <CategoryChips
          activeTop={activeTop}
          setActiveTop={handleTopChip}
          activeSub={activeSub}
          setActiveSub={handleSubChip}
        />

        <HeroCarousel />

        <div ref={searchRef}>
          <SearchBar
            query={query}
            setQuery={setQuery}
            onClear={() => setQuery("")}
          />
        </div>

        {query.trim().length > 0 && (
          <div className="px-3 pt-2 flex items-center justify-between text-[11px] text-[#1A1A1A]/60">
            <span>
              Search results for "<span className="font-bold text-black">{query}</span>" ({filteredItems.length} found)
            </span>
            <button
              onClick={() => setQuery("")}
              className="text-[#E31B23] font-bold hover:underline"
            >
              Clear
            </button>
          </div>
        )}

        {/* Dynamic menu sections */}
        <PopularItems items={popularItems} onAdd={addToCart} />

        <FlavourPizzas items={flavourItems} onAdd={addToCart} />

        <DealGrid
          title="Mighty Family Platter"
          items={familyPlatters}
          onAdd={addToCart}
          forwardRef={familyRef}
        />

        <DealGrid
          title="Triple The Madness"
          items={tripleMadness}
          onAdd={addToCart}
          forwardRef={tripleRef}
        />

        <DealGrid
          title="Summer Surprise"
          items={summerSurprise}
          onAdd={addToCart}
          forwardRef={summerRef}
        />

        <CompactGrid
          title="Stuffed Pizza Roll"
          items={stuffedRolls}
          onAdd={addToCart}
          forwardRef={rollsRef}
        />

        <CompactGrid
          title="Snackin Combo"
          items={snackinCombo}
          onAdd={addToCart}
          forwardRef={snackRef}
          checker
        />

        <div className="h-28" />

        <FloatingButtons
          onSearchClick={() => scrollTo(searchRef)}
          showTop={showTop}
          onTop={() => scrollTo(topRef)}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
        />
      </div>
    </div>
  );
}
