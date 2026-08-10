'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ShoppingBag, Menu, X, Search, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/shop' },
    { name: 'Haute Couture', href: '/shop?category=Haute+Couture' },
    { name: 'Custom Tailoring', href: '/custom-order' },
    { name: 'Atelier Story', href: '/#story' },
  ];

  const isNavActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-noir-950/90 backdrop-blur-md border-b border-gold-600/15 transition-all">
      {/* Dynamic Announcement Marquee Bar */}
      {settings.announcementActive && (
        <div className="bg-gradient-to-r from-noir-950 via-gold-900/40 to-noir-950 text-gold-200 text-[11px] sm:text-xs py-2 overflow-hidden border-b border-gold-600/20 font-medium tracking-widest uppercase">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold-400 inline" />
              {settings.marqueeText}
            </span>
            <span className="mx-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-gold-400 inline" />
              {settings.marqueeText}
            </span>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-neutral-300 hover:text-gold-400 transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light text-neutral-100 group-hover:text-gold-400 transition-colors">
                ANNEX
              </span>
              <span className="block text-[9px] tracking-[0.4em] text-gold-500 font-sans uppercase -mt-1 font-semibold">
                Couture • Paris
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-all py-1 border-b-2 ${
                  isNavActive(link.href)
                    ? 'text-gold-400 border-gold-500'
                    : 'text-neutral-300 border-transparent hover:text-gold-300 hover:border-gold-500/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-300 hover:text-gold-400 transition-colors rounded-full hover:bg-white/5"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Bag Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-200 hover:text-gold-400 transition-colors rounded-full hover:bg-white/5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-gradient-to-r from-gold-500 to-gold-700 text-noir-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse-glow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Search Bar Drawer */}
        {searchOpen && (
          <div className="py-4 border-t border-gold-600/15 animate-fade-in">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="flex items-center max-w-2xl mx-auto relative"
            >
              <Search className="w-5 h-5 absolute left-4 text-gold-500" />
              <input
                type="text"
                placeholder="Search velvet dresses, bespoke suits, silk trench..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-noir-900 border border-gold-500/30 rounded-full py-2.5 pl-12 pr-24 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 transition-colors"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 bg-gold-600 hover:bg-gold-500 text-noir-950 font-semibold px-4 py-1.5 rounded-full text-xs transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-noir-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-noir-900 border-r border-gold-600/20 p-6 flex flex-col justify-between shadow-2xl animate-fade-in">
            <div>
              <div className="flex items-center justify-between border-b border-gold-600/20 pb-4">
                <div>
                  <span className="font-serif text-xl tracking-[0.2em] font-light text-neutral-100">ANNEX</span>
                  <span className="block text-[8px] tracking-[0.3em] text-gold-500 font-sans uppercase">COUTURE</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm uppercase tracking-[0.2em] text-neutral-200 hover:text-gold-400 py-2 border-b border-white/5 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gold-500/50" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-gold-600/20">
              <p className="text-[10px] text-center text-neutral-500">
                © {new Date().getFullYear()} Annex Couture Paris. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
