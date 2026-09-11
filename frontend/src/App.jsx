import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import ItemCustomizeModal from './components/ItemCustomizeModal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Deals from './pages/Deals';
import Locations from './pages/Locations';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import { fetchCities, fetchMenu, submitOrder, fetchHealth } from './api';
import {
  X,
  Crosshair,
  ChevronDown,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
} from 'lucide-react';

const DEFAULT_CITIES = [
  {
    id: 'khi',
    name: 'Karachi',
    branches: [
      { id: 'khi-clifton', name: 'Clifton Block 4', phone: '021-35874221', deliveryEtaMinutes: 35 },
      { id: 'khi-gulshan', name: 'Gulshan-e-Iqbal Block 13', phone: '021-34981122', deliveryEtaMinutes: 40 },
      { id: 'khi-dha', name: 'DHA Phase 5 Badar Commercial', phone: '021-35345566', deliveryEtaMinutes: 30 },
    ],
  },
  {
    id: 'lhr',
    name: 'Lahore',
    branches: [
      { id: 'lhr-gulberg', name: 'Gulberg III Main Boulevard', phone: '042-35756611', deliveryEtaMinutes: 35 },
      { id: 'lhr-johar', name: 'Johar Town G-1 Market', phone: '042-35312344', deliveryEtaMinutes: 40 },
    ],
  },
  {
    id: 'isb',
    name: 'Islamabad',
    branches: [
      { id: 'isb-f7', name: 'F-7 Markaz Jinnah Super', phone: '051-2651122', deliveryEtaMinutes: 35 },
    ],
  },
];


const money = (n) => `RS. ${Number(n || 0).toLocaleString('en-PK')}`;

