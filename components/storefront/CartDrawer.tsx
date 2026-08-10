'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, cartTotal } = useApp();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1000;
  const progressPercentage = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-noir-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-noir-900 border-l border-gold-600/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-gold-600/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif text-lg tracking-wider text-neutral-100 uppercase">
                Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-noir-950/60 px-6 py-3 border-b border-gold-600/10">
            <div className="flex justify-between text-xs text-neutral-300 mb-1.5 font-medium">
              <span>
                {cartTotal >= freeShippingThreshold ? (
                  <span className="text-gold-400 font-semibold">🎉 You unlocked Complimentary Express Shipping!</span>
                ) : (
                  <span>Add <strong className="text-gold-300">${remainingForFreeShipping.toLocaleString()}</strong> for Complimentary Express Shipping</span>
                )}
              </span>
            </div>
            <div className="w-full bg-noir-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-gold-600 to-gold-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-noir-800 border border-gold-600/20 flex items-center justify-center mx-auto text-gold-500/60">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-neutral-300">Your bag is currently empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our Haute Couture and Ready to Wear creations to begin styling.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 inline-block gold-shimmer-btn px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-noir-950/40 rounded-xl border border-gold-600/10 hover:border-gold-600/20 transition-all"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden relative shrink-0 bg-noir-800">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Specs & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm text-neutral-100 font-medium line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Size: <span className="text-gold-300">{item.selectedSize}</span> | Color: <span className="text-gold-300">{item.selectedColor}</span>
                      </p>
                      <p className="text-xs font-semibold text-gold-400 mt-1">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gold-600/20 rounded-lg bg-noir-900">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-gold-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-neutral-200">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-gold-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gold-600/15 bg-noir-950/90 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-200 font-medium">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Shipping</span>
                  <span className="text-gold-400 font-medium">
                    {cartTotal >= freeShippingThreshold ? 'FREE' : '$50'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-neutral-100 font-semibold pt-2 border-t border-white/5">
                  <span>Total</span>
                  <span className="text-gold-400 font-serif text-lg">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 gold-shimmer-btn py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-noir-950 transition-all shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                  <span>Encrypted 256-Bit Atelier Checkout</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
