import React, { useState } from 'react';
import { X, Check, Plus, Minus, Flame, Sparkles } from 'lucide-react';

const CRUST_OPTIONS = [
  { id: 'pan', name: 'Original Hand Tossed Pan', extra: 0 },
  { id: 'thin', name: 'Crispy Thin Crust', extra: 0 },
  { id: 'stuffed', name: 'Cheese Stuffed Crust', extra: 250 },
];

export default function ItemCustomizeModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const defaultSizes = item.sizes || [
    { name: 'Regular', price: item.price },
  ];

  const [selectedSize, setSelectedSize] = useState(defaultSizes[0]);
  const [selectedCrust, setSelectedCrust] = useState(CRUST_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  const unitPrice = selectedSize.price + selectedCrust.extra;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart({
      id: `${item.id}-${selectedSize.name.replace(/[^a-zA-Z0-9]/g, '')}`,
      name: `${item.name} (${selectedSize.name}${selectedCrust.id !== 'pan' ? ` - ${selectedCrust.name}` : ''})`,
      price: unitPrice,
      quantity,
      notes: specialNotes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#1f4a24] to-[#2D7A38] text-white p-5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-black px-2 py-0.5 rounded-full">
              {item.category || 'Special Pizza'}
            </span>
            {item.isPopular && (
              <span className="text-[10px] font-extrabold uppercase bg-[#E31B23] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame size={10} fill="white" /> Popular
              </span>
            )}
          </div>
          <h3 className="font-black text-xl leading-snug">{item.name}</h3>
          {item.urdu && <p className="text-amber-200 text-xs mt-0.5">{item.urdu}</p>}
          <p className="text-white/80 text-xs mt-1 line-clamp-2">{item.description}</p>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Size Selection */}
          {defaultSizes.length > 1 && (
            <div>
              <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>Select Size</span>
                <span className="text-red-500 font-bold">*</span>
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {defaultSizes.map((size) => {
                  const isSelected = selectedSize.name === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#E31B23] bg-red-50/50 shadow-xs ring-2 ring-[#E31B23]/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div>
                        <span className="block font-black text-xs text-gray-900">{size.name}</span>
                        <span className="block font-extrabold text-xs text-[#2D7A38] mt-0.5">
                          RS. {size.price.toLocaleString('en-PK')}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          isSelected ? 'bg-[#E31B23] border-[#E31B23] text-white' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crust Selection (for pizzas) */}
          {item.category?.toLowerCase().includes('pizza') && (
            <div>
              <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider mb-2.5">
                Choose Crust
              </h4>
              <div className="space-y-2">
                {CRUST_OPTIONS.map((crust) => {
                  const isSelected = selectedCrust.id === crust.id;
                  return (
                    <button
                      key={crust.id}
                      type="button"
                      onClick={() => setSelectedCrust(crust)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#2D7A38] bg-green-50/40 font-bold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isSelected ? 'bg-[#2D7A38] border-[#2D7A38] text-white' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check size={10} strokeWidth={3} />}
                        </div>
                        <span className="text-xs text-gray-800">{crust.name}</span>
                      </div>
                      {crust.extra > 0 ? (
                        <span className="text-[11px] font-bold text-[#E31B23]">
                          +RS. {crust.extra}
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400 font-semibold">Included</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider mb-1.5">
              Special Instructions
            </h4>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Well done crust, less onions, extra napkins..."
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E31B23]"
            />
          </div>
        </div>

        {/* Modal Footer with quantity and add button */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="font-black text-sm w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            type="button"
            className="flex-1 bg-[#E31B23] hover:bg-[#c9181f] text-white font-extrabold py-3 px-4 rounded-full shadow-md transition-transform active:scale-98 flex items-center justify-between text-xs sm:text-sm"
          >
            <span>Add to Cart</span>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full font-black">
              RS. {totalPrice.toLocaleString('en-PK')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
