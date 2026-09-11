import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, SlidersHorizontal, Flame, X, Check } from 'lucide-react';

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

export default function Menu({ menuItems, onAddToCart, onOpenCustomize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = useMemo(() => {
    const list = ['All', ...new Set(menuItems.map((item) => item.category).filter(Boolean))];
    return list;
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !query.trim() ||
        item.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase().trim())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase().trim()));
      const matchPrice = item.price <= maxPrice;
      return matchCat && matchQuery && matchPrice;
    });
  }, [menuItems, selectedCategory, query, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Menu Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-black tracking-widest text-[#E31B23] uppercase">
          Explore Our Flavours
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
          Full Center Pizza Menu
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          From mouthwatering stuffed rolls to our giant jumbo pizzas, find your favorite meal.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pizza, pasta, rolls, dips, drinks..."
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E31B23] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Price Slider */}
        <div className="flex items-center gap-3 w-full md:w-auto text-xs font-bold text-gray-700">
          <span className="shrink-0">Max Price: RS. {maxPrice.toLocaleString('en-PK')}</span>
          <input
            type="range"
            min="200"
            max="8000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-36 accent-[#E31B23]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === 'All') {
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                } else {
                  setSearchParams({ category: cat });
                }
              }}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                isActive
                  ? 'bg-[#E31B23] text-white shadow-sm ring-2 ring-red-300'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Item Counter */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
        <span>Showing {filteredItems.length} items</span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              searchParams.delete('category');
              setSearchParams(searchParams);
            }}
            className="text-[#E31B23] hover:underline"
          >
            Clear category filter
          </button>
        )}
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
          <p className="font-bold text-lg text-gray-700">No items match your criteria</p>
          <p className="text-xs text-gray-400 mt-1">Try relaxing your search terms or price filter.</p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('All');
              setMaxPrice(8000);
            }}
            className="mt-4 bg-[#E31B23] text-white text-xs font-black px-5 py-2.5 rounded-full"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => {
            const hasVariants = item.hasCustomization || (item.sizes && item.sizes.length > 0);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-[140px]">
                  {item.tag && (
                    <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[8px] font-black px-2 py-0.5 rounded-full">
                      {item.tag.replace('\n', ' ')}
                    </span>
                  )}
                  {item.ribbon && (
                    <span className="absolute top-3 right-3 bg-[#E31B23] text-white text-[8px] font-black px-2 py-0.5 rounded-full">
                      {item.ribbon}
                    </span>
                  )}
                  <PizzaArt
                    tone={item.category?.includes('Traditional') ? 'classic' : 'pepperoni'}
                    className="w-24 h-24 shadow-sm"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-[#2D7A38] uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-gray-900 leading-snug mt-0.5">
                    {item.name}
                  </h3>
                  {item.urdu && <span className="text-amber-700 font-bold text-xs">{item.urdu}</span>}
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">
                        {hasVariants ? 'From' : 'Price'}
                      </span>
                      <span className="text-base font-black text-[#2D7A38]">
                        RS. {item.price.toLocaleString('en-PK')}
                      </span>
                    </div>

                    {hasVariants ? (
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
            );
          })}
        </div>
      )}
    </div>
  );
}
