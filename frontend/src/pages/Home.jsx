import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Utensils,
  MapPin,
  CheckCircle2,
  Percent
} from 'lucide-react';
import PopularDealsSection from '../components/PopularDealsSection';
import HeritagePizzaCard from '../components/HeritagePizzaCard';
import DealsFilterBar from '../components/DealsFilterBar';

function PizzaArt({ tone = 'classic', className = '' }) {
  const crust =
    tone === 'pepperoni'
      ? 'radial-gradient(circle at 50% 50%, #f3d99b 0%, #eac97e 45%, #d9a94f 60%, #c98f34 100%)'
      : 'radial-gradient(circle at 50% 50%, #f6e3b4 0%, #eccd88 45%, #d9ab55 65%, #b9843a 100%)';
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ background: crust }}>
      <div
        className="absolute inset-[12%] rounded-full"
        style={{
          background:
            tone === 'pepperoni'
              ? 'repeating-conic-gradient(#c23b2b 0deg 8deg, #d94f3d 8deg 16deg)'
              : 'repeating-conic-gradient(#8a9b4f 0deg 10deg, #6f8a3f 10deg 20deg)',
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-[30%] rounded-full bg-[#e7c26a]/70" />
    </div>
  );
}

export default function Home({
  menuItems = [],
  onAddToCart,
  onOpenCustomize,
  city,
  branch,
  onOpenLocation
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const slides = [
    {
      title: 'United By Flavour',
      sub: 'Chass · Tikka · Boti · Seekh',
      tag: 'PAKISTANI SPECIALS',
      cta: 'Explore Traditional Menu',
      link: '/menu',
      bg: 'linear-gradient(135deg, #1f4a24, #2D7A38)',
    },
    {
      title: 'Midnight Deals',
      sub: '1 Large Pizza 12" at RS. 1333 (Starting 11:30 PM)',
      tag: 'MIDNIGHT SPECIAL',
      cta: 'Order Midnight Deal',
      link: '/deals',
      bg: 'linear-gradient(135deg, #0b1120, #1e293b)',
    },
    {
      title: 'Triple The Madness',
      sub: '3 Pizzas Loaded With Extra Cheese & Fresh Toppings',
      tag: 'MEGA DEAL',
      cta: 'Grab The Deal',
      link: '/deals',
      bg: 'linear-gradient(135deg, #c9181f, #E31B23)',
    },
  ];

  const [slideIdx, setSlideIdx] = useState(0);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % slides.length);
  const prevSlide = () => setSlideIdx((i) => (i - 1 + slides.length) % slides.length);

  // Extract deals and traditional items
  const deals = menuItems.filter((i) => i.category === 'Pizza Deals');
  
  // Specific 4 heritage items matching Screenshot 2
  const heritageFlavors = ['SINDHI ACHARI', 'KHYBER GREEN BOTI', 'BALOCHI TIKKA', 'PUNJABI SMOKEY SEEKH'];
  const traditionalItems = menuItems.filter((i) => {
    return heritageFlavors.some(hf => i.name.toUpperCase().includes(hf));
  });

  // Filtered deals for specific pills
  const filteredDeals = menuItems.filter((item) => {
    if (activeFilter === 'mighty-family') {
      return item.name.toLowerCase().includes('family') || item.name.toLowerCase().includes('mighty');
    }
    if (activeFilter === 'triple-madness') {
      return item.name.toLowerCase().includes('triple');
    }
    if (activeFilter === 'double-fun') {
      return item.name.toLowerCase().includes('double');
    }
    return false;
  });

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* Top Filter Bar with 'Select area' & Category Pills Matching Screenshot 2 */}
      <DealsFilterBar
        selectedCity={city}
        selectedBranch={branch}
        onOpenLocation={onOpenLocation}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* Hero Carousel Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl min-h-[320px] sm:min-h-[400px] flex items-center justify-between px-6 sm:px-12 transition-all"
          style={{ background: slides[slideIdx].bg }}
        >
          <PizzaArt tone="classic" className="absolute -left-12 -top-12 w-48 h-48 opacity-40 blur-xs" />
          <PizzaArt tone="pepperoni" className="absolute -right-8 -bottom-8 w-60 h-60 opacity-30 blur-xs" />

          <div className="relative z-10 max-w-xl text-white py-8">
            <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase mb-3">
              {slides[slideIdx].tag}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
              {slides[slideIdx].title}
            </h1>
            <p className="text-white/90 text-sm sm:text-base font-medium mt-3 mb-6 drop-shadow">
              {slides[slideIdx].sub}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={slides[slideIdx].link}
                className="bg-white hover:bg-gray-100 text-gray-950 font-black px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95 text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{slides[slideIdx].cta}</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={onOpenLocation}
                className="bg-black/30 hover:bg-black/40 text-white font-bold px-4 py-3 rounded-full backdrop-blur-md text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <MapPin size={14} className="text-amber-300" />
                <span>Deliver to: {branch?.name || city}</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex relative z-10 items-center justify-center pr-8">
            <PizzaArt tone="pepperoni" className="w-64 h-64 shadow-2xl ring-8 ring-white/10" />
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSlideIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === slideIdx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pill Specific Deals Section when user filters by Mighty Family / Triple Madness / Double Fun */}
      {filteredDeals.length > 0 && activeFilter !== 'all' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase">
              {activeFilter.replace('-', ' ')}
            </h2>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-xs font-bold text-[#E31B23] hover:underline"
            >
              Show All Menu
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="bg-[#E31B23] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                    {deal.ribbon || 'VALUE DEAL'}
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-2">{deal.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{deal.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-black text-[#2D7A38]">
                    RS. {deal.price.toLocaleString('en-PK')}
                  </span>
                  <button
                    onClick={() => onAddToCart(deal)}
                    type="button"
                    className="bg-[#E31B23] hover:bg-[#c9181f] text-white text-xs font-black px-4 py-2 rounded-full shadow-xs flex items-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Plus size={15} /> Add Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SCREENSHOT 1: POPULAR ITEMS (MOST ORDERED RIGHT NOW) */}
      {(activeFilter === 'all' || activeFilter === 'double-fun') && (
        <PopularDealsSection
          deals={deals}
          onAddToCart={onAddToCart}
          onOpenCustomize={onOpenCustomize}
        />
      )}

      {/* SCREENSHOT 2: PAKISTANI HERITAGE 4-FLAVOUR SPOTLIGHT */}
      {(activeFilter === 'all' || activeFilter === 'traditional') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs font-black tracking-widest text-[#2D7A38] uppercase">
                United By Flavour
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mt-0.5">
                Authentic Pakistani Heritage Menu
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Regional recipes inspired by Sindh, Balochistan, Khyber, and Punjab.
              </p>
            </div>
            <Link
              to="/menu?category=Traditional%20Pizzas"
              className="text-xs font-extrabold text-[#E31B23] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore All Traditional</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4 Cultural Cards Grid Matching Screenshot 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {traditionalItems.map((item) => (
              <HeritagePizzaCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                onOpenCustomize={onOpenCustomize}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quick Category Icons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Pizza Deals', link: '/deals', icon: '🍕', bg: 'bg-red-50 hover:bg-red-100', text: 'text-[#E31B23]' },
            { label: 'Special Pizzas', link: '/menu?category=Specialty%20Pizzas', icon: '⭐', bg: 'bg-green-50 hover:bg-green-100', text: 'text-[#2D7A38]' },
            { label: 'Traditional', link: '/menu?category=Traditional%20Pizzas', icon: '🔥', bg: 'bg-amber-50 hover:bg-amber-100', text: 'text-amber-800' },
            { label: 'Starters & Fries', link: '/menu?category=Starters%20%26%20Appetizers', icon: '🍟', bg: 'bg-yellow-50 hover:bg-yellow-100', text: 'text-yellow-800' },
            { label: 'Stuffed Rolls', link: '/menu?category=Stuffed%20Pizza%20Rolls', icon: '🌯', bg: 'bg-orange-50 hover:bg-orange-100', text: 'text-orange-800' },
            { label: 'Desserts & Drinks', link: '/menu?category=Desserts', icon: '🥤', bg: 'bg-purple-50 hover:bg-purple-100', text: 'text-purple-800' },
          ].map((cat) => (
            <Link
              key={cat.label}
              to={cat.link}
              className={`p-4 rounded-2xl ${cat.bg} border border-black/5 transition-all text-center flex flex-col items-center gap-1.5 group hover:shadow-sm`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className={`text-xs font-black ${cat.text}`}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Center Pizza Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#E31B23] flex items-center justify-center mb-3">
              <Sparkles size={24} />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Fresh Dough Made Daily</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Every crust is hand-stretched and kneaded fresh every morning using wholesome wheat flour.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-[#2D7A38] flex items-center justify-center mb-3">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">100% Real Mozzarella</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Pure, stretchy, premium dairy mozzarella cheese on every single pizza with no substitutes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Clock size={24} />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Hot & Fresh in ~35 Mins</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Speedy insulated delivery boxes guarantee your pizza reaches your doorstep piping hot.
            </p>
          </div>
        </div>
      </section>

      {/* Deals CTA Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#E31B23] to-[#c9181f] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-lg">
            <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Exclusive Online Offers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-2 leading-tight">
              Craving Pizza Deals With Unmatched Value?
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-2">
              Browse our midnight deals, family platters, and double-the-fun combos available exclusively online.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/deals"
              className="bg-white hover:bg-gray-100 text-[#E31B23] font-black px-8 py-4 rounded-full text-sm shadow-xl inline-flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>View All Deals</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
