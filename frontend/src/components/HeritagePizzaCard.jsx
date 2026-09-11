import React from 'react';
import { Plus } from 'lucide-react';

/* Pakistani Regional Cultural Pattern SVG Frame */
function CulturalFrame({ flavor, children }) {
  return (
    <div className="relative w-full aspect-square bg-[#1a4223] rounded-2xl overflow-hidden p-2.5 sm:p-3 shadow-inner flex items-center justify-center">
      {/* Intricate Geometric Ajrak / Mughal Pattern SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <defs>
          <pattern id={`pattern-${flavor}`} width="40" height="40" patternUnits="userSpaceOnUse">
            {/* Tile Border */}
            <rect width="40" height="40" fill="none" stroke="#68b275" strokeWidth="0.75" />
            {/* Inner Diamond */}
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#8fd19a" strokeWidth="0.75" />
            {/* 8-pointed star motif */}
            <circle cx="20" cy="20" r="4" fill="#68b275" opacity="0.6" />
            <polygon points="20,10 23,17 30,20 23,23 20,30 17,23 10,20 17,17" fill="#c4ecc9" opacity="0.5" />
            {/* Corner florets */}
            <circle cx="0" cy="0" r="3" fill="#8fd19a" opacity="0.6" />
            <circle cx="40" cy="0" r="3" fill="#8fd19a" opacity="0.6" />
            <circle cx="0" cy="40" r="3" fill="#8fd19a" opacity="0.6" />
            <circle cx="40" cy="40" r="3" fill="#8fd19a" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#pattern-${flavor})`} />
        {/* Cultural Corner Ornaments */}
        <path d="M 8,28 L 8,8 L 28,8" fill="none" stroke="#a7e3b1" strokeWidth="2.5" />
        <path d="M 192,28 L 192,8 L 172,8" fill="none" stroke="#a7e3b1" strokeWidth="2.5" />
        <path d="M 8,172 L 8,192 L 28,192" fill="none" stroke="#a7e3b1" strokeWidth="2.5" />
        <path d="M 192,172 L 192,192 L 172,192" fill="none" stroke="#a7e3b1" strokeWidth="2.5" />
      </svg>

      {/* Outer border ring */}
      <div className="absolute inset-1.5 rounded-xl border border-[#60a86d]/40 pointer-events-none" />

      {/* Pizza Artwork */}
      {children}
    </div>
  );
}

