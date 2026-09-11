import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, Send, Heart, Award, ShieldCheck, Flame } from 'lucide-react';

export default function About() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Feedback', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-black tracking-widest text-[#E31B23] uppercase">
          Our Heritage & Passion
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mt-1">
          About Center Pizza
        </h1>
        <p className="text-xs sm:text-base text-gray-600 mt-3 leading-relaxed">
          Pioneering bold, mouthwatering flavours across Pakistan. Combining American hand-tossed crust traditions with authentic Pakistani culinary heritage.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
        <div className="space-y-4">
          <span className="text-xs font-black text-[#2D7A38] uppercase tracking-wider">
            Since Day One
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            United By Flavour, Driven by Quality
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Center Pizza was founded on a simple yet ambitious belief: that pizza in Pakistan should never be ordinary. We set out to craft recipes that blend traditional American pan-pizza craftsmanship with the rich, aromatic spices of Pakistan.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            From our iconic Sindhi Achari to smoky Balochi Tikka and Khyber Green Boti, our creations are inspired by the distinct flavors of our homeland.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <span className="block text-2xl font-black text-[#E31B23]">25+</span>
              <span className="text-xs font-bold text-gray-500">Outlets Across Pakistan</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-[#2D7A38]">100%</span>
              <span className="text-xs font-bold text-gray-500">Real Dairy Mozzarella</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-start gap-4">
            <div className="p-3 bg-[#E31B23] text-white rounded-xl shrink-0">
              <Award size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Award-Winning Recipes</h3>
              <p className="text-xs text-gray-500 mt-1">
                Voted as Pakistan’s favorite local pizza brand by hundreds of thousands of satisfied customers.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-start gap-4">
            <div className="p-3 bg-[#2D7A38] text-white rounded-xl shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Strict Quality Standards</h3>
              <p className="text-xs text-gray-500 mt-1">
                Zero frozen dough, zero artificial cheese analogs. Pure ingredients prepared daily under rigorous hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm max-w-3xl mx-auto">
        <div className="text-center max-w-md mx-auto mb-8">
          <h2 className="text-2xl font-black text-gray-900">Get In Touch With Us</h2>
          <p className="text-xs text-gray-500 mt-1">
            Have questions, franchise inquiries, or feedback? Drop us a message and our team will get back to you promptly.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 bg-green-50 rounded-2xl border border-green-200 p-6 space-y-3">
            <CheckCircle2 size={42} className="text-green-600 mx-auto" />
            <h3 className="text-lg font-black text-gray-900">Thank You For Reaching Out!</h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Your inquiry has been received. Our customer relations team will contact you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-[#E31B23] text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Faizan Ali"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E31B23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0300-1234567"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E31B23]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E31B23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E31B23]"
                >
                  <option value="Feedback">Order Feedback</option>
                  <option value="Franchise">Franchise Inquiry</option>
                  <option value="Catering">Event & Corporate Catering</option>
                  <option value="Other">General Question</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we assist you today?"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E31B23]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E31B23] hover:bg-[#c9181f] text-white font-black py-3.5 rounded-full shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 text-sm"
            >
              <Send size={16} />
              <span>Submit Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
