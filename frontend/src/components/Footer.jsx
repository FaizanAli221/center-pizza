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
