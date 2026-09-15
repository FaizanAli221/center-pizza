import React, { useState, useMemo } from 'react';
import { Tag, Sparkles, Plus, Check, Flame } from 'lucide-react';


export default function Deals({ menuItems, onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter items that are deals
  const deals = useMemo(() => {
    return menuItems.filter(
      (item) =>
        item.category === 'Pizza Deals' ||
        item.name.toLowerCase().includes('deal') ||
        item.name.toLowerCase().includes('platter') ||
        item.name.toLowerCase().includes('madness') ||
        item.name.toLowerCase().includes('box') ||
        item.name.toLowerCase().includes('combo')
    );
  }, [menuItems]);

  const filteredDeals = useMemo(() => {
    if (activeFilter === 'All') return deals;
    if (activeFilter === 'Family')
      return deals.filter(
        (d) => d.name.toLowerCase().includes('family') || d.name.toLowerCase().includes('jumbo')
      );
    if (activeFilter === 'Triple')
      return deals.filter((d) => d.name.toLowerCase().includes('triple'));
    if (activeFilter === 'Combos')
      return deals.filter(
        (d) => d.name.toLowerCase().includes('combo') || d.name.toLowerCase().includes('box')
      );
    return deals;
  }, [deals, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#E31B23] via-[#b5141b] to-[#8f0d13] text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles size={13} /> Unbeatable Value Deals
          </span>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            Center Pizza Deals & Combo Bundles
          </h1>
          <p className="text-white/80 text-xs sm:text-sm mt-3">
            Save up to 40% with our specially curated bundles featuring multiple pizzas, starters, and drinks.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <span className="block text-2xl sm:text-3xl font-black text-amber-300">40% OFF</span>
            <span className="text-[10px] text-white/80 uppercase font-bold tracking-wider">
              Selected Bundles
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Family', 'Triple', 'Combos'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
              activeFilter === filter
                ? 'bg-[#E31B23] text-white shadow-sm ring-2 ring-red-300'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            {filter === 'All'
              ? 'All Deals'
              : filter === 'Family'
              ? 'Mighty Family Platters'
              : filter === 'Triple'
              ? 'Triple The Madness'
              : 'Combos & Share Boxes'}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-900">
              <img
                src={deal.image || '/images/double-the-fun.jpg'}
                alt={deal.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = '/images/double-the-fun.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                {deal.tag && (
                  <span className="bg-[#1A1A1A] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow">
                    {deal.tag.replace('\n', ' ')}
                  </span>
                )}
                {deal.ribbon && (
                  <span className="bg-[#E31B23] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow">
                    {deal.ribbon}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#2D7A38] uppercase tracking-wider">
                  HOT DEAL
                </span>
                <h3 className="font-black text-lg text-gray-900 leading-snug mt-1">{deal.name}</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{deal.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Deal Price</span>
                  <span className="text-xl font-black text-[#2D7A38]">
                    RS. {deal.price.toLocaleString('en-PK')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(deal)}
                  className="bg-[#E31B23] hover:bg-[#c9181f] text-white font-black text-xs px-5 py-2.5 rounded-full shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <Plus size={15} />
                  <span>Add Deal</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
