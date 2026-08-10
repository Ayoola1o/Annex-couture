'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ShoppingCart, Scissors, Filter, CheckCircle, Clock, Truck, Calendar, MapPin, Mail, Phone, Ruler } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, bespokeRequests, updateBespokeStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'bespoke'>('orders');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = orders.filter((o) => statusFilter === 'All' || o.status === statusFilter);
  const filteredBespoke = bespokeRequests.filter((b) => statusFilter === 'All' || b.status === statusFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-600/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light gold-gradient-text">
            Orders & Bespoke Request Tracker
          </h1>
          <p className="text-xs text-neutral-400">
            View customer purchases, dispatch status, shipping addresses, and bespoke tailoring fitting inquiries.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-noir-900 border border-gold-600/20">
          <button
            onClick={() => {
              setActiveTab('orders');
              setStatusFilter('All');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'orders' ? 'bg-gold-500 text-noir-950 shadow-md' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Store Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('bespoke');
              setStatusFilter('All');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'bespoke' ? 'bg-gold-500 text-noir-950 shadow-md' : 'text-neutral-300 hover:text-white'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Bespoke Fitting ({bespokeRequests.length})</span>
          </button>
        </div>
      </div>

      {/* Orders List View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-neutral-400 font-medium mr-2">Status Filter:</span>
            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border ${
                  statusFilter === st
                    ? 'bg-gold-500 text-noir-950 border-gold-400'
                    : 'bg-noir-900 text-neutral-400 border-neutral-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-noir-900 rounded-3xl border border-gold-600/15 text-neutral-500 text-xs">
                No store orders recorded under status "{statusFilter}".
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-3xl bg-noir-900 border border-gold-600/20 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gold-600/15 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-gold-400 font-bold text-base">{order.id}</span>
                        <span className="text-neutral-100 font-serif text-lg font-medium">{order.customerName}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400 font-medium">Order Status:</span>
                      <select
                        value={order.status}
                        onChange={(e: any) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-noir-950 border border-gold-600/30 rounded-xl px-3 py-1.5 text-xs text-gold-300 font-semibold focus:outline-none focus:border-gold-400 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Info & Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    
                    {/* Delivery Info */}
                    <div className="p-4 rounded-2xl bg-noir-950 border border-white/5 space-y-2">
                      <h4 className="text-gold-400 font-semibold uppercase tracking-wider text-[10px]">Client Shipping Contact</h4>
                      <p className="text-neutral-200 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gold-500" /> {order.customerEmail}</p>
                      <p className="text-neutral-200 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gold-500" /> {order.phone}</p>
                      <p className="text-neutral-300 flex items-start gap-2 pt-1 border-t border-white/5"><MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" /> {order.shippingAddress}</p>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 rounded-2xl bg-noir-950 border border-white/5 space-y-2">
                      <h4 className="text-gold-400 font-semibold uppercase tracking-wider text-[10px]">Purchased Garments</h4>
                      <div className="space-y-1.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-neutral-300">
                            <span>{item.quantity}x {item.productName} ({item.size} / {item.color})</span>
                            <span className="font-mono text-gold-400">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-white/5 flex justify-between font-serif text-sm font-semibold text-neutral-100">
                        <span>Total Paid Amount</span>
                        <span className="text-gold-400">${order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Bespoke Requests List View */}
      {activeTab === 'bespoke' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-neutral-400 font-medium mr-2">Status Filter:</span>
            {['All', 'Inquiry', 'Consultation Scheduled', 'In Production', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors border ${
                  statusFilter === st
                    ? 'bg-gold-500 text-noir-950 border-gold-400'
                    : 'bg-noir-900 text-neutral-400 border-neutral-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredBespoke.length === 0 ? (
              <div className="text-center py-16 bg-noir-900 rounded-3xl border border-gold-600/15 text-neutral-500 text-xs">
                No bespoke fitting requests recorded.
              </div>
            ) : (
              filteredBespoke.map((req) => (
                <div
                  key={req.id}
                  className="p-6 rounded-3xl bg-noir-900 border border-gold-600/20 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gold-600/15 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-gold-400 font-bold text-base">{req.id}</span>
                        <span className="text-neutral-100 font-serif text-lg font-medium">{req.clientName}</span>
                      </div>
                      <p className="text-[11px] text-gold-300 font-semibold mt-0.5">
                        Garment Request: {req.garmentType}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400 font-medium">Bespoke Status:</span>
                      <select
                        value={req.status}
                        onChange={(e: any) => updateBespokeStatus(req.id, e.target.value)}
                        className="bg-noir-950 border border-gold-600/30 rounded-xl px-3 py-1.5 text-xs text-gold-300 font-semibold focus:outline-none focus:border-gold-400 cursor-pointer"
                      >
                        <option value="Inquiry">Inquiry</option>
                        <option value="Consultation Scheduled">Consultation Scheduled</option>
                        <option value="In Production">In Production</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    
                    {/* Measurements & Notes */}
                    <div className="p-4 rounded-2xl bg-noir-950 border border-white/5 space-y-2">
                      <h4 className="text-gold-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5" /> Client Body Metrics & Target Date
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-neutral-300">
                        <div>Bust: <span className="text-gold-300 font-semibold">{req.bust || 'N/A'}</span></div>
                        <div>Waist: <span className="text-gold-300 font-semibold">{req.waist || 'N/A'}</span></div>
                        <div>Hips: <span className="text-gold-300 font-semibold">{req.hips || 'N/A'}</span></div>
                        <div>Height: <span className="text-gold-300 font-semibold">{req.height || 'N/A'}</span></div>
                      </div>
                      {req.eventDate && (
                        <p className="text-neutral-300 pt-1 border-t border-white/5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold-400" /> Event Date: <strong className="text-gold-300">{req.eventDate}</strong>
                        </p>
                      )}
                    </div>

                    {/* Fabric & Contact */}
                    <div className="p-4 rounded-2xl bg-noir-950 border border-white/5 space-y-2">
                      <h4 className="text-gold-400 font-semibold uppercase tracking-wider text-[10px]">Client Contact & Fabric Notes</h4>
                      <p className="text-neutral-200 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gold-500" /> {req.email}</p>
                      <p className="text-neutral-200 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gold-500" /> {req.phone}</p>
                      {req.notes && <p className="text-neutral-400 italic pt-1 border-t border-white/5">"{req.notes}"</p>}
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}
