import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

export default function DealsFilterBar({
  selectedCity,
  selectedBranch,
  onOpenLocation,
  activeFilter,
  onSelectFilter,
}) {
  const filterPills = [
    { id: 'all', label: 'ALL MENU' },
    { id: 'mighty-family', label: 'MIGHTY FAMILY PLATTER' },
    { id: 'triple-madness', label: 'TRIPLE THE MADNESS' },
    { id: 'double-fun', label: 'DOUBLE THE FUN' },
    { id: 'traditional', label: 'TRADITIONAL FLAVOURS' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
        {/* Left 'Select area' dropdown trigger matching Screenshot 2 */}
        <button
          type="button"
          onClick={onOpenLocation}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-800 px-3.5 py-2 rounded-xl text-xs font-black shadow-xs transition-colors"
        >
          <MapPin size={15} className="text-[#E31B23]" />
          <span>{selectedBranch?.name || selectedCity || 'Select area'}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>

        {/* Filter Pills matching Screenshot 2 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {filterPills.map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => onSelectFilter(pill.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all transform active:scale-95 ${
                  isActive
                    ? 'bg-[#E31B23] text-white shadow-md ring-2 ring-red-300'
                    : 'bg-[#2D7A38] text-white hover:bg-[#24632e] shadow-xs'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
