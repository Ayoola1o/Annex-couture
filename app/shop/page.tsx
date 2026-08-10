'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ProductCategory, Product } from '@/lib/types';
import { Search, SlidersHorizontal, Eye, ShoppingBag, Filter, X, ChevronDown, Check, ChevronLeft, ChevronRight } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { products, setQuickViewProduct, addToCart, categories: storeCategories } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 12;

  // Sync category or search query from URL params on load
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, priceMax, sortBy]);

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            placeholder="Search catalog by keyword or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-noir-950 border border-gold-600/20 rounded-xl py-2 pl-10 pr-4 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Controls Desktop */}
        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-300">
          
          {/* Price Range Slider */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-medium">Max Price:</span>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="accent-gold-500 w-32 cursor-pointer"
            />
            <span className="font-mono text-gold-400 font-bold">${priceMax.toLocaleString()}</span>
          </div>

          {/* Sort Select Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-noir-950 border border-gold-600/20 rounded-xl px-3 py-1.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <span className="text-neutral-500 font-mono">
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Mobile Filter Button */}
        <div className="flex md:hidden items-center justify-between w-full text-xs">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="px-4 py-2 rounded-xl bg-noir-950 border border-gold-600/30 text-gold-400 font-semibold flex items-center gap-2"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter & Sort (${priceMax.toLocaleString()})</span>
          </button>

          <span className="text-neutral-400 font-mono">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

      </div>

      {/* Product Catalog Grid (Paginated 12 per page) */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-noir-900 border border-gold-600/20 space-y-4">
          <p className="font-serif text-lg text-neutral-300">No products match your active search filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setPriceMax(5000);
            }}
            className="px-6 py-2.5 rounded-xl bg-gold-600/10 border border-gold-500/30 text-gold-300 text-xs font-semibold hover:bg-gold-500/20 uppercase tracking-wider"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-3xl bg-noir-900 border border-gold-600/20 overflow-hidden hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-noir-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNewArrival && (
                      <span className="px-2.5 py-1 rounded-full bg-gold-500 text-noir-950 font-bold text-[9px] uppercase tracking-wider shadow-md">
                        New Arrival
                      </span>
                    )}
                    {product.isFeatured && (
                      <span className="px-2.5 py-1 rounded-full bg-noir-950/80 border border-gold-500/40 text-gold-300 font-semibold text-[9px] uppercase tracking-wider backdrop-blur-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Quick Action Overlay Buttons */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 py-2.5 rounded-xl bg-noir-950/90 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md hover:bg-gold-500 hover:text-noir-950 transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                    <button
                      onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                      className="p-2.5 rounded-xl bg-gold-500 text-noir-950 hover:bg-gold-400 transition-colors shadow-lg"
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
                    <span className="text-neutral-500 font-mono">ID: {product.id}</span>
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

          {/* Luxury Pagination Controls (12 Items Per Page limit) */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gold-600/15">
              <span className="text-xs text-neutral-400 font-mono">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} – {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} items
              </span>

              <div className="flex items-center gap-2">
                {/* Prev Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-noir-900 border border-gold-600/20 text-xs text-gold-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-500/10 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                {/* Numbered Page Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border ${
                      currentPage === pageNum
                        ? 'bg-gold-500 text-noir-950 border-gold-400 shadow-lg scale-105'
                        : 'bg-noir-900 text-neutral-300 border-gold-600/20 hover:border-gold-500/40 hover:text-gold-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-noir-900 border border-gold-600/20 text-xs text-gold-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-500/10 flex items-center gap-1 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

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