/* ---------------------------------------------------------------------- */
/*  LOCATION MODAL                                                         */
/* ---------------------------------------------------------------------- */
function LocationModal({
  open,
  onClose,
  cities,
  selectedCity,
  setSelectedCity,
  selectedBranch,
  setSelectedBranch,
  orderType,
  setOrderType,
}) {
  if (!open) return null;

  const currentCityObj = cities.find((c) => c.name.toLowerCase() === selectedCity.toLowerCase()) || cities[0];
  const branches = currentCityObj?.branches || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#E31B23] pt-6 pb-8 flex flex-col items-center text-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/90 hover:text-white"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="bg-white rounded-2xl px-5 py-2 shadow-lg text-center">
            <span className="font-black text-lg tracking-tight">
              <span className="text-[#E31B23]">Center</span>
              <br />
              <span className="text-[#2D7A38] -mt-1 block text-sm">PIZZA</span>
            </span>
          </div>

        </div>

        <div className="p-6 space-y-4">
          <div>
            <p className="text-center text-xs font-bold tracking-wide text-gray-500 mb-2">
              Select Order Type
            </p>
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex-1 py-2 rounded-full text-xs font-black transition-colors ${
                  orderType === 'delivery' ? 'bg-[#E31B23] text-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`flex-1 py-2 rounded-full text-xs font-black transition-colors ${
                  orderType === 'pickup' ? 'bg-[#E31B23] text-white shadow-sm' : 'text-gray-600'
                }`}
              >
                Pick-up
              </button>
            </div>
          </div>

          <div>
            <p className="text-center text-xs font-bold tracking-wide text-gray-500 mb-2">
              Select City
            </p>
            <div className="grid grid-cols-3 gap-2">
              {cities.map((c) => {
                const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.id || c.name}
                    type="button"
                    onClick={() => {
                      setSelectedCity(c.name);
                      if (c.branches && c.branches.length > 0) {
                        setSelectedBranch(c.branches[0]);
                      }
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      isSelected
                        ? 'border-[#E31B23] bg-red-50 text-[#E31B23] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-wide text-gray-500 mb-1.5">
              Select Outlet / Branch
            </p>
            <div className="relative">
              <select
                value={selectedBranch?.id || ''}
                onChange={(e) => {
                  const b = branches.find((item) => item.id === e.target.value);
                  if (b) setSelectedBranch(b);
                }}
                className="w-full appearance-none border border-gray-200 bg-gray-50 rounded-xl py-2.5 px-3 pr-8 text-xs font-bold text-gray-800 outline-none focus:border-[#E31B23]"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} (~{b.deliveryEtaMinutes || 35} mins ETA)
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-[#E31B23] hover:bg-[#c9181f] transition-colors text-white font-black rounded-full py-3 text-xs shadow-md"
          >
            Confirm Location & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  CART DRAWER                                                             */
/* ---------------------------------------------------------------------- */
function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  orderType,
  city,
  onProceedCheckout,
}) {
  if (!open) return null;

  const cartList = Object.values(cart);
  const subtotal = cartList.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#E31B23] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h3 className="font-black text-base">Your Order Cart</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between text-xs border-b border-gray-200">
          <span className="font-bold text-gray-700">
            {orderType.toUpperCase()} IN {city.toUpperCase()}
          </span>
          {cartList.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-red-600 hover:text-red-800 font-bold"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartList.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
              <ShoppingBag size={48} className="text-gray-300 mb-3" />
              <p className="font-bold text-base text-gray-600">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Add your favorite pizzas, deals, or snacks to start your order!
              </p>
            </div>
          ) : (
            cartList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 rounded-2xl p-3 bg-gray-50/70"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-xs text-gray-900 truncate">{item.name}</p>
                  {item.notes && <p className="text-[10px] text-gray-400 italic">Note: {item.notes}</p>}
                  <p className="text-xs font-semibold text-[#2D7A38] mt-0.5">
                    {money(item.price)} each
                  </p>
                  <p className="text-[11px] font-black text-gray-600 mt-0.5">
                    Total: {money(item.price * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-xs">
                  <button
                    onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
                    aria-label="Decrease"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-black w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
                    aria-label="Increase"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-1"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartList.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">{money(subtotal)}</span>
            </div>
            {orderType === 'delivery' && (
              <div className="flex justify-between text-xs text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold">{money(deliveryFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-gray-900 border-t border-gray-100 pt-2">
              <span>Grand Total</span>
              <span className="text-[#2D7A38] text-base">{money(grandTotal)}</span>
            </div>

            <button
              onClick={onProceedCheckout}
              className="w-full mt-2 bg-[#E31B23] hover:bg-[#c9181f] text-white font-black py-3.5 rounded-full shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 text-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  CHECKOUT MODAL                                                          */
/* ---------------------------------------------------------------------- */
function CheckoutModal({
  open,
  onClose,
  cart,
  orderType,
  city,
  branch,
  onOrderSuccess,
}) {
  if (!open) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartList = Object.values(cart);
  const subtotal = cartList.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError('Please enter your name.');
    if (!phone.trim()) return setError('Please enter your phone number.');
    if (orderType === 'delivery' && !address.trim())
      return setError('Complete delivery address is required.');

    setLoading(true);
    try {
      const orderPayload = {
        orderType,
        city,
        customer: {
          name: name.trim(),
          phone: phone.trim(),
          address: orderType === 'delivery' ? address.trim() : `Pickup from: ${branch?.name || 'Main Branch'}`,
        },
        items: cartList.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
        totalAmount: grandTotal,
        notes: notes.trim() || undefined,
      };

      const res = await submitOrder(orderPayload);
      onOrderSuccess(res.order);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#E31B23] text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-black text-base">Complete Your Order</h3>
            <p className="text-[11px] text-white/80">
              {orderType.toUpperCase()} · {city} {branch ? `(${branch.name.split(' ')[0]})` : ''}
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Faizan Ali"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0300-1234567"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          {orderType === 'delivery' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Delivery Address *</label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Apartment #, Street, Area/Sector..."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#E31B23]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Order Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra sauce, call upon arrival"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#E31B23]"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-xs space-y-1">
            <div className="font-bold text-gray-700 mb-1">Summary ({cartList.length} items)</div>
            {cartList.map((it) => (
              <div key={it.id} className="flex justify-between text-gray-600 text-[11px]">
                <span className="truncate pr-2">{it.quantity}x {it.name}</span>
                <span className="font-bold shrink-0">{money(it.price * it.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-1.5 flex justify-between font-black text-xs text-gray-900">
              <span>Total Payable:</span>
              <span className="text-[#2D7A38] text-sm">{money(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D7A38] hover:bg-[#24622d] text-white font-black py-3.5 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Confirming Order...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>Confirm & Place Order ({money(grandTotal)})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ORDER SUCCESS MODAL                                                     */
/* ---------------------------------------------------------------------- */
function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-6 text-center animate-in zoom-in-95 space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <h3 className="text-xl font-black text-gray-900">Order Confirmed!</h3>
        <p className="text-xs text-gray-500">
          Thank you for choosing Center Pizza. Your meal is being prepared hot and fresh.
        </p>


        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-black text-[#E31B23] text-sm">#{order.orderId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status:</span>
            <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-[10px] uppercase">
              {order.status || 'Confirmed'}
            </span>
          </div>

          {order.estimated && (
            <div className="flex items-center gap-1.5 text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <Clock size={16} className="shrink-0 text-amber-700" />
              <span className="font-bold">
                Estimated Delivery: ~{order.estimated.deliveryEtaMinutes || 35} mins
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-200 font-black text-sm text-gray-900">
            <span>Total:</span>
            <span className="text-[#2D7A38]">{money(order.totalAmount)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-full bg-[#E31B23] hover:bg-[#c9181f] text-white font-black py-3.5 rounded-full shadow-md transition-colors text-xs"
        >
          Back to Browsing
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ROOT APP COMPONENT                                                      */
/* ---------------------------------------------------------------------- */
export default function App() {
  const [locationOpen, setLocationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [customizingItem, setCustomizingItem] = useState(null);

  const [cities, setCities] = useState(DEFAULT_CITIES);
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [selectedBranch, setSelectedBranch] = useState(DEFAULT_CITIES[0].branches[0]);
  const [orderType, setOrderType] = useState('delivery');

  const [menuItems, setMenuItems] = useState([]);
  const [apiOnline, setApiOnline] = useState(false);
  const [cart, setCart] = useState({});

  // Fetch initial cities & menu data from Express backend
  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const health = await fetchHealth();
        if (isMounted && health?.status === 'ok') setApiOnline(true);
      } catch (e) {
        console.warn('Backend offline check:', e.message);
      }

      try {
        const cityData = await fetchCities();
        if (isMounted && cityData && cityData.length > 0) {
          setCities(cityData);
          setSelectedCity(cityData[0].name);
          if (cityData[0].branches?.length > 0) setSelectedBranch(cityData[0].branches[0]);
        }
      } catch (e) {
        console.warn('Cities fetch fallback:', e.message);
      }

      try {
        const menuRes = await fetchMenu();
        if (isMounted && menuRes?.items) setMenuItems(menuRes.items);
      } catch (e) {
        console.warn('Menu fetch fallback:', e.message);
      }
    }

    init();
    return () => {
      isMounted = false;
    };
  }, []);

  // Cart operations
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const newQty = (existing?.quantity || 0) + (item.quantity || 1);
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: newQty,
          notes: item.notes,
        },
      };
    });
  }, []);

  const updateQuantity = useCallback((id, qty) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: { ...prev[id], quantity: qty },
      };
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((a, b) => a + b.quantity, 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-[#1A1A1A]">
        {/* Header */}
        <Header
          city={selectedCity}
          branch={selectedBranch}
          onOpenLocation={() => setLocationOpen(true)}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
          orderType={orderType}
          setOrderType={setOrderType}
        />


        {/* Main Body with Routes */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  menuItems={menuItems}
                  onAddToCart={addToCart}
                  onOpenCustomize={(it) => setCustomizingItem(it)}
                  city={selectedCity}
                  onOpenLocation={() => setLocationOpen(true)}
                />
              }
            />
            <Route
              path="/menu"
              element={
                <Menu
                  menuItems={menuItems}
                  onAddToCart={addToCart}
                  onOpenCustomize={(it) => setCustomizingItem(it)}
                />
              }
            />
            <Route
              path="/deals"
              element={<Deals menuItems={menuItems} onAddToCart={addToCart} />}
            />
            <Route
              path="/locations"
              element={
                <Locations
                  cities={cities}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedBranch={selectedBranch}
                  setSelectedBranch={setSelectedBranch}
                />
              }
            />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Modals */}
        <LocationModal
          open={locationOpen}
          onClose={() => setLocationOpen(false)}
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          orderType={orderType}
          setOrderType={setOrderType}
        />

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          onUpdateQty={updateQuantity}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          orderType={orderType}
          city={selectedCity}
          onProceedCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />

        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          cart={cart}
          orderType={orderType}
          city={selectedCity}
          branch={selectedBranch}
          onOrderSuccess={(order) => {
            setCheckoutOpen(false);
            clearCart();
            setConfirmedOrder(order);
          }}
        />

        <OrderSuccessModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />

        <ItemCustomizeModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={addToCart}
        />

        {/* Mobile Navigation Bar */}
        <MobileNav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
