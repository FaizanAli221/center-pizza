import React, { useState, useEffect } from 'react';
import { Search, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FloatingActions() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    if (location.pathname !== '/menu') {
      navigate('/menu');
    }
    setTimeout(() => {
      const searchInput = document.querySelector('input[placeholder*="Search"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <>
      {/* Bottom Left Floating Search */}
      <div className="fixed bottom-20 sm:bottom-8 left-4 sm:left-6 z-40">
        <button
          onClick={handleSearchClick}
          aria-label="Search Menu"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-white focus:outline-none"
        >
          <Search size={22} className="stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Right Scroll to Top */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-center gap-3">
        {/* Scroll To Top Button */}
        {showTopBtn && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 border-2 border-white animate-in fade-in zoom-in-75 duration-200"
          >
            <ChevronUp size={22} className="stroke-[3]" />
          </button>
        )}
      </div>
    </>
  );
}
