import React from 'react';
import { Flame, Plus, Sparkles } from 'lucide-react';

export default function PopularDealsSection({ deals, onAddToCart, onOpenCustomize }) {
  // Find or map the 4 deals matching Screenshot 1
  const midnightDeal = deals.find((d) => d.id === 'pd-midnight') || {
    id: 'pd-midnight',
    name: 'MIDNIGHT DEALS',
    price: 1333,
    originalPrice: 2099,
    category: 'Pizza Deals',
    image: '/images/midnight-deal.jpg',
    description: 'Deal 1: 1 Large Pizza 12" starting from 11:30 PM. Add on 500ml Coke at Rs. 150.',
  };

  const doubleFunDeal = deals.find((d) => d.id === 'pd-001') || {
    id: 'pd-001',
    name: 'DOUBLE THE FUN - MEDIUM',
    price: 2099,
    category: 'Pizza Deals',
    image: '/images/double-the-fun.jpg',
    description: '2 Medium Pizzas of your choice with extra cheese.',
  };

  const shareBoxDeal = deals.find((d) => d.id === 'pd-002') || {
    id: 'pd-002',
    name: 'SHARE BOX 2 PERSON',
    price: 1699,
    category: 'Pizza Deals',
    image: '/images/share-box-deal.jpg',
    description: '2 Small Pizza, 2 Pcs Garlic Bread, Spin Roll, Fries, 2 Soft Drinks.',
  };

  const comboDeal = deals.find((d) => d.id === 'pd-combo-02') || {
    id: 'pd-combo-02',
    name: 'COMBO DEAL 02',
    price: 1099,
    category: 'Pizza Deals',
    image: '/images/combo-deal-02.jpg',
    description: 'Stuffed Pizza Roll loaded with cheese & chicken, crispy fries, and 2 chilled soft drinks.',
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Section Header Matching Screenshot 1 */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl">🔥</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
            POPULAR ITEMS
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-black text-gray-500 uppercase tracking-wider mt-0.5 ml-8 sm:ml-9">
          MOST ORDERED RIGHT NOW
        </p>
      </div>

      {/* 4 Cards Grid Matching Screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: MIDNIGHT DEALS */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          {/* Banner Graphic with Generated Photo */}
          <div className="relative aspect-4/3 bg-gray-950 p-4 flex flex-col justify-between text-white overflow-hidden">
            <img
              src={midnightDeal.image || '/images/midnight-deal.jpg'}
              alt={midnightDeal.name}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />

            {/* Brand badge & Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black bg-[#E31B23] text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Center Pizza
                </span>
                <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1 drop-shadow">
                  <Sparkles size={11} /> 11:30 PM Onwards
                </span>
              </div>
              <h4 className="text-xl font-black italic tracking-wide text-white mt-1 drop-shadow">
                Midnight Deals
              </h4>
            </div>

            {/* Pricing Offer */}
            <div className="relative z-10 mt-auto mb-1">
              <span className="text-[11px] font-bold text-gray-200 block drop-shadow">Deal 1</span>
              <span className="text-sm font-black text-white block drop-shadow">1 LARGE PIZZA 12"</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 drop-shadow">RS. 1333</span>
                <span className="text-xs font-bold text-gray-300 line-through drop-shadow">RS. 2099</span>
              </div>
              <span className="text-[9px] font-bold text-amber-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded mt-1 inline-block border border-amber-300/30">
                + Add 500ml Coke Rs. 150
              </span>
            </div>

            {/* Circular Red Add Button Overlaid */}
            <button
              onClick={() => onAddToCart(midnightDeal)}
              type="button"
              aria-label="Add Midnight Deal to cart"
              className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white flex items-center justify-center shadow-2xl transition-transform transform active:scale-90 hover:scale-110 border-2 border-white focus:outline-none"
            >
              <Plus size={22} className="stroke-[3]" />
            </button>
          </div>

          {/* Under-Card Title */}
          <div className="p-4 bg-white">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight group-hover:text-[#E31B23] transition-colors">
              MIDNIGHT DEALS
            </h3>
            <span className="text-xs font-bold text-[#2D7A38]">Starting from RS. 1,333</span>
          </div>
        </div>

        {/* Card 2: DOUBLE THE FUN - MEDIUM */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          {/* Banner Graphic with Generated Photo */}
          <div className="relative aspect-4/3 p-4 flex flex-col justify-between text-white overflow-hidden bg-gray-900">
            <img
              src={doubleFunDeal.image || '/images/double-the-fun.jpg'}
              alt={doubleFunDeal.name}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

            {/* Top Red Ribbon Banner */}
            <div className="relative z-10">
              <div className="inline-block bg-[#E31B23] text-white font-black text-xs sm:text-sm px-3 py-1 rounded-md shadow-lg uppercase tracking-tight">
                DOUBLE THE FUN
              </div>
            </div>

            {/* Bottom Price Tag */}
            <div className="relative z-10 mt-auto">
              <div className="inline-block bg-[#E31B23] text-white font-black px-3 py-1 rounded-lg shadow-lg">
                <span className="text-[10px] block text-white/90 uppercase tracking-wider">2 MEDIUM PIZZA</span>
                <span className="text-lg sm:text-xl font-black">RS. 2099</span>
              </div>
            </div>

            {/* Circular Red Add Button Overlaid */}
            <button
              onClick={() => onAddToCart(doubleFunDeal)}
              type="button"
              aria-label="Add Double The Fun Deal to cart"
              className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white flex items-center justify-center shadow-2xl transition-transform transform active:scale-90 hover:scale-110 border-2 border-white focus:outline-none"
            >
              <Plus size={22} className="stroke-[3]" />
            </button>
          </div>

          {/* Under-Card Title */}
          <div className="p-4 bg-white">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight group-hover:text-[#E31B23] transition-colors">
              DOUBLE THE FUN - MEDIUM
            </h3>
            <span className="text-xs font-bold text-[#2D7A38]">RS. 2,099 Only</span>
          </div>
        </div>

        {/* Card 3: SHARE BOX 2 PERSON */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          {/* Banner Graphic with Generated Photo */}
          <div className="relative aspect-4/3 bg-gray-900 p-4 flex flex-col justify-between text-white overflow-hidden">
            <img
              src={shareBoxDeal.image || '/images/share-box-deal.jpg'}
              alt={shareBoxDeal.name}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />

            <div className="relative z-10">
              <div className="inline-block bg-amber-400 text-gray-950 font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded uppercase tracking-wider shadow">
                SHARE BOX 01
              </div>
              <h4 className="text-base sm:text-lg font-black text-yellow-300 tracking-tight mt-1 leading-tight drop-shadow">
                SHARE THE LOVE CHEESY WAY
              </h4>
            </div>

            <div className="relative z-10 mt-auto">
              <span className="text-2xl font-black text-amber-300 drop-shadow">RS. 1699</span>
            </div>

            {/* Circular Red Add Button Overlaid */}
            <button
              onClick={() => onAddToCart(shareBoxDeal)}
              type="button"
              aria-label="Add Share Box 2 to cart"
              className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white flex items-center justify-center shadow-2xl transition-transform transform active:scale-90 hover:scale-110 border-2 border-white focus:outline-none"
            >
              <Plus size={22} className="stroke-[3]" />
            </button>
          </div>

          {/* Under-Card Title */}
          <div className="p-4 bg-white">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight group-hover:text-[#E31B23] transition-colors">
              SHARE BOX 2 PERSON
            </h3>
            <span className="text-xs font-bold text-[#2D7A38]">Complete Combo RS. 1,699</span>
          </div>
        </div>

        {/* Card 4: COMBO DEAL 02 */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
          {/* Banner Graphic with Generated Photo */}
          <div className="relative aspect-4/3 bg-gray-900 p-4 flex flex-col justify-between overflow-hidden">
            <img
              src={comboDeal.image || '/images/combo-deal-02.jpg'}
              alt={comboDeal.name}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60" />

            {/* Red Box Stuffed Roll Badge */}
            <div className="relative z-10">
              <span className="inline-block bg-[#E31B23] text-white font-black text-[10px] sm:text-xs px-2.5 py-1 rounded shadow-lg uppercase tracking-wide">
                STUFFED PIZZA ROLL
              </span>
            </div>

            <div className="relative z-10 mt-auto">
              <span className="text-2xl font-black text-amber-300 drop-shadow">RS. 1099</span>
            </div>

            {/* Circular Red Add Button Overlaid */}
            <button
              onClick={() => onAddToCart(comboDeal)}
              type="button"
              aria-label="Add Combo Deal 02 to cart"
              className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white flex items-center justify-center shadow-2xl transition-transform transform active:scale-90 hover:scale-110 border-2 border-white focus:outline-none"
            >
              <Plus size={22} className="stroke-[3]" />
            </button>
          </div>

          {/* Under-Card Title */}
          <div className="p-4 bg-white">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight group-hover:text-[#E31B23] transition-colors">
              COMBO DEAL 02
            </h3>
            <span className="text-xs font-bold text-[#2D7A38]">Roll + Fries + Drinks RS. 1,099</span>
          </div>
        </div>
      </div>
    </section>
  );
}
