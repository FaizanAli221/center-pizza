import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Utensils, Tag, ShoppingCart, Compass } from 'lucide-react';

export default function MobileNav({ cartCount, onOpenCart }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2 shadow-2xl flex items-center justify-around">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive ? 'text-[#E31B23]' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <Home size={18} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/menu"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive ? 'text-[#E31B23]' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <Utensils size={18} />
        <span>Menu</span>
      </NavLink>

      {/* Floating Center Cart */}
      <button
        type="button"
        onClick={onOpenCart}
        className="relative -top-4 bg-[#E31B23] hover:bg-[#c9181f] text-white w-13 h-13 rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-white active:scale-95 transition-transform"
        aria-label="View Cart"
      >
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#2D7A38] text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
            {cartCount}
          </span>
        )}
      </button>

      <NavLink
        to="/deals"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive ? 'text-[#E31B23]' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <Tag size={18} />
        <span>Deals</span>
      </NavLink>

      <NavLink
        to="/track-order"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            isActive ? 'text-[#E31B23]' : 'text-gray-500 hover:text-gray-900'
          }`
        }
      >
        <Compass size={18} />
        <span>Track</span>
      </NavLink>
    </div>
  );
}
