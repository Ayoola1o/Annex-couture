'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ProductCategory, Product } from '@/lib/types';
import { Search, SlidersHorizontal, Eye, ShoppingBag, Filter, X, ChevronDown, Check } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products, setQuickViewProduct, addToCart, categories: storeCategories } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync category or search query from URL params on load
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const categoriesList = ['All', ...storeCategories];

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price <= priceMax;

    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">
          Annex Atelier Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-100 font-light gold-gradient-text">
          Collections & Ready-to-Wear
        </h1>
        <p className="text-xs text-neutral-400">
          Discover hand-crafted apparel, bespoke suits, and haute couture evening wear available for worldwide dispatch or custom tailoring.
        </p>
      </div>

      {/* Category Tab Filter Pills (Scrollable on Desktop & Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap border ${
              selectedCategory === cat
                ? 'bg-gold-500 text-noir-950 border-gold-400 shadow-lg scale-105'
                : 'bg-noir-900 text-neutral-300 border-gold-600/20 hover:border-gold-500/40 hover:text-gold-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-noir-900 border border-gold-600/20 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gold-500" />
          <input
            type="text"
            placeholder="Search catalog by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-noir-950 border border-gold-600/20 rounded-xl py-2.5 pl-10 pr-8 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Button Trigger (< 768px) */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="w-full md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-600/10 border border-gold-500/30 text-gold-300 text-xs uppercase font-bold tracking-wider"
        >
          <SlidersHorizontal className="w-4 h-4 text-gold-400" />
          <span>Filter & Sort Options</span>
        </button>

        {/* Desktop Filters (>= 768px) */}
        <div className="hidden md:flex flex-wrap items-center gap-6">
          {/* Price Range Filter */}
          <div className="flex items-center gap-3 text-xs text-neutral-300">
            <span>Max Price:</span>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="accent-gold-500 cursor-pointer w-36"
            />
            <span className="font-mono text-gold-400 font-semibold">${priceMax.toLocaleString()}</span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-noir-950 border border-gold-600/20 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Product Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-noir-900 rounded-3xl border border-gold-600/15 space-y-4">
          <div className="w-16 h-16 rounded-full bg-noir-950 border border-gold-600/20 flex items-center justify-center mx-auto text-gold-500">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl text-neutral-200">No items match your criteria</h3>
          <p className="text-xs text-neutral-400">
            Try adjusting your category filter, price slider, or search terms.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setPriceMax(5000);
            }}
            className="gold-shimmer-btn px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-noir-900 border border-gold-600/15 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all flex flex-col justify-between shadow-xl"
            >
              {/* Product Image */}
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

                {/* Quick Action Buttons */}
                <div className="absolute inset-0 bg-noir-950/40 opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
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
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gold-400 font-semibold">
                  <span>{product.category}</span>
                  <span className="text-neutral-500">ID: {product.id}</span>
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="font-serif text-lg text-neutral-100 font-medium hover:text-gold-300 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-xs text-neutral-400 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-lg text-gold-400 font-medium">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                    className="px-3 py-1.5 rounded-lg bg-gold-600/10 border border-gold-500/30 text-gold-300 hover:bg-gold-500/20 text-xs uppercase tracking-wider font-semibold flex items-center gap-1 transition-all"
                  >
                    <span>+ Add</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Mobile Slide-Up Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-noir-950/80 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 bg-noir-900 border-t border-gold-600/30 rounded-t-3xl p-6 space-y-6 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center border-b border-gold-600/20 pb-3">
              <h3 className="font-serif text-lg text-neutral-100 font-medium">Filter & Sort Options</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-neutral-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-2">Maximum Price</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="accent-gold-500 flex-1"
                  />
                  <span className="font-mono text-gold-400 font-bold text-sm">${priceMax.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-2">Sort Order</label>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/30 rounded-xl p-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full gold-shimmer-btn py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest shadow-xl"
            >
              Apply Filters ({filteredProducts.length} Items)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gold-400 font-serif">Loading Atelier Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
