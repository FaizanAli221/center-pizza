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
    description: 'Deal 1: 1 Large Pizza 12" starting from 11:30 PM. Add on 500ml Coke at Rs. 150.',
  };

  const doubleFunDeal = deals.find((d) => d.id === 'pd-001') || {
    id: 'pd-001',
    name: 'DOUBLE THE FUN - MEDIUM',
    price: 2099,
    category: 'Pizza Deals',
    description: '2 Medium Pizzas of your choice with extra cheese.',
  };

  const shareBoxDeal = deals.find((d) => d.id === 'pd-002') || {
    id: 'pd-002',
    name: 'SHARE BOX 2 PERSON',
    price: 1699,
    category: 'Pizza Deals',
    description: '2 Small Pizza, 2 Pcs Garlic Bread, Spin Roll, Fries, 2 Soft Drinks.',
  };

  const comboDeal = deals.find((d) => d.id === 'pd-combo-02') || {
    id: 'pd-combo-02',
    name: 'COMBO DEAL 02',
    price: 1099,
    category: 'Pizza Deals',
    description: 'Stuffed Pizza Roll loaded with cheese & chicken, crispy fries, and 2 chilled soft drinks.',
  };

  const items = [midnightDeal, doubleFunDeal, shareBoxDeal, comboDeal];

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
          {/* Banner Graphic */}
          <div className="relative aspect-4/3 bg-gradient-to-b from-[#0a0e17] via-[#141b2d] to-[#0f172a] p-4 flex flex-col justify-between text-white overflow-hidden">
            {/* Moon glow aura */}
            <div className="absolute top-2 right-2 w-14 h-14 rounded-full bg-white/10 blur-md pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-amber-200/20 blur-xl pointer-events-none" />

            {/* Brand badge & Header */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black bg-[#E31B23] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Center Pizza
                </span>
                <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles size={11} /> 11:30 PM Onwards
                </span>
              </div>
              <h4 className="text-xl font-black italic tracking-wide text-white mt-1">
                Midnight Deals
              </h4>
            </div>

            {/* Pricing Offer & Graphic */}
            <div className="relative z-10 my-auto flex items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-gray-300 block">Deal 1</span>
                <span className="text-sm font-black text-white block">1 LARGE PIZZA 12"</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">RS. 1333</span>
                  <span className="text-xs font-bold text-gray-400 line-through">RS. 2099</span>
                </div>
                <span className="text-[9px] font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded mt-1 inline-block">
                  + Add 500ml Coke Rs. 150
                </span>
              </div>

              {/* Pizza Visual */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 shrink-0 rounded-full border-2 border-amber-300/40 overflow-hidden shadow-lg"
                style={{
                  background: 'radial-gradient(circle, #f97316 20%, #ea580c 40%, #c2410c 70%, #7c2d12 100%)',
                }}
              >
                <div className="w-full h-full rounded-full bg-[radial-gradient(#fde047_15%,#dc2626_45%,#7f1d1d_85%)] relative">
                  {/* Pepperoni dots */}
                  {[
                    [25, 25], [55, 20], [75, 40], [30, 60], [60, 65], [45, 45]
                  ].map(([x, y], i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-[#991b1b] border border-[#7f1d1d] shadow-xs"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    />
                  ))}
                </div>
              </div>
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
          {/* Banner Graphic with Gingham Green Checkerboard */}
          <div
            className="relative aspect-4/3 p-4 flex flex-col justify-between text-white overflow-hidden"
            style={{
              backgroundColor: '#eaf4e7',
              backgroundImage: `
                linear-gradient(45deg, #bedcb8 25%, transparent 25%), 
                linear-gradient(-45deg, #bedcb8 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #bedcb8 75%), 
                linear-gradient(-45deg, transparent 75%, #bedcb8 75%)
              `,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
            }}
          >
            {/* Top Red Ribbon Banner */}
            <div className="relative z-10">
              <div className="inline-block bg-[#E31B23] text-white font-black text-xs sm:text-sm px-3 py-1 rounded-md shadow-md uppercase tracking-tight">
                DOUBLE THE FUN
              </div>
            </div>

            {/* 2 Pizzas Visual */}
            <div className="relative z-10 my-auto flex items-center justify-center gap-2">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400 overflow-hidden shadow-xl"
                style={{ background: 'radial-gradient(circle, #fde047 30%, #f97316 60%, #b45309 100%)' }}
              >
                <div className="w-full h-full flex items-center justify-center text-xs font-black text-amber-900 opacity-60">🍕</div>
              </div>
              <div className="w-20 h-20 sm:w-22 sm:h-22 -ml-6 mt-3 rounded-full border-2 border-amber-300 overflow-hidden shadow-2xl z-10"
                style={{ background: 'radial-gradient(circle, #fef08a 25%, #ea580c 65%, #9a3412 100%)' }}
              >
                <div className="w-full h-full flex items-center justify-center text-xs font-black text-red-900 opacity-60">🍕</div>
              </div>
            </div>

            {/* Bottom Price Tag */}
            <div className="relative z-10">
              <div className="inline-block bg-[#E31B23] text-white font-black px-3 py-1 rounded-lg shadow-md">
                <span className="text-xs block text-white/90">2 MEDIUM PIZZA</span>
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
          {/* Banner Graphic with Rustic Green Background */}
          <div className="relative aspect-4/3 bg-gradient-to-br from-[#194d23] via-[#23632f] to-[#123617] p-4 flex flex-col justify-between text-white overflow-hidden">
            {/* Leaf decorative hints */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-lg pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-block bg-amber-400 text-gray-950 font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded uppercase tracking-wider">
                SHARE BOX 01
              </div>
              <h4 className="text-base sm:text-lg font-black text-yellow-300 tracking-tight mt-1 leading-tight">
                SHARE THE LOVE CHEESY WAY
              </h4>
            </div>

            {/* Graphic of Box Items */}
            <div className="relative z-10 my-auto bg-black/30 backdrop-blur-xs p-2 rounded-xl border border-white/10 text-[10px] font-bold text-gray-200 leading-snug">
              <span>• 2 Small Pizzas</span><br />
              <span>• 2 Pcs Garlic Bread · Spin Roll · Fries</span><br />
              <span>• 2 Chilled Soft Drinks</span>
            </div>

            <div className="relative z-10 flex items-center gap-2">
              <span className="text-2xl font-black text-amber-300">RS. 1699</span>
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
          {/* Banner Graphic with Stuffed Rolls & Sprite */}
          <div className="relative aspect-4/3 bg-gradient-to-br from-gray-100 via-gray-200 to-amber-50 p-4 flex flex-col justify-between overflow-hidden">
            {/* Red Box Stuffed Roll Badge */}
            <div className="relative z-10">
              <span className="inline-block bg-[#E31B23] text-white font-black text-[10px] sm:text-xs px-2.5 py-1 rounded shadow uppercase tracking-wide">
                STUFFED PIZZA ROLL
              </span>
            </div>

            {/* Roll and Drink Illustration */}
            <div className="relative z-10 my-auto flex items-center justify-center gap-3">
              {/* Golden Stuffed Roll */}
              <div className="w-24 h-12 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-xl shadow-md border border-amber-700/30 flex items-center justify-around px-2 transform -rotate-3">
                <div className="w-3 h-8 bg-white/70 rounded-full blur-[1px]" />
                <div className="w-3 h-8 bg-red-700/60 rounded-full blur-[1px]" />
                <div className="w-3 h-8 bg-green-700/60 rounded-full blur-[1px]" />
              </div>

              {/* 2 Sprite Bottles */}
              <div className="flex -space-x-2">
                <div className="w-7 h-16 bg-gradient-to-b from-[#10b981] to-[#047857] rounded-t-lg rounded-b-md shadow-md border border-emerald-900/30 flex flex-col items-center justify-center text-[7px] font-black text-white">
                  Sprite
                </div>
                <div className="w-7 h-16 bg-gradient-to-b from-[#10b981] to-[#047857] rounded-t-lg rounded-b-md shadow-md border border-emerald-900/30 flex flex-col items-center justify-center text-[7px] font-black text-white transform translate-y-1">
                  Sprite
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <span className="text-xl sm:text-2xl font-black text-[#2D7A38]">RS. 1099</span>
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
