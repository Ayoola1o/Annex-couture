'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Package, ShoppingCart, Scissors, DollarSign, TrendingUp, AlertTriangle, ArrowUpRight, Crown, Plus, BarChart3, PieChart, Layers, Tag } from 'lucide-react';

export default function AdminDashboardPage() {
  const { products, orders, bespokeRequests, settings, categories } = useApp();

  // Financial Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const catalogInventoryWorth = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const pendingBespoke = bespokeRequests.filter((b) => b.status === 'Inquiry');

  // Revenue Breakdown by Category
  const categoryRevenueStats = categories.map((cat) => {
    const catProducts = products.filter((p) => p.category === cat);
    const catInventoryVal = catProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
    
    // Revenue from orders matching this category
    const catOrderRevenue = orders.reduce((total, order) => {
      const orderCatTotal = order.items.reduce((itemSum, item) => {
        const prod = products.find((p) => p.id === item.productId);
        if (prod && prod.category === cat) {
          return itemSum + item.price * item.quantity;
        }
        return itemSum;
      }, 0);
      return total + orderCatTotal;
    }, 0);

    return {
      category: cat,
      productCount: catProducts.length,
      inventoryWorth: catInventoryVal,
      orderRevenue: catOrderRevenue,
    };
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner Overview */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-noir-900 via-gold-950/20 to-noir-900 border border-gold-600/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <Crown className="w-4 h-4" />
            <span>Brand Atelier Dashboard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-100 font-light gold-gradient-text">
            {settings.companyName || 'ANNEX'} Atelier Command Center
          </h1>
          <p className="text-xs text-neutral-400 max-w-lg">
            Real-time financial sales monitoring, product catalog inventory valuation, order processing, and storefront banners manager.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="gold-shimmer-btn px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/settings"
            className="px-5 py-3 rounded-xl bg-noir-950 border border-gold-600/30 text-gold-300 text-xs uppercase font-semibold hover:bg-gold-500/10 transition-colors"
          >
            <span>Banners & Settings</span>
          </Link>
        </div>
      </div>

      {/* Analytics KPI Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: Total Revenue Worth */}
        <div className="p-6 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-center text-gold-400">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Total Sales Volume</span>
            <div className="w-9 h-9 rounded-xl bg-gold-600/15 border border-gold-500/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl text-neutral-100 font-medium">${totalRevenue.toLocaleString()}</p>
          <span className="text-[11px] text-gold-400 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5" /> Real-time order calculation
          </span>
        </div>

        {/* Metric 2: Catalog Inventory Total Worth */}
        <div className="p-6 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-3">
          <div className="flex justify-between items-center text-gold-400">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Catalog Retail Value</span>
            <div className="w-9 h-9 rounded-xl bg-gold-600/15 border border-gold-500/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl text-neutral-100 font-medium">${catalogInventoryWorth.toLocaleString()}</p>
          <span className="text-[11px] text-neutral-400 font-mono">
            In-stock retail inventory valuation
          </span>
        </div>

        {/* Metric 3: Average Order Value (AOV) */}
        <div className="p-6 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-3">
          <div className="flex justify-between items-center text-gold-400">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Avg Order Value (AOV)</span>
            <div className="w-9 h-9 rounded-xl bg-gold-600/15 border border-gold-500/30 flex items-center justify-center">
              <PieChart className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl text-neutral-100 font-medium">${Math.round(averageOrderValue).toLocaleString()}</p>
          <span className="text-[11px] text-neutral-400 font-mono">
            {orders.length} order(s) total ({pendingOrders.length} pending)
          </span>
        </div>

        {/* Metric 4: Bespoke Requests */}
        <div className="p-6 rounded-2xl bg-noir-900 border border-gold-600/20 space-y-3">
          <div className="flex justify-between items-center text-gold-400">
            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Bespoke Fitting Enquiries</span>
            <div className="w-9 h-9 rounded-xl bg-gold-600/15 border border-gold-500/30 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
          </div>
          <p className="font-serif text-3xl text-neutral-100 font-medium">{bespokeRequests.length}</p>
          <span className="text-[11px] text-gold-300 font-mono">
            {pendingBespoke.length} consultation(s) waiting
          </span>
        </div>

      </div>

      {/* Real-time Category Revenue & Inventory Valuation Breakdown Card */}
      <div className="p-6 rounded-3xl bg-noir-900 border border-gold-600/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-600/15 pb-4">
          <div>
            <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-400" />
              <span>Real-Time Collection Financial Breakdown</span>
            </h3>
            <p className="text-xs text-neutral-400">Retail valuation and sales breakdown grouped by collection category tags.</p>
          </div>

          <Link
            href="/admin/settings"
            className="text-xs text-gold-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Manage Category Tags</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryRevenueStats.map((stat) => (
            <div key={stat.category} className="p-4 rounded-2xl bg-noir-950 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-200">{stat.category}</span>
                <span className="text-[10px] font-mono text-gold-400 bg-gold-600/10 border border-gold-500/20 px-2 py-0.5 rounded-full">
                  {stat.productCount} item{stat.productCount !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="pt-1 flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">Inventory Worth</span>
                  <span className="font-serif text-lg text-neutral-100 font-medium">
                    ${stat.inventoryWorth.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-500 block uppercase">Sales Volume</span>
                  <span className="font-mono text-xs text-gold-400 font-bold">
                    ${stat.orderRevenue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Inventory Alert */}
      {lowStockProducts.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="font-semibold block">Inventory Alert: Low Stock Warning</strong>
              <span>
                {lowStockProducts.length} item(s) have 5 or fewer units remaining in stock ({lowStockProducts.map((p) => p.name).join(', ')}).
              </span>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-300 font-bold uppercase tracking-wider text-[10px] hover:bg-amber-500/30 shrink-0"
          >
            Update Stock
          </Link>
        </div>
      )}

      {/* Grid: Recent Orders & Quick Product List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Orders List */}
        <div className="p-6 rounded-3xl bg-noir-900 border border-gold-600/20 space-y-4">
          <div className="flex justify-between items-center border-b border-gold-600/15 pb-3">
            <h3 className="font-serif text-lg text-neutral-100 font-medium">Real-Time Customer Orders Feed</h3>
            <Link href="/admin/orders" className="text-xs text-gold-400 hover:underline flex items-center gap-1">
              <span>View All ({orders.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-neutral-500 py-6 text-center">No orders recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-noir-950 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gold-400 font-bold">{order.id}</span>
                      <span className="text-neutral-300 font-semibold">{order.customerName}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {order.items.length} item(s) • Total ${order.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Catalog Preview */}
        <div className="p-6 rounded-3xl bg-noir-900 border border-gold-600/20 space-y-4">
          <div className="flex justify-between items-center border-b border-gold-600/15 pb-3">
            <h3 className="font-serif text-lg text-neutral-100 font-medium">Live Catalog Valuation Summary</h3>
            <Link href="/admin/products" className="text-xs text-gold-400 hover:underline flex items-center gap-1">
              <span>Manage Products ({products.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 5).map((prod) => (
              <div
                key={prod.id}
                className="p-3 rounded-xl bg-noir-950 border border-white/5 flex items-center gap-3 text-xs"
              >
                <img src={prod.image} alt={prod.name} className="w-10 h-12 rounded-lg object-cover bg-noir-900" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-neutral-200 truncate font-medium">{prod.name}</h4>
                  <p className="text-[11px] text-gold-400 font-mono">${prod.price.toLocaleString()} • Category: {prod.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-neutral-400 block font-mono">Stock: {prod.stock}</span>
                  <span className="text-[10px] text-gold-400 font-mono">Worth: ${(prod.price * prod.stock).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
