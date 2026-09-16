import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Check, CheckCircle2, Store } from 'lucide-react';

export default function Locations({ cities, selectedCity, setSelectedCity, selectedBranch, setSelectedBranch }) {
  const [activeCityName, setActiveCityName] = useState(selectedCity);

  const currentCity = cities.find((c) => c.name.toLowerCase() === activeCityName.toLowerCase()) || cities[0];
  const branches = currentCity?.branches || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-black tracking-widest text-[#2D7A38] uppercase">
          Nationwide Outlets
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
          Our Branches Across Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Find your nearest Center Pizza branch for dine-in, takeaway, or lightning-fast home delivery.
        </p>
      </div>

      {/* City Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {cities.map((city) => {
          const isSelected = activeCityName.toLowerCase() === city.name.toLowerCase();
          return (
            <button
              key={city.id || city.name}
              onClick={() => setActiveCityName(city.name)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#2D7A38] text-white shadow-sm ring-2 ring-green-300'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <MapPin size={14} className={isSelected ? 'text-amber-300' : 'text-[#E31B23]'} />
              <span>{city.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}>
                {city.branches?.length || 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Branches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((b) => {
          const isActiveSelected = selectedBranch?.id === b.id;
          return (
            <div
              key={b.id}
              className={`bg-white rounded-3xl border p-6 flex flex-col justify-between transition-all ${
                isActiveSelected
                  ? 'border-[#2D7A38] ring-2 ring-[#2D7A38]/30 shadow-md'
                  : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#E31B23] flex items-center justify-center">
                      <Store size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-gray-900 leading-snug">{b.name}</h3>
                      <span className="text-[11px] font-bold text-[#2D7A38]">{currentCity.name}</span>
                    </div>
                  </div>

                  {isActiveSelected && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check size={12} strokeWidth={3} /> Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 mb-4 flex items-start gap-2">
                  <MapPin size={15} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>{b.address || `${b.name}, ${currentCity.name}`}</span>
                </p>

                <div className="space-y-2 text-xs text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gray-400" /> Delivery ETA:
                    </span>
                    <span className="font-bold text-gray-900">~{b.deliveryEtaMinutes || 35} Mins</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-gray-400" /> Booking:
                    </span>
                    <a href={`tel:${b.phone || '03312152010'}`} className="font-bold text-[#E31B23]">
                      {b.phone || '0331-2152010'}
                    </a>
                  </div>
                </div>

                {/* Service Badges */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-extrabold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    Takeaway Available
                  </span>
                  <span className="text-[10px] font-extrabold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    Dine-in Ready
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCity(currentCity.name);
                    setSelectedBranch(b);
                  }}
                  className={`w-full py-3 rounded-full text-xs font-black transition-all ${
                    isActiveSelected
                      ? 'bg-green-700 text-white shadow-sm'
                      : 'bg-gray-100 hover:bg-[#E31B23] hover:text-white text-gray-800'
                  }`}
                >
                  {isActiveSelected ? 'Currently Selected Branch' : 'Order From This Branch'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
