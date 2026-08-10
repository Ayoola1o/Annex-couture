'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Crown, Lock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (success) {
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-noir-900 border border-gold-600/30 rounded-3xl p-8 space-y-6 shadow-2xl animate-fade-in relative overflow-hidden">
        
        {/* Subtle Gold Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gold-600/10 blur-3xl pointer-events-none" />

        <div className="text-center space-y-3">
          <img
            src="/logo.png"
            alt="Annex Couture Logo"
            className="w-16 h-16 object-contain mx-auto drop-shadow-[0_0_12px_rgba(234,179,8,0.3)]"
          />
          <div>
            <span className="font-serif text-2xl tracking-[0.2em] font-light text-neutral-100 block">ANNEX COUTURE</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-semibold">Brand Admin Portal</span>
          </div>
          <p className="text-xs text-neutral-400">
            Internal brand management dashboard to populate products, manage orders, and edit storefront settings.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Invalid admin key. Try password: <strong className="underline">annexadmin</strong></span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Admin Access Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-gold-500" />
              <input
                type="password"
                required
                placeholder="Enter admin password (e.g. annexadmin)..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl py-2.5 pl-10 pr-4 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                autoFocus
              />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">Hint: Default pass is <code className="text-gold-400 font-mono">annexadmin</code> or <code className="text-gold-400 font-mono">admin</code></p>
          </div>

          <button
            type="submit"
            className="w-full gold-shimmer-btn py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
          >
            <span>Authenticate Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gold-600/15 text-center">
          <a href="/" className="text-xs text-neutral-400 hover:text-gold-300 transition-colors">
            ← Return to Public Customer Storefront
          </a>
        </div>

      </div>
    </div>
  );
}
