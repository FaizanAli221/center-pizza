import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, SlidersHorizontal, Flame, X, Check } from 'lucide-react';
import HeritagePizzaCard from '../components/HeritagePizzaCard';
import DealsFilterBar from '../components/DealsFilterBar';


export default function Menu({
  menuItems = [],
  onAddToCart,
  onOpenCustomize,
  city,
  branch,
  onOpenLocation,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [activeDealFilter, setActiveDealFilter] = useState('all');
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

  const handleDealPillClick = (filterId) => {
    setActiveDealFilter(filterId);
    if (filterId === 'traditional') {
      setSelectedCategory('Traditional Pizzas');
    } else if (filterId !== 'all') {
      setSelectedCategory('Pizza Deals');
    } else {
      setSelectedCategory('All');
    }
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      let matchCat =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Pill filter refinement
      if (activeDealFilter === 'mighty-family') {
        matchCat =
          item.name.toLowerCase().includes('family') || item.name.toLowerCase().includes('mighty');
      } else if (activeDealFilter === 'triple-madness') {
        matchCat = item.name.toLowerCase().includes('triple');
      } else if (activeDealFilter === 'double-fun') {
        matchCat = item.name.toLowerCase().includes('double');
      } else if (activeDealFilter === 'traditional') {
        matchCat = item.category === 'Traditional Pizzas';
      }

      const matchQuery =
        !query.trim() ||
        item.name.toLowerCase().includes(query.toLowerCase().trim()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase().trim())) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase().trim()));
      const matchPrice = item.price <= maxPrice;

      return matchCat && matchQuery && matchPrice;
    });
  }, [menuItems, selectedCategory, activeDealFilter, query, maxPrice]);

  const heritageFlavors = ['SINDHI ACHARI', 'KHYBER GREEN BOTI', 'BALOCHI TIKKA', 'PUNJABI SMOKEY SEEKH'];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Filter Bar with 'Select area' & Category Pills Matching Screenshot 2 */}
      <DealsFilterBar
        selectedCity={city}
        selectedBranch={branch}
        onOpenLocation={onOpenLocation}
        activeFilter={activeDealFilter}
        onSelectFilter={handleDealPillClick}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pizza, pasta, rolls, dips, drinks..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#E31B23] transition-colors"
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
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase() && activeDealFilter === 'all';
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveDealFilter('all');
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
          {(selectedCategory !== 'All' || activeDealFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveDealFilter('all');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="text-[#E31B23] hover:underline"
            >
              Clear filters
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
                setActiveDealFilter('all');
                setMaxPrice(8000);
              }}
              className="mt-4 bg-[#E31B23] text-white text-xs font-black px-5 py-2.5 rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              // If this item is one of the 4 Pakistani Heritage Pizzas from Screenshot 2, render with HeritagePizzaCard!
              const isHeritage = heritageFlavors.some((hf) =>
                item.name.toUpperCase().includes(hf)
              );

              if (isHeritage) {
                return (
                  <HeritagePizzaCard
                    key={item.id}
                    item={item}
                    onAddToCart={onAddToCart}
                    onOpenCustomize={onOpenCustomize}
                  />
                );
              }

              const hasVariants = item.hasCustomization || (item.sizes && item.sizes.length > 0);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-900 group">
                    <img
                      src={item.image || '/images/chicken-tikka.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/chicken-tikka.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {item.tag && (
                        <span className="bg-[#1A1A1A] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                          {item.tag.replace('\n', ' ')}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
                      {item.ribbon && (
                        <span className="bg-[#E31B23] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                          {item.ribbon}
                        </span>
                      )}
                      {item.isPopular && !item.ribbon && (
                        <span className="bg-amber-400 text-gray-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow">
                          ★ Bestseller
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#2D7A38] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-black text-base sm:text-lg text-gray-900 leading-snug mt-0.5">
                        {item.name}
                      </h3>
                      {item.urdu && <span className="text-amber-800 font-bold text-xs">{item.urdu}</span>}
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-bold uppercase">
                          {hasVariants ? 'From' : 'Price'}
                        </span>
                        <span className="text-base sm:text-lg font-black text-[#2D7A38]">
                          RS. {item.price.toLocaleString('en-PK')}
                        </span>
                      </div>

                      {hasVariants ? (
                        <button
                          onClick={() => onOpenCustomize(item)}
                          type="button"
                          className="bg-[#2D7A38] hover:bg-[#23632c] text-white text-xs font-black px-4 py-2 rounded-full shadow-xs transition-colors"
                        >
                          Select Size
                        </button>
                      ) : (
                        <button
                          onClick={() => onAddToCart(item)}
                          type="button"
                          aria-label={`Add ${item.name} to cart`}
                          className="w-10 h-10 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white flex items-center justify-center shadow-md transition-transform active:scale-90"
                        >
                          <Plus size={20} className="stroke-[3]" />
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
    </div>
  );
}
