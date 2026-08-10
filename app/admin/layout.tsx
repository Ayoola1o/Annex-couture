'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Crown, LayoutDashboard, Package, ShoppingCart, Sliders, ExternalLink, LogOut, Sparkles } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdminLoggedIn, adminLogout } = useApp();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isAdminLoggedIn && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAdminLoggedIn) {
    return null;
  }

  const adminTabs = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Products', href: '/admin/products', icon: Package },
    { name: 'Orders & Bespoke', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Banner & Settings', href: '/admin/settings', icon: Sliders },
  ];

  const isTabActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-noir-950 text-neutral-100 flex flex-col">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-noir-900 border-b border-gold-600/20 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Title */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Annex Couture Logo"
                className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]"
              />
              <div>
                <span className="font-serif text-sm tracking-[0.2em] font-medium text-neutral-100 block">ANNEX ADMIN</span>
                <span className="text-[9px] text-gold-400 uppercase tracking-widest block font-sans">Brand Management Portal</span>
              </div>
            </div>

            {/* Admin Action Buttons */}
            <div className="flex items-center gap-3 text-xs">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-noir-950 border border-gold-600/20 text-neutral-300 hover:text-gold-300 transition-colors"
              >
                <span>View Customer Webpage</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </Link>

              <button
                onClick={() => {
                  adminLogout();
                  router.push('/admin/login');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/60 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>

          {/* Sub Navigation Bar */}
          <nav className="flex items-center gap-2 overflow-x-auto border-t border-gold-600/10 py-2">
            {adminTabs.map((tab) => {
              const Icon = tab.icon;
              const active = isTabActive(tab.href);
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    active
                      ? 'bg-gold-500 text-noir-950 border-gold-400 shadow-md'
                      : 'bg-noir-950 text-neutral-300 border-neutral-800 hover:border-gold-500/30 hover:text-gold-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

    </div>
  );
}
