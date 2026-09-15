import React, { useState, useEffect } from 'react';
import { Search, Compass, CheckCircle2, Clock, MapPin, Phone, ChefHat, Bike, AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { fetchOrderById } from '../api';

export default function TrackOrder() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('center_pizza_orders') || '[]');
      if (Array.isArray(saved) && saved.length > 0) {
        setRecentOrders(saved);
        setOrderData(saved[0]);
        setOrderIdInput(saved[0].orderId);
      }
    } catch (e) {
      console.warn('Could not load saved orders', e);
    }
  }, []);

  const handleSearch = async (e, targetId) => {
    if (e) e.preventDefault();
    const queryId = targetId || orderIdInput.trim();
    if (!queryId) return;

    setLoading(true);
    setError(null);
    try {
      const order = await fetchOrderById(queryId);
      setOrderData(order);
    } catch (err) {
      // If server lookup fails, fallback to local match if available
      const localMatch = recentOrders.find((o) => o.orderId === queryId);
      if (localMatch) {
        setOrderData(localMatch);
      } else {
        setError(err.message || 'No active order found with this ID. Please double check.');
        setOrderData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Received at kitchen counter', icon: CheckCircle2 },
    { title: 'Baking in Oven', desc: 'Fresh dough & bubbling mozzarella', icon: ChefHat },
    { title: 'Rider Dispatched', desc: 'Hot thermal insulated box en route', icon: Bike },
    { title: 'Delivered', desc: 'Handed over at your doorstep', icon: MapPin },
  ];

  const currentStep = 1; // 0-indexed: in the oven

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-black tracking-widest text-[#E31B23] uppercase">
          Live Order Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
          Track Your Pizza Order
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Enter your Center Pizza Order ID (e.g. CP-MTXALL3Z-0TDC) to view real-time delivery status.
        </p>
      </div>

      {/* Lookup Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="relative flex-1 w-full">
          <Compass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E31B23]" />
          <input
            type="text"
            required
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Enter Order ID (e.g. CP-MTX...)"
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold tracking-wide focus:outline-none focus:border-[#E31B23]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-[#E31B23] hover:bg-[#c9181f] text-white font-black px-8 py-3.5 rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>Tracking...</span>
            </>
          ) : (
            <>
              <Search size={16} />
              <span>Track Status</span>
            </>
          )}
        </button>
      </form>

      {/* Recent Orders Quick Select Chips */}
      {recentOrders.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Recent Orders:</span>
          {recentOrders.slice(0, 4).map((ord) => (
            <button
              key={ord.orderId}
              type="button"
              onClick={() => {
                setOrderIdInput(ord.orderId);
                handleSearch(null, ord.orderId);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-all ${
                orderData?.orderId === ord.orderId
                  ? 'bg-[#E31B23] text-white border-[#E31B23] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              #{ord.orderId}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {orderData && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                Order Tracking
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                #{orderData.orderId}
              </h2>
              <span className="text-xs text-gray-500">
                Placed on {new Date(orderData.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div className="bg-green-50 border border-green-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <Clock size={20} className="text-green-600" />
              <div>
                <span className="block text-[10px] text-green-700 font-bold uppercase">Estimated Time</span>
                <span className="block text-sm font-black text-green-900">
                  ~{orderData.estimated?.deliveryEtaMinutes || 30} Minutes
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div>
            <h3 className="font-black text-sm text-gray-800 uppercase tracking-wider mb-6">
              Live Progress
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div
                    key={step.title}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between ${
                      isCurrent
                        ? 'border-[#E31B23] bg-red-50/50 ring-2 ring-[#E31B23]/20 shadow-xs'
                        : isPassed
                        ? 'border-green-300 bg-green-50/40 text-gray-800'
                        : 'border-gray-200 bg-gray-50/50 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isCurrent
                            ? 'bg-[#E31B23] text-white shadow-xs'
                            : isPassed
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-[10px] font-black text-gray-400">0{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-gray-900">{step.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary & Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            {/* Items */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
              <h4 className="font-black text-gray-800 uppercase tracking-wider mb-2">
                Order Items ({orderData.items?.length || 0})
              </h4>
              {orderData.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-gray-200/60 last:border-0">
                  <span className="font-bold text-gray-700">
                    {it.quantity}x {it.name}
                  </span>
                  <span className="font-black text-[#2D7A38]">
                    RS. {(it.price * it.quantity).toLocaleString('en-PK')}
                  </span>
                </div>
              ))}
              <div className="pt-2 flex justify-between font-black text-sm text-gray-900 border-t border-gray-300">
                <span>Total Amount:</span>
                <span className="text-[#2D7A38]">
                  RS. {Number(orderData.totalAmount || 0).toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-2.5">
              <h4 className="font-black text-gray-800 uppercase tracking-wider mb-2">
                Delivery Details
              </h4>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Customer Name</span>
                <span className="font-bold text-gray-900">{orderData.customer?.name}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                <span className="font-bold text-gray-900">{orderData.customer?.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Destination</span>
                <span className="font-bold text-gray-900">
                  {orderData.customer?.address || `${orderData.orderType} in ${orderData.city}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