/* Detailed SVG Top-down Pizza Visualizer for Pakistani Flavors */
function TopDownPizza({ flavor }) {
  // Topping specifics per heritage pizza
  const isSindhi = flavor.includes('SINDHI');
  const isKhyber = flavor.includes('KHYBER');
  const isBalochi = flavor.includes('BALOCHI');
  const isPunjabi = flavor.includes('PUNJABI');

  return (
    <div className="relative w-[88%] h-[88%] rounded-full shadow-2xl flex items-center justify-center">
      {/* Outer Golden Crust */}
      <div
        className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 45% 45%, #f6e2b5 0%, #e8c47a 55%, #c89542 80%, #9e6c27 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.45), inset 0 2px 6px rgba(255,255,255,0.4)',
        }}
      >
        {/* Crust blister spots */}
        <div className="absolute inset-1 rounded-full border-4 border-[#b4772b]/40" />

        {/* Cheese Layer */}
        <div
          className="w-[84%] h-[84%] rounded-full relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #fff7db 0%, #fae69e 40%, #eec968 75%, #d89f38 100%)',
            boxShadow: 'inset 0 3px 12px rgba(180, 110, 20, 0.4)',
          }}
        >
          {/* Sauce swirls & Toppings */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Tangy/Creamy/Spicy Concentric Sauce Swirls */}
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="none"
              stroke={isKhyber ? '#2d6a36' : isSindhi ? '#b22222' : isBalochi ? '#8b2500' : '#4a2511'}
              strokeWidth="3.5"
              strokeDasharray="4 3"
              opacity="0.85"
            />
            <circle
              cx="50"
              cy="50"
              r="24"
              fill="none"
              stroke={isKhyber ? '#438e4e' : '#c9392b'}
              strokeWidth="3.5"
              strokeDasharray="5 3"
              opacity="0.85"
            />
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="none"
              stroke={isKhyber ? '#23592b' : '#a32014'}
              strokeWidth="3.5"
              strokeDasharray="3 2"
              opacity="0.9"
            />

            {/* Garlic creamy mayonnaise / mint drizzle */}
            <path
              d="M 22,35 Q 38,18 55,30 T 78,35 Q 65,65 50,75 T 22,65 Z"
              fill="none"
              stroke={isKhyber ? '#c8f0cb' : '#fff9e6'}
              strokeWidth="2.2"
              opacity="0.75"
              strokeLinecap="round"
            />
            <path
              d="M 32,50 Q 50,28 68,50 T 48,72 Z"
              fill="none"
              stroke={isKhyber ? '#a2e0a8' : '#fffae8'}
              strokeWidth="1.8"
              opacity="0.7"
              strokeLinecap="round"
            />

            {/* Meat & Veggie Toppings mapped around */}
            {/* Slice guides */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="#9e6c27" strokeWidth="0.8" opacity="0.45" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#9e6c27" strokeWidth="0.8" opacity="0.45" />
            <line x1="18" y1="18" x2="82" y2="82" stroke="#9e6c27" strokeWidth="0.8" opacity="0.4" />
            <line x1="18" y1="82" x2="82" y2="18" stroke="#9e6c27" strokeWidth="0.8" opacity="0.4" />

            {/* Balochi Tikka chunks or Seekh Kebab or Boti pieces */}
            {isBalochi && (
              <>
                {/* Center lemon slice */}
                <circle cx="50" cy="50" r="6" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="50" cy="50" r="4.5" fill="#fef08a" />
                {/* Spiced Tikka meat */}
                {[
                  [30, 30], [50, 20], [70, 30], [25, 55], [75, 55], [35, 75], [65, 75], [42, 38], [58, 40], [48, 65]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <rect x={x - 3} y={y - 3} width="6" height="6" rx="2" fill="#782312" />
                    <circle cx={x} cy={y} r="1.5" fill="#c2410c" />
                  </g>
                ))}
              </>
            )}

            {isKhyber && (
              <>
                {/* Green Boti Chunks + herbs */}
                {[
                  [32, 28], [50, 20], [68, 28], [24, 52], [76, 52], [35, 72], [65, 72], [42, 38], [58, 42], [50, 62]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="3.8" fill="#1b4d24" />
                    <circle cx={x - 1} cy={y - 1} r="2" fill="#3b823e" />
                    <circle cx={x + 2} cy={y + 2} r="1" fill="#86efac" />
                  </g>
                ))}
              </>
            )}

            {isSindhi && (
              <>
                {/* Achari spiced chicken chunks & red pickles */}
                {[
                  [30, 28], [50, 20], [70, 28], [24, 52], [76, 52], [34, 72], [66, 72], [44, 38], [56, 40], [50, 60]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <rect x={x - 3.5} y={y - 3.5} width="7" height="6" rx="2" fill="#991b1b" />
                    <circle cx={x + 1} cy={y} r="1.5" fill="#f97316" />
                    {/* Pickled green chili speck */}
                    <circle cx={x - 2} cy={y + 2} r="1" fill="#15803d" />
                  </g>
                ))}
              </>
            )}

            {isPunjabi && (
              <>
                {/* Charcoal Smokey Seekh slices (rings) */}
                {[
                  [30, 28], [50, 18], [70, 28], [24, 52], [76, 52], [34, 74], [66, 74], [42, 38], [58, 38], [50, 62]
                ].map(([x, y], i) => (
                  <g key={i}>
                    <ellipse cx={x} cy={y} rx="4.5" ry="3.5" fill="#3f1c10" stroke="#78350f" strokeWidth="1" />
                    <ellipse cx={x} cy={y} rx="2" ry="1.5" fill="#f59e0b" opacity="0.6" />
                  </g>
                ))}
              </>
            )}

            {/* Red onion slivers on all */}
            {[
              [38, 22], [62, 22], [18, 42], [82, 42], [28, 64], [72, 64], [48, 48]
            ].map(([x, y], i) => (
              <path
                key={`onion-${i}`}
                d={`M ${x - 3},${y} Q ${x},${y - 3} ${x + 3},${y}`}
                fill="none"
                stroke="#a21caf"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* Regional Urdu Calligraphy Ribbon Badge */
function RegionalBadge({ badgeText }) {
  return (
    <div className="absolute bottom-2 inset-x-3 z-10 flex justify-center">
      <div className="bg-[#12361a]/95 border border-[#86efac]/40 backdrop-blur-md px-3 py-1 rounded-lg shadow-lg flex items-center justify-center gap-1.5 text-center">
        <span className="text-white font-black text-xs sm:text-sm tracking-wide uppercase drop-shadow">
          {badgeText}
        </span>
      </div>
    </div>
  );
}

export default function HeritagePizzaCard({ item, onAddToCart, onOpenCustomize }) {
  const handleClick = () => {
    if (item.hasCustomization || (item.sizes && item.sizes.length > 0)) {
      onOpenCustomize(item);
    } else {
      onAddToCart(item);
    }
  };

  const badgeUrdu = item.badgeUrdu || item.urdu || 'PAKISTANI SPECIAL';

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group">
      {/* Cultural Green Frame Image Container */}
      <div className="relative p-2.5 sm:p-3 bg-gray-50 flex items-center justify-center">
        <CulturalFrame flavor={item.name}>
          {item.image ? (
            <div className="relative w-[88%] h-[88%] rounded-full shadow-2xl overflow-hidden border-2 border-amber-400/50 flex items-center justify-center bg-[#1a4223]">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <TopDownPizza flavor={item.name} />
          )}
          <RegionalBadge badgeText={badgeUrdu} />
        </CulturalFrame>
      </div>

      {/* Card Info & Add Button */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-gray-900 uppercase tracking-tight leading-tight group-hover:text-[#2D7A38] transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Price & Action Row Matching Screenshot 2 */}
        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-black text-[#2D7A38] uppercase tracking-wider">
              FROM <span className="text-base sm:text-lg font-black">RS. {Number(item.fromPrice || item.price || 1399).toLocaleString('en-PK')}</span>
            </span>
          </div>

          <button
            onClick={handleClick}
            type="button"
            aria-label={`Add ${item.name} to order`}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E31B23] hover:bg-[#c9181f] text-white flex items-center justify-center shadow-lg transition-transform transform active:scale-90 hover:scale-105 focus:outline-none ring-2 ring-red-200"
          >
            <Plus size={22} className="stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
}
