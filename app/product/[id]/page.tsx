'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Sparkles, ShoppingBag, Scissors, ArrowLeft, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, setQuickViewProduct } = useApp();

  const productId = params?.id as string;
  const product = products.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl text-neutral-200">Garment Not Found</h2>
        <p className="text-xs text-neutral-400">
          The requested haute couture piece could not be located in our active catalog.
        </p>
        <Link
          href="/shop"
          className="inline-block gold-shimmer-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const activeImage = selectedImage || product.image;
  const activeSize = selectedSize || product.sizes[0];
  const activeColor = selectedColor || product.colors[0];

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, activeSize, activeColor, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-gold-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Collections</span>
      </button>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-noir-900 border border-gold-600/20 relative">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNewArrival && (
              <span className="absolute top-4 left-4 bg-gold-600 text-noir-950 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                New Arrival
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border transition-all shrink-0 ${
                    activeImage === img ? 'border-gold-400 scale-105 shadow-lg' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Specs & Actions */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{product.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light tracking-wide leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mt-4">
              <span className="text-3xl font-serif text-gold-400 font-medium">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-base text-neutral-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light border-y border-gold-600/15 py-4">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-medium text-neutral-300">
              <span>Select Size</span>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-gold-400 hover:text-gold-200 underline text-[11px]"
              >
                Size & Measurement Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                    activeSize === sz
                      ? 'bg-gold-500 text-noir-950 border-gold-400 shadow-md scale-105'
                      : 'bg-noir-900 text-neutral-300 border-neutral-800 hover:border-gold-500/40'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <span className="block text-xs font-medium text-neutral-300">Select Color Palette</span>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border flex items-center gap-2 ${
                    activeColor === c
                      ? 'bg-noir-900 text-gold-300 border-gold-500 shadow-sm'
                      : 'bg-noir-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {activeColor === c && <Check className="w-3.5 h-3.5 text-gold-400" />}
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-4 pt-4 border-t border-gold-600/15">
            <div className="flex gap-4">
              <button
                onClick={handleAdd}
                className="flex-1 gold-shimmer-btn py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <Link
                href="/custom-order"
                className="px-6 py-4 rounded-xl bg-noir-900 border border-gold-600/40 text-gold-300 text-xs uppercase tracking-widest font-semibold hover:bg-gold-500/10 transition-colors flex items-center gap-2"
                title="Request Bespoke Fitting"
              >
                <Scissors className="w-4 h-4 text-gold-400" />
                <span className="hidden sm:inline">Bespoke Fit</span>
              </Link>
            </div>

            {/* Guarantees list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Express Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Authentic Atelier Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Complimentary Fits & Returns</span>
              </div>
            </div>
          </div>

          {/* Fabric Details & Care Instructions */}
          {(product.fabricDetails || product.careInstructions) && (
            <div className="space-y-3 pt-6 border-t border-gold-600/15">
              {product.fabricDetails && (
                <div className="p-4 rounded-xl bg-noir-900 border border-gold-600/15 text-xs">
                  <h4 className="text-gold-300 font-semibold mb-1">Fabric & Composition</h4>
                  <p className="text-neutral-400 leading-relaxed">{product.fabricDetails}</p>
                </div>
              )}
              {product.careInstructions && (
                <div className="p-4 rounded-xl bg-noir-900 border border-gold-600/15 text-xs">
                  <h4 className="text-gold-300 font-semibold mb-1">Atelier Maintenance & Care</h4>
                  <p className="text-neutral-400 leading-relaxed">{product.careInstructions}</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-noir-950/80 backdrop-blur-sm" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-noir-900 border border-gold-600/30 rounded-2xl max-w-lg w-full p-6 space-y-4 z-10">
            <div className="flex justify-between items-center border-b border-gold-600/20 pb-3">
              <h3 className="font-serif text-lg text-neutral-100">Atelier Sizing Standard</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-neutral-400 hover:text-white">✕</button>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gold-600/20 text-gold-400">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust (in)</th>
                    <th className="py-2">Waist (in)</th>
                    <th className="py-2">Hips (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  <tr><td className="py-2 font-semibold">XS</td><td>31 - 32</td><td>24 - 25</td><td>34 - 35</td></tr>
                  <tr><td className="py-2 font-semibold">S</td><td>33 - 34</td><td>26 - 27</td><td>36 - 37</td></tr>
                  <tr><td className="py-2 font-semibold">M</td><td>35 - 36</td><td>28 - 29</td><td>38 - 39</td></tr>
                  <tr><td className="py-2 font-semibold">L</td><td>37 - 39</td><td>30 - 32</td><td>40 - 42</td></tr>
                  <tr><td className="py-2 font-semibold text-gold-400">Bespoke</td><td colSpan={3} className="text-gold-300">Custom measurements taken via our Custom Order form</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 pt-12 border-t border-gold-600/15">
          <h2 className="font-serif text-2xl text-neutral-100 font-light">Complete The Look</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-noir-900 border border-gold-600/15 rounded-xl overflow-hidden hover:border-gold-500/40 transition-all p-4 space-y-3"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-neutral-100 font-medium">{rel.name}</h4>
                  <p className="text-xs text-gold-400 font-semibold mt-1">${rel.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => setQuickViewProduct(rel)}
                  className="w-full py-2 bg-noir-950 border border-gold-600/20 text-xs text-neutral-300 rounded-lg hover:border-gold-500"
                >
                  Quick View
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
