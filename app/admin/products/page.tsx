'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Product, ProductCategory } from '@/lib/types';
import { Package, Plus, Search, Edit, Trash2, Star, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: ProductCategory;
    sizes: string;
    colors: string;
    image: string;
    stock: number;
    isFeatured: boolean;
    isNewArrival: boolean;
    fabricDetails: string;
    careInstructions: string;
  }>({
    name: '',
    description: '',
    price: 950,
    originalPrice: undefined,
    category: 'Ready to Wear',
    sizes: 'XS, S, M, L, Bespoke Custom',
    colors: 'Obsidian Black, Gold',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    stock: 10,
    isFeatured: true,
    isNewArrival: true,
    fabricDetails: '100% Mulberry Silk, Structured Boning',
    careInstructions: 'Specialist Dry Clean Only'
  });

  const categories = ['All', 'Haute Couture', 'Ready to Wear', 'Evening Gowns', 'Tailored Suits', 'Luxury Accessories'];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 950,
      originalPrice: undefined,
      category: 'Ready to Wear',
      sizes: 'XS, S, M, L, Bespoke Custom',
      colors: 'Obsidian Black, Gold',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      stock: 10,
      isFeatured: true,
      isNewArrival: true,
      fabricDetails: '100% Mulberry Silk, Structured Boning',
      careInstructions: 'Specialist Dry Clean Only'
    });
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      originalPrice: prod.originalPrice,
      category: prod.category,
      sizes: prod.sizes.join(', '),
      colors: prod.colors.join(', '),
      image: prod.image,
      stock: prod.stock,
      isFeatured: prod.isFeatured,
      isNewArrival: prod.isNewArrival,
      fabricDetails: prod.fabricDetails || '',
      careInstructions: prod.careInstructions || ''
    });
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = formData.sizes.split(',').map((s) => s.trim()).filter(Boolean);
    const colorsArray = formData.colors.split(',').map((c) => c.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        sizes: sizesArray,
        colors: colorsArray,
        image: formData.image,
        gallery: [formData.image],
        stock: Number(formData.stock),
        isFeatured: formData.isFeatured,
        isNewArrival: formData.isNewArrival,
        fabricDetails: formData.fabricDetails,
        careInstructions: formData.careInstructions
      });
    } else {
      addProduct({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        sizes: sizesArray,
        colors: colorsArray,
        image: formData.image,
        gallery: [formData.image],
        stock: Number(formData.stock),
        isFeatured: formData.isFeatured,
        isNewArrival: formData.isNewArrival,
        fabricDetails: formData.fabricDetails,
        careInstructions: formData.careInstructions
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-600/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light gold-gradient-text">
            Product Catalog Manager
          </h1>
          <p className="text-xs text-neutral-400">
            Populate apparel items, adjust pricing, manage inventory stock, and set homepage featured pieces.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="gold-shimmer-btn px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-noir-900 border border-gold-600/20 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gold-500" />
          <input
            type="text"
            placeholder="Search by product name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-noir-950 border border-gold-600/20 rounded-xl py-2 pl-10 pr-4 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-noir-950 border-gold-400'
                  : 'bg-noir-950 text-neutral-400 border-neutral-800 hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table List of Products */}
      <div className="bg-noir-900 border border-gold-600/20 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gold-600/20 bg-noir-950/80 text-gold-400 uppercase tracking-wider">
                <th className="p-4">Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status Flags</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-neutral-500">
                    No products found in catalog matching your filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Item thumbnail & name */}
                    <td className="p-4 flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-14 rounded-lg object-cover bg-noir-950 border border-white/10 shrink-0" />
                      <div>
                        <span className="font-serif text-sm text-neutral-100 font-medium block">{prod.name}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">ID: {prod.id}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 font-medium text-neutral-300">{prod.category}</td>

                    {/* Price */}
                    <td className="p-4 font-serif text-sm text-gold-400 font-semibold">
                      ${prod.price.toLocaleString()}
                    </td>

                    {/* Stock Counter with inline quick adjusters */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateProduct(prod.id, { stock: Math.max(0, prod.stock - 1) })}
                          className="px-2 py-0.5 rounded bg-noir-950 border border-neutral-800 text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className={`font-mono font-bold ${prod.stock <= 5 ? 'text-amber-400' : 'text-neutral-200'}`}>
                          {prod.stock}
                        </span>
                        <button
                          onClick={() => updateProduct(prod.id, { stock: prod.stock + 1 })}
                          className="px-2 py-0.5 rounded bg-noir-950 border border-neutral-800 text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Flags */}
                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => updateProduct(prod.id, { isFeatured: !prod.isFeatured })}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          prod.isFeatured ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' : 'bg-noir-950 text-neutral-500 border border-neutral-800'
                        }`}
                      >
                        {prod.isFeatured ? '★ Featured' : 'Normal'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-2 bg-noir-950 border border-gold-600/20 text-gold-300 hover:bg-gold-500/20 rounded-lg transition-colors"
                        title="Edit Product Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${prod.name}" from catalog?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-2 bg-noir-950 border border-red-500/20 text-red-400 hover:bg-red-950 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-noir-950/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          
          <div className="relative bg-noir-900 border border-gold-600/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 z-10 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center border-b border-gold-600/20 pb-4">
              <h2 className="font-serif text-xl text-neutral-100 font-light">
                {editingProduct ? 'Edit Product Details' : 'Populate New Product'}
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-300 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Ruby Silk Gown"
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="Haute Couture">Haute Couture</option>
                    <option value="Ready to Wear">Ready to Wear</option>
                    <option value="Evening Gowns">Evening Gowns</option>
                    <option value="Tailored Suits">Tailored Suits</option>
                    <option value="Luxury Accessories">Luxury Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">High-Res Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Available Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="XS, S, M, L, Bespoke Custom"
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Color Options (comma separated)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Obsidian Black, Gold"
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-300 mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe garment cut, silhouette, train, boning..."
                  className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">Stock Units</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-neutral-100 focus:outline-none focus:border-gold-400 font-mono"
                  />
                </div>

                <div className="flex items-center gap-6 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="accent-gold-500 w-4 h-4 rounded"
                    />
                    <span className="text-neutral-200">Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival}
                      onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                      className="accent-gold-500 w-4 h-4 rounded"
                    />
                    <span className="text-neutral-200">New Arrival Badge</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gold-600/15 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 gold-shimmer-btn py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product to Storefront'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
