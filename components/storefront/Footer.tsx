'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Crown, Sparkles, Send, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { settings, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to Annex Couture Atelier Private Dispatch.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-noir-950 border-t border-gold-600/20 text-neutral-400 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-noir-900 via-gold-900/10 to-noir-900 border border-gold-600/20 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Private Atelier Dispatch</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light">
              Subscribe for Runway Pre-Orders & Private Fits
            </h3>
            <p className="text-xs text-neutral-400 max-w-md">
              Receive VIP invitations to upcoming seasonal lookbook releases, private trunk shows, and bespoke tailoring slots.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-noir-950 border border-gold-600/30 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 flex-1"
              required
            />
            <button
              type="submit"
              className="gold-shimmer-btn px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shrink-0"
            >
              <span>Join VIP</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gold-600/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] text-neutral-100 font-light">ANNEX</span>
              <span className="block text-[9px] tracking-[0.4em] text-gold-500 font-sans uppercase">COUTURE</span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {settings.brandStoryText}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{settings.address}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-neutral-100 font-medium tracking-wider uppercase">Collections</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop?category=Evening+Gowns" className="hover:text-gold-300 transition-colors">Evening Gowns</Link></li>
              <li><Link href="/shop?category=Haute+Couture" className="hover:text-gold-300 transition-colors">Haute Couture</Link></li>
              <li><Link href="/shop?category=Tailored+Suits" className="hover:text-gold-300 transition-colors">Tailored Suits</Link></li>
              <li><Link href="/shop?category=Ready+to+Wear" className="hover:text-gold-300 transition-colors">Ready to Wear</Link></li>
              <li><Link href="/shop?category=Luxury+Accessories" className="hover:text-gold-300 transition-colors">Luxury Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-neutral-100 font-medium tracking-wider uppercase">Atelier Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/custom-order" className="hover:text-gold-300 transition-colors">Custom Fitting Request</Link></li>
              <li><Link href="/cart" className="hover:text-gold-300 transition-colors">Track Order & Bag</Link></li>
              <li><a href={`mailto:${settings.contactEmail}`} className="hover:text-gold-300 transition-colors">Private Client Concierge</a></li>
              <li><a href={`tel:${settings.contactPhone}`} className="hover:text-gold-300 transition-colors">Phone: {settings.contactPhone}</a></li>
            </ul>
          </div>

          {/* Brand Management Access */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-neutral-100 font-medium tracking-wider uppercase">Brand Portal</h4>
            <p className="text-xs text-neutral-500">
              Internal access for brand administrators to manage products, catalog items, and view live orders.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-600/10 border border-gold-500/30 text-gold-300 font-semibold text-xs uppercase tracking-wider hover:bg-gold-500/20 transition-all"
            >
              <Crown className="w-3.5 h-3.5 text-gold-400" />
              <span>Admin Management</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Annex Couture. All rights reserved. Crafted for Vercel deployment.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Atelier Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
