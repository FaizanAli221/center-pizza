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

export default function Home({ menuItems, onAddToCart, onOpenCustomize, city, onOpenLocation }) {
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
      title: 'Triple The Madness',
      sub: '3 Pizzas Loaded With Extra Cheese & Fresh Toppings',
      tag: 'MEGA DEAL',
      cta: 'Grab The Deal',
      link: '/deals',
      bg: 'linear-gradient(135deg, #c9181f, #E31B23)',
    },
    {
      title: 'Mighty Family Platters',
      sub: 'Pizzas, Garlic Breads & 1.5L Drink For The Whole Gang',
      tag: 'FAMILY BUNDLE',
      cta: 'Order Platter',
      link: '/deals',
      bg: 'linear-gradient(135deg, #b96a1a, #d98a28)',
    },
  ];

  const [slideIdx, setSlideIdx] = useState(0);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % slides.length);
  const prevSlide = () => setSlideIdx((i) => (i - 1 + slides.length) % slides.length);

  const popularItems = menuItems.filter((i) => i.isPopular).slice(0, 6);
  const traditionalItems = menuItems.filter((i) => i.category === 'Traditional Pizzas').slice(0, 4);

  return (
    <div className="space-y-10 sm:space-y-14 pb-12">
      {/* Hero Carousel Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl min-h-[340px] sm:min-h-[420px] flex items-center justify-between px-6 sm:px-12 transition-all"
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
                <span>Deliver to: {city}</span>
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

      {/* Popular Items Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Flame size={22} className="text-[#E31B23]" fill="#E31B23" />
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Most Popular Items</h2>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Loved by pizza enthusiasts across Pakistan
            </p>
          </div>
          <Link
            to="/menu"
            className="text-xs font-bold text-[#E31B23] hover:underline flex items-center gap-1"
          >
            <span>View Full Menu</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative p-5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-[140px]">
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                    {item.tag.replace('\n', ' ')}
                  </span>
                )}
                {item.ribbon && (
                  <span className="absolute top-3 right-3 bg-[#E31B23] text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                    {item.ribbon}
                  </span>
                )}
                <PizzaArt tone={item.id.includes('fl') ? 'classic' : 'pepperoni'} className="w-24 h-24 shadow-sm" />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-[#2D7A38] uppercase">
                  {item.category}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight mt-0.5">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-semibold">Starting From</span>
                    <span className="text-base font-black text-[#2D7A38]">
                      RS. {item.price.toLocaleString('en-PK')}
                    </span>
                  </div>

                  {item.hasCustomization ? (
                    <button
                      onClick={() => onOpenCustomize(item)}
                      type="button"
                      className="bg-[#2D7A38] hover:bg-[#23632c] text-white text-xs font-black px-4 py-2 rounded-full shadow-xs transition-colors"
                    >
                      Customize
                    </button>
                  ) : (
                    <button
                      onClick={() => onAddToCart(item)}
                      type="button"
                      className="bg-[#E31B23] hover:bg-[#c9181f] text-white text-xs font-black px-4 py-2 rounded-full shadow-xs transition-colors flex items-center gap-1"
                    >
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Traditional Pakistani Flavour Spotlight */}
      <section className="bg-gradient-to-br from-[#1f4a24] to-[#2D7A38] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
              Authentic Fusion
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-1 tracking-tight">
              United By Fl<span className="text-amber-400">4</span>vour
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              Our tribute to regional Pakistani taste — Sindhi Achari, Balochi Tikka, Khyber Boti & Punjabi Smokey Seekh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {traditionalItems.map((p) => (
              <div
                key={p.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col justify-between hover:bg-white/15 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-300 font-extrabold text-sm">{p.urdu}</span>
                    <span className="bg-black/30 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Signature
                    </span>
                  </div>
                  <h3 className="font-black text-base text-white">{p.name}</h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">{p.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <span className="font-black text-amber-300 text-sm">
                    RS. {p.price.toLocaleString('en-PK')}
                  </span>
                  <button
                    onClick={() => onOpenCustomize(p)}
                    type="button"
                    className="bg-white hover:bg-amber-50 text-gray-950 font-black text-xs px-3.5 py-1.5 rounded-full transition-transform active:scale-95"
                  >
                    Select Size
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Center Pizza Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#E31B23] flex items-center justify-center mb-3">
              <Sparkles size={24} />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Fresh Dough Made Daily</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Every crust is kneaded fresh every morning using wholesome wheat flour and secret herb seasoning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 text-[#2D7A38] flex items-center justify-center mb-3">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">100% Real Mozzarella</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Pure, stretchy, premium dairy mozzarella cheese on every single pizza with no substitutes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
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
              Browse our family platters, roll combos, and double-the-fun deals available exclusively online.
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
