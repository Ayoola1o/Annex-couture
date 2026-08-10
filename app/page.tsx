'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { INITIAL_ATELIER_CATEGORIES } from '@/lib/data';
import { Sparkles, ArrowRight, Scissors, Eye, ShoppingBag, Crown, Shield, Award, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const { products, setQuickViewProduct, addToCart, settings } = useApp();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  const categories = settings.atelierCategories && settings.atelierCategories.length > 0
    ? settings.atelierCategories
    : INITIAL_ATELIER_CATEGORIES;

  return (
    <div className="space-y-24 pb-20">
      
      {/* Editorial Hero Banner */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-gold-600/20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImageUrl}
            alt="Annex Couture Hero"
            className="w-full h-full object-cover object-center filter brightness-50 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/60 to-noir-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-noir-900/80 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md animate-fade-in">
            <Crown className="w-3.5 h-3.5 text-gold-400" />
            <span>Autumn / Winter Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-neutral-100 font-light tracking-wide leading-tight gold-gradient-text max-w-4xl mx-auto">
            {settings.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            {settings.heroSubtitle}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto gold-shimmer-btn px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/custom-order"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-noir-900/80 hover:bg-noir-800 border border-gold-600/40 text-gold-300 text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 backdrop-blur-md transition-all"
            >
              <Scissors className="w-4 h-4 text-gold-400" />
              <span>Book Custom Fitting</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Showcase ("Explore The Atelier") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">Curated Categories</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light">Explore The Atelier</h2>
          <p className="text-xs text-neutral-400 max-w-xl mx-auto">
            Distinctive fashion movements tailored with precision, rare textiles, and bespoke artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.title}
              href={`/shop?category=${encodeURIComponent(cat.category)}`}
              className="group relative h-96 rounded-2xl overflow-hidden border border-gold-600/20 glass-panel-hover flex flex-col justify-end p-6"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent" />

              <div className="relative z-10 space-y-2">
                <h3 className="font-serif text-xl text-neutral-100 font-medium group-hover:text-gold-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">
                  {cat.subtitle}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4 border-b border-gold-600/15 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">Handpicked Creations</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light">Iconic Arrivals</h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.2em] text-gold-400 hover:text-gold-200 font-medium flex items-center gap-1.5"
          >
            <span>View All Products ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-noir-900 border border-gold-600/15 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all flex flex-col justify-between"
            >
              {/* Product Image Box */}
              <div className="relative aspect-[3/4] bg-noir-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {product.isNewArrival && (
                  <span className="absolute top-3 left-3 bg-gold-600 text-noir-950 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                    New Arrival
                  </span>
                )}

                {/* Quick Action Hover Buttons */}
                <div className="absolute inset-0 bg-noir-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="p-3 bg-noir-900/90 text-neutral-200 hover:text-gold-400 rounded-full border border-gold-600/30 backdrop-blur-md transition-transform hover:scale-110"
                    title="Quick Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                    className="p-3 bg-gold-600 text-noir-950 hover:bg-gold-500 rounded-full font-bold shadow-lg transition-transform hover:scale-110"
                    title="Quick Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info Details */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold block">
                  {product.category}
                </span>
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="font-serif text-lg text-neutral-100 font-medium hover:text-gold-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-base text-gold-400 font-medium">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {product.stock > 0 ? `${product.stock} available` : 'Bespoke Order'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bespoke Custom Fitting Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-gold-600/30 bg-gradient-to-r from-noir-900 via-gold-950/20 to-noir-900 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-600/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5" />
              <span>Haute Couture Atelier Service</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light leading-tight">
              Bespoke Tailoring & Made-To-Measure Fitting
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Have a red carpet event, gala, or luxury wedding? Submit your body measurements directly to our master tailors in Paris for a custom garment crafted strictly to your proportions.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-neutral-400 justify-center md:justify-start">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold-400" /> Hand-Stitched Boning</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold-400" /> Rare Silk & Lace Options</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold-400" /> Worldwide Private Fitting</span>
            </div>
            <div className="pt-4">
              <Link
                href="/custom-order"
                className="inline-flex items-center gap-2 gold-shimmer-btn px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl"
              >
                <span>Request Custom Creation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 aspect-[4/5] rounded-2xl overflow-hidden border border-gold-600/20 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
              alt="Atelier Tailoring"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brand Story Section (#story) */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-noir-900 border border-gold-600/15 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-neutral-100">Paris & NY Heritage</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Designed between the historic fashion districts of Paris and Manhattan, carrying forward decades of haute couture lineage.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-noir-900 border border-gold-600/15 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-neutral-100">Sustainable Luxury</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Zero-waste small batch production using ethically harvested Mulberry silk, Italian wools, and organic velvet.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-noir-900 border border-gold-600/15 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg text-neutral-100">Concierge Fitting</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every client receives 1-on-1 fashion styling support, garment alterability guarantee, and white-glove delivery.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
