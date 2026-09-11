import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  ShoppingCart,
  Menu as MenuIcon,
  X,
  Clock,
  Compass,
  Search,
  Flame,
  ChevronDown
} from 'lucide-react';

export default function Header({
  city,
  branch,
  onOpenLocation,
  cartCount,
  onOpenCart,
  apiOnline,
  orderType,
  setOrderType,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Deals & Combos', path: '/deals', badge: 'HOT' },
    { name: 'Outlets', path: '/locations' },
    { name: 'Track Order', path: '/track-order' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <>
      {/* Top Brand Bar */}
      <div className="bg-[#E31B23] text-white text-xs py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <Clock size={13} className="text-white/80" /> Delivery: 11:00 AM - 03:00 AM
            </span>
            <a
              href="tel:02111753753"
              className="flex items-center gap-1.5 font-bold hover:text-white/80 transition-colors"
            >
              <Phone size={13} /> UAN: 021-111-753-753
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Live API Health Pill */}
            <div
              className={`flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                apiOnline
                  ? 'bg-green-500/20 text-white border border-green-300/40'
                  : 'bg-amber-500/20 text-white border border-amber-300/40'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  apiOnline ? 'bg-green-300 animate-pulse' : 'bg-amber-300'
                }`}
              />
              <span>{apiOnline ? 'API LIVE' : 'OFFLINE'}</span>
            </div>

            {/* Quick Order Type Selector */}
            <div className="bg-black/20 rounded-full p-0.5 flex text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`px-2 py-0.5 rounded-full transition-colors ${
                  orderType === 'delivery' ? 'bg-white text-[#E31B23]' : 'text-white/80 hover:text-white'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`px-2 py-0.5 rounded-full transition-colors ${
                  orderType === 'pickup' ? 'bg-white text-[#E31B23]' : 'text-white/80 hover:text-white'
                }`}
              >
                Pick-up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#E31B23] text-white p-2 rounded-2xl shadow-md group-hover:scale-105 transition-transform flex flex-col items-center justify-center w-12 h-12">
                <span className="font-black text-xs leading-none">CALI</span>
                <span className="text-[8px] font-extrabold text-amber-300 tracking-wider">PIZZA</span>
              </div>
              <div className="leading-none">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#E31B23]">
                  California
                </span>
                <span className="block text-[10px] font-black tracking-[0.25em] text-[#2D7A38]">
                  PIZZA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#E31B23] text-white shadow-sm'
                        : 'text-gray-700 hover:text-[#E31B23] hover:bg-gray-50'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.2 rounded-full animate-bounce">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Controls: Location Pill & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Pill */}
              <button
                type="button"
                onClick={onOpenLocation}
                className="flex items-center gap-2 bg-[#F8F9FA] hover:bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 text-xs text-left transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-[#E31B23] shrink-0">
                  <MapPin size={12} />
                </div>
                <div className="hidden sm:block">
                  <span className="block text-[8px] font-bold text-gray-400 uppercase">
                    {orderType} IN
                  </span>
                  <span className="block font-black text-gray-900 leading-none">
                    {city} {branch ? `· ${branch.name.split(' ')[0]}` : ''}
                  </span>
                </div>
                <span className="sm:hidden font-black text-xs text-gray-800">{city}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative bg-[#E31B23] hover:bg-[#c9181f] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 group focus:outline-none"
                aria-label="Open Shopping Cart"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline text-xs font-black tracking-wide">
                  CART
                </span>
                {cartCount > 0 ? (
                  <span className="bg-white text-[#E31B23] text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                ) : (
                  <span className="hidden sm:inline-block text-[10px] opacity-80">(0)</span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-[#E31B23] text-white'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
