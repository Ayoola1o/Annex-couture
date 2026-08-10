'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Crown, Scissors, Shield, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const { settings } = useApp();

  return (
    <div className="space-y-20 pb-20 animate-fade-in">
      
      {/* Editorial Hero Header */}
      <section className="relative py-20 bg-noir-900 border-b border-gold-600/20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src={settings.heroImageUrl}
            alt="Atelier Background"
            className="w-full h-full object-cover filter grayscale"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-600/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-[0.25em]">
            <Crown className="w-3.5 h-3.5" />
            <span>Atelier History & Vision</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-neutral-100 font-light gold-gradient-text">
            The World of {settings.companyName || 'Annex Couture'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Where Parisian haute couture heritage meets modern architectural power. Crafted for visionaries who command prestige.
          </p>
        </div>
      </section>

      {/* Brand History & Heritage Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">
              Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light leading-tight">
              Individually Sculpted to Accentuate Grace, Power, and Prestige
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              {settings.brandStoryText}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
              Every garment carrying the Annex Couture signature undergoes hundreds of hours of precision hand-stitching, structural boning, and intricate beadwork. We do not mass-produce; we sculpt wearable art designed to endure through generations.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs text-neutral-200">
              <div className="p-4 rounded-xl bg-noir-900 border border-gold-600/20 space-y-1">
                <span className="font-serif text-xl text-gold-400 block font-medium">100%</span>
                <span className="text-[11px] text-neutral-400">Pure Silk & Italian Wool</span>
              </div>
              <div className="p-4 rounded-xl bg-noir-900 border border-gold-600/20 space-y-1">
                <span className="font-serif text-xl text-gold-400 block font-medium">300+ Hrs</span>
                <span className="text-[11px] text-neutral-400">Artisanal Hand Craftsmanship</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-gold-600/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Founder & Creative Director Bio Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-noir-900 via-noir-900 to-gold-950/20 rounded-3xl border border-gold-600/30 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
          
          {/* Founder Portrait Photo */}
          <div className="w-full lg:w-96 aspect-[3/4] rounded-2xl overflow-hidden border border-gold-600/40 shrink-0 shadow-2xl relative group">
            <img
              src={settings.founderPhotoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'}
              alt={settings.founderName || 'Founder'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="font-serif text-lg text-neutral-100 font-medium block">
                {settings.founderName || 'Ayoola Adebisi'}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold block">
                {settings.founderTitle || 'Founder & Creative Director'}
              </span>
            </div>
          </div>

          {/* Founder Bio Story */}
          <div className="space-y-6 flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-600/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5" />
              <span>Leadership Vision</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light">
              Meet {settings.founderName || 'Ayoola Adebisi'}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light italic border-l-2 border-gold-500 pl-4 py-1 text-left">
              "{settings.founderBio}"
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Under Ayoola’s creative leadership, Annex Couture has redefined red carpet luxury, providing bespoke evening gowns, double-breasted suits, and one-of-a-kind gala masterpieces for discerning clientele across North America, Europe, and Africa.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/custom-order"
                className="w-full sm:w-auto gold-shimmer-btn px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xl"
              >
                <Scissors className="w-4 h-4" />
                <span>Book Bespoke Consultation</span>
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-noir-950 border border-gold-600/30 text-gold-300 text-xs uppercase tracking-widest font-semibold hover:bg-gold-500/10 flex items-center justify-center gap-2"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">Pillars of Excellence</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light">The Atelier Standards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-neutral-100">Bespoke Fit Proportions</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every client's measurements are recorded to build a custom dress form, ensuring micro-millimeter precision fit.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-neutral-100">Ethical Sourcing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We partner exclusively with historic silk mills in Como, Italy and sustainable wool weavers in Huddersfield, England.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-neutral-100">White-Glove Dispatch</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Garments are dispatched in padded garment bags with temperature-controlled shipping and worldwide courier tracking.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
