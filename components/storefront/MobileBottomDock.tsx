'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Home, Compass, Scissors, ShoppingBag, Crown } from 'lucide-react';

export default function MobileBottomDock() {
  const pathname = usePathname();
  const { cart, setIsCartOpen, isAdminLoggedIn } = useApp();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const dockItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/shop', icon: Compass },
    { name: 'Bespoke', href: '/custom-order', icon: Scissors },
    { name: 'Bag', href: '#cart', icon: ShoppingBag, isBag: true },
    { name: 'Admin', href: '/admin', icon: Crown },
  ];

  const isNavActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '#cart') return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-noir-950/90 backdrop-blur-xl border-t border-gold-600/20 px-3 py-2">
      <div className="flex items-center justify-around">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(item.href);

          if (item.isBag) {
            return (
              <button
                key={item.name}
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium tracking-wider uppercase transition-all"
                aria-label="Open Shopping Bag"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-neutral-300 hover:text-gold-400 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-gold-500 to-gold-700 text-noir-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse-glow">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-neutral-400 text-[9px]">Bag</span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium tracking-wider uppercase transition-all ${
                active ? 'text-gold-400 scale-105' : 'text-neutral-400 hover:text-gold-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-gold-400' : 'text-neutral-400'}`} />
              <span className={active ? 'text-gold-400 font-bold' : 'text-neutral-400'}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
