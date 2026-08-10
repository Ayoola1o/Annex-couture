'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { X, Star, ShoppingBag, Sparkles, Check, Scissors } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  const activeImage = selectedImage || quickViewProduct.image;
  const activeSize = selectedSize || quickViewProduct.sizes[0];
  const activeColor = selectedColor || quickViewProduct.colors[0];

  const handleAdd = () => {
    addToCart(quickViewProduct, activeSize, activeColor, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-noir-950/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative bg-noir-900 border border-gold-600/30 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-slide-up">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-noir-950/60 rounded-full border border-gold-600/20 backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Showcase */}
        <div className="p-6 bg-noir-950 flex flex-col justify-between">
          <div className="aspect-[3/4] w-full rounded-xl overflow-hidden relative bg-noir-900 border border-gold-600/10">
            <img
              src={activeImage}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.isNewArrival && (
              <span className="absolute top-3 left-3 bg-gold-600 text-noir-950 font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-16 rounded-lg overflow-hidden border transition-all shrink-0 ${
                    activeImage === img ? 'border-gold-400 scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Selectors */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{quickViewProduct.category}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light tracking-wide">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-serif text-gold-400 font-medium">
                ${quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  ${quickViewProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-300 mt-4 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {quickViewProduct.fabricDetails && (
              <div className="mt-4 p-3 rounded-lg bg-noir-950/60 border border-gold-600/10 text-[11px] text-neutral-400">
                <span className="text-gold-300 font-semibold block mb-0.5">Atelier Fabric Notes:</span>
                {quickViewProduct.fabricDetails}
              </div>
            )}

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs text-neutral-300 mb-2 font-medium">
                <span>Select Size</span>
                <span className="text-gold-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Scissors className="w-3 h-3" /> Atelier Fitted
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      activeSize === sz
                        ? 'bg-gold-500 text-noir-950 border-gold-400 shadow-md scale-105'
                        : 'bg-noir-950 text-neutral-300 border-neutral-800 hover:border-gold-500/40'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-5">
              <span className="block text-xs text-neutral-300 mb-2 font-medium">Select Color</span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                      activeColor === c
                        ? 'bg-noir-950 text-gold-300 border-gold-500'
                        : 'bg-noir-950 text-neutral-400 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {activeColor === c && <Check className="w-3 h-3 text-gold-400" />}
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gold-600/15 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 gold-shimmer-btn py-3 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
