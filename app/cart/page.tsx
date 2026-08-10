'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, createOrder } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'crypto'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const freeShippingThreshold = 1000;
  const shippingFee = cartTotal >= freeShippingThreshold ? 0 : 50;
  const finalTotal = cartTotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder({
        customerName,
        customerEmail,
        phone,
        shippingAddress,
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: finalTotal,
        status: 'Pending',
        orderType: 'Standard',
      });

      setCompletedOrderId(order.id);
      setIsSubmitting(false);
    }, 1200);
  };

  // Order Confirmation State
  if (completedOrderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold-600/20 border border-gold-500/40 text-gold-400 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold">
            Order Confirmed & Placed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-100">
            Thank You For Your Order
          </h1>
          <p className="text-sm text-neutral-300">
            Order Reference Number: <strong className="text-gold-400 font-mono text-base">{completedOrderId}</strong>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-noir-900 border border-gold-600/20 text-xs text-neutral-300 max-w-lg mx-auto text-left space-y-3">
          <p>
            An email confirmation with full dispatch tracking has been dispatched to <strong>{customerEmail}</strong>.
          </p>
          <p className="text-neutral-400">
            Our atelier concierge will verify your order specifications before hand-packing your items.
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/shop"
            className="gold-shimmer-btn px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest"
          >
            Continue Shopping
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3.5 rounded-xl bg-noir-900 border border-gold-600/30 text-gold-300 text-xs uppercase font-semibold hover:bg-gold-500/10"
          >
            View in Brand Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">Checkout</span>
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-100 font-light gold-gradient-text">
          Your Shopping Bag
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-noir-900 rounded-3xl border border-gold-600/15 max-w-xl mx-auto space-y-4">
          <ShoppingBag className="w-12 h-12 text-gold-500/50 mx-auto" />
          <h2 className="font-serif text-xl text-neutral-200">Your bag is currently empty</h2>
          <p className="text-xs text-neutral-400">Add luxury garments from our shop to initiate checkout.</p>
          <Link
            href="/shop"
            className="inline-block gold-shimmer-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif text-xl text-neutral-100 font-light pb-2 border-b border-gold-600/15">
              Garments in Bag ({cart.length})
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-noir-900 border border-gold-600/15 flex gap-4 items-center justify-between"
              >
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-noir-950 shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-serif text-base text-neutral-100 font-medium">{item.product.name}</h3>
                  <p className="text-xs text-neutral-400">
                    Size: <span className="text-gold-300">{item.selectedSize}</span> | Color: <span className="text-gold-300">{item.selectedColor}</span>
                  </p>
                  <p className="text-xs font-semibold text-gold-400">${item.product.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gold-600/20 rounded-lg bg-noir-950">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-neutral-400 hover:text-gold-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-medium text-neutral-200">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-neutral-400 hover:text-gold-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-neutral-500 hover:text-red-400"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Customer Shipping & Order Form */}
          <div className="lg:col-span-5 bg-noir-900 border border-gold-600/20 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-xl text-neutral-100 font-light pb-2 border-b border-gold-600/15">
              Client & Dispatch Information
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Vivienne Smith"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="vivienne@domain.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Full street address, city, postal code, country..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">Payment Option</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-gold-500 text-noir-950 border-gold-400'
                        : 'bg-noir-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      paymentMethod === 'wire'
                        ? 'bg-gold-500 text-noir-950 border-gold-400'
                        : 'bg-noir-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    Bank Wire
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      paymentMethod === 'crypto'
                        ? 'bg-gold-500 text-noir-950 border-gold-400'
                        : 'bg-noir-950 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    Crypto Wire
                  </button>
                </div>
              </div>

              {/* Order Total Breakdown */}
              <div className="space-y-2 pt-4 border-t border-gold-600/15 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-neutral-200 font-medium">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-gold-400 font-medium">{shippingFee === 0 ? 'FREE' : '$50'}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-100 font-semibold pt-2 border-t border-white/5">
                  <span>Total Amount</span>
                  <span className="text-gold-400 font-serif text-xl">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-shimmer-btn py-3.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-xl"
              >
                {isSubmitting ? (
                  <span>Processing Atelier Order...</span>
                ) : (
                  <>
                    <span>Place Order (${finalTotal.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-neutral-500 pt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                <span>Orders immediately sync to Annex Brand Admin</span>
              </p>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
