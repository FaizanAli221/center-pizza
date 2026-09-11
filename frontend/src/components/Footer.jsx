import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-12 pb-20 md:pb-12 border-t-4 border-[#E31B23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#E31B23] text-white p-2 rounded-2xl flex flex-col items-center justify-center w-10 h-10">
                <span className="font-black text-[9px] leading-none">CENTER</span>
                <span className="text-[7px] font-bold text-amber-300">PIZZA</span>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                Center <span className="text-[#2D7A38]">PIZZA</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Center Pizza. Baking hot, cheesy, and flavourful pizzas across Pakistan with fresh dough made daily and signature Pakistani spices.
            </p>
            <div className="flex items-center gap-3 text-gray-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E31B23] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E31B23] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E31B23] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase mb-4 text-[#E31B23]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Explore Full Menu
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-white transition-colors">
                  Exclusive Deals & Combos
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition-colors">
                  Our Outlets & Branches
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Center Pizza
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviceable Cities */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase mb-4 text-[#2D7A38]">
              Serviceable Cities
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
              <Link to="/locations" className="hover:text-white">Karachi</Link>
              <Link to="/locations" className="hover:text-white">Lahore</Link>
              <Link to="/locations" className="hover:text-white">Islamabad</Link>
              <Link to="/locations" className="hover:text-white">Hyderabad</Link>
              <Link to="/locations" className="hover:text-white">Gujranwala</Link>
              <Link to="/locations" className="hover:text-white">Faisalabad</Link>
              <Link to="/locations" className="hover:text-white">Sargodha</Link>
              <Link to="/locations" className="hover:text-white">Quetta</Link>
            </div>
          </div>

          {/* Contact & Hotline */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase mb-4 text-white">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-[#E31B23] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:03312130709" className="block text-white font-bold text-sm hover:text-amber-300 transition-colors">0331-2130709</a>
                  <span className="text-[11px] text-gray-500">Helpline & WhatsApp Orders</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#2D7A38] shrink-0 mt-0.5" />
                <span>11:00 AM - 03:00 AM (Mon - Sun)</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <a href="mailto:info@centerpizza.com.pk" className="hover:underline">info@centerpizza.com.pk</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} Center Pizza Pakistan. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-[#E31B23] fill-[#E31B23]" /> for Pizza Lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
