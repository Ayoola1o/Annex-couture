'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { settings } = useApp();

  return (
    <footer className="bg-noir-950 border-t border-gold-600/20 text-neutral-400 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gold-600/15">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Annex Couture Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-serif text-xl tracking-[0.2em] text-neutral-100 font-light block leading-none">ANNEX</span>
                <span className="block text-[8px] tracking-[0.35em] text-gold-500 font-sans uppercase font-semibold mt-0.5">COUTURE</span>
              </div>
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
