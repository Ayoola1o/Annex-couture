'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-noir-900 border border-gold-600/40 text-neutral-100 px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl">
        <div className="w-8 h-8 rounded-full bg-gold-600/20 text-gold-400 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
        </div>
        <p className="text-xs sm:text-sm font-medium tracking-wide pr-2">{toastMessage}</p>
      </div>
    </div>
  );
}
