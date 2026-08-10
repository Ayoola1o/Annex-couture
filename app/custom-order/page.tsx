'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Scissors, CheckCircle, Sparkles, Send, Calendar, Ruler, Award } from 'lucide-react';

export default function CustomOrderPage() {
  const { createBespokeRequest } = useApp();

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [garmentType, setGarmentType] = useState('Red Carpet Evening Gown');
  const [bust, setBust] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [height, setHeight] = useState('');
  const [preferredFabric, setPreferredFabric] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const bespoke = createBespokeRequest({
        clientName,
        email,
        phone,
        garmentType,
        bust,
        waist,
        hips,
        height,
        preferredFabric,
        eventDate,
        notes,
      });

      setSubmittedId(bespoke.id);
      setIsSubmitting(false);
    }, 1000);
  };

  if (submittedId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold-600/20 border border-gold-500/40 text-gold-400 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold">
            Bespoke Inquiry Received
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-100">
            Private Atelier Request Submitted
          </h1>
          <p className="text-sm text-neutral-300">
            Request Reference: <strong className="text-gold-400 font-mono text-base">{submittedId}</strong>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-noir-900 border border-gold-600/20 text-xs text-neutral-300 max-w-lg mx-auto text-left space-y-3">
          <p>
            Thank you, <strong>{clientName}</strong>. Our senior bespoke master tailor will review your measurements and contact you at <strong>{email}</strong> within 24 hours to schedule your virtual or in-person consultation.
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link href="/shop" className="gold-shimmer-btn px-8 py-3 rounded-xl text-xs uppercase font-bold tracking-widest">
            Browse Storefront
          </Link>
          <Link href="/admin/orders" className="px-6 py-3 rounded-xl bg-noir-900 border border-gold-600/30 text-gold-300 text-xs uppercase font-semibold">
            Track in Brand Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-600/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
          <Scissors className="w-3.5 h-3.5" />
          <span>Haute Couture Private Fitting</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-100 font-light gold-gradient-text">
          Bespoke Custom Fitting
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Commission a completely personalized piece crafted to your anatomical proportions by Annex Couture master tailors in Paris.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-noir-900 border border-gold-600/20 space-y-6">
            <h2 className="font-serif text-2xl text-neutral-100 font-light">The Bespoke Process</h2>
            
            <div className="space-y-5 text-xs">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-400 font-bold flex items-center justify-center shrink-0 border border-gold-500/30">1</div>
                <div>
                  <h4 className="text-neutral-100 font-semibold">Measurement & Silhouette Consultation</h4>
                  <p className="text-neutral-400 mt-1">Submit your body dimensions and event timeline. Our atelier reviews fabric drape options.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-400 font-bold flex items-center justify-center shrink-0 border border-gold-500/30">2</div>
                <div>
                  <h4 className="text-neutral-100 font-semibold">Toile & Paper Pattern Creation</h4>
                  <p className="text-neutral-400 mt-1">A custom cotton toile is constructed before cutting into fine silk, velvet, or lace.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-400 font-bold flex items-center justify-center shrink-0 border border-gold-500/30">3</div>
                <div>
                  <h4 className="text-neutral-100 font-semibold">Final Hand Finishing & Delivery</h4>
                  <p className="text-neutral-400 mt-1">Includes 1-on-1 adjustment session and white-glove courier delivery worldwide.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-gold-950/30 via-noir-900 to-gold-950/30 border border-gold-600/20 flex items-center gap-4">
            <Award className="w-8 h-8 text-gold-400 shrink-0" />
            <div className="text-xs">
              <h4 className="text-gold-300 font-semibold">Atelier Guarantee</h4>
              <p className="text-neutral-400">All custom bespoke garments come with lifetime alteration support and certified authenticity.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 bg-noir-900 border border-gold-600/20 rounded-3xl p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-2xl text-neutral-100 font-light pb-3 border-b border-gold-600/15">
            Bespoke Client Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Princess Alexandra"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Garment Category *</label>
                <select
                  value={garmentType}
                  onChange={(e) => setGarmentType(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
                >
                  <option value="Red Carpet Evening Gown">Red Carpet Evening Gown</option>
                  <option value="Bespoke Wedding/Bridal Gown">Bespoke Wedding / Bridal Gown</option>
                  <option value="Double-Breasted Tuxedo Suit">Double-Breasted Tuxedo Suit</option>
                  <option value="Custom Velvet Corset Piece">Custom Velvet Corset Piece</option>
                  <option value="Other Haute Couture Silhouette">Other Haute Couture Silhouette</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alexandra@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+33 6 00 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {/* Body Measurements */}
            <div className="p-4 rounded-2xl bg-noir-950 border border-gold-600/15 space-y-3">
              <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold">
                <Ruler className="w-4 h-4" />
                <span>Body Measurements (Optional / Approximate)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Bust / Chest</label>
                  <input
                    type="text"
                    placeholder="e.g. 34B or 38 in"
                    value={bust}
                    onChange={(e) => setBust(e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Waist</label>
                  <input
                    type="text"
                    placeholder="e.g. 26 in"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Hips</label>
                  <input
                    type="text"
                    placeholder="e.g. 36 in"
                    value={hips}
                    onChange={(e) => setHips(e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Height</label>
                  <input
                    type="text"
                    placeholder="e.g. 5ft 9in"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Preferred Fabric / Color</label>
                <input
                  type="text"
                  placeholder="e.g. Italian Silk Velvet, Emerald Green"
                  value={preferredFabric}
                  onChange={(e) => setPreferredFabric(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Target Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Special Design Notes & Requests</label>
              <textarea
                rows={3}
                placeholder="Describe train length, cape preferences, sleeve details, or embroidery vision..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gold-shimmer-btn py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-xl"
            >
              {isSubmitting ? (
                <span>Submitting Atelier Request...</span>
              ) : (
                <>
                  <span>Submit Custom Fitting Request</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
