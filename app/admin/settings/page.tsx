'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import ImageUploader from '@/components/admin/ImageUploader';
import { ProductCategory, AtelierCategoryCard } from '@/lib/types';
import { INITIAL_ATELIER_CATEGORIES } from '@/lib/data';
import { Sliders, Save, Sparkles, Image as ImageIcon, MapPin, Mail, Phone, Eye, Grid, Plus, Trash2, User, Crown, Tag, Edit2, AlertTriangle, X, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, categories, addCategory, renameCategory, deleteCategory, products } = useApp();

  // Brand Identity State
  const [companyName, setCompanyName] = useState(settings.companyName || 'ANNEX');
  const [companyTagline, setCompanyTagline] = useState(settings.companyTagline || 'COUTURE • PARIS');
  const [brandLogoUrl, setBrandLogoUrl] = useState(settings.brandLogoUrl || '/logo.png');

  // Hero State
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);
  const [heroImageUrl, setHeroImageUrl] = useState(settings.heroImageUrl);
  const [marqueeText, setMarqueeText] = useState(settings.marqueeText);
  const [brandStoryText, setBrandStoryText] = useState(settings.brandStoryText);

  // Founder Bio State
  const [founderName, setFounderName] = useState(settings.founderName || 'Ayoola Adebisi');
  const [founderTitle, setFounderTitle] = useState(settings.founderTitle || 'Founder & Creative Director');
  const [founderBio, setFounderBio] = useState(settings.founderBio || '');
  const [founderPhotoUrl, setFounderPhotoUrl] = useState(settings.founderPhotoUrl || '');

  // Announcement & Contact State
  const [announcementActive, setAnnouncementActive] = useState(settings.announcementActive);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [address, setAddress] = useState(settings.address);

  // Category Cards State
  const [atelierCategories, setAtelierCategories] = useState<AtelierCategoryCard[]>(
    settings.atelierCategories && settings.atelierCategories.length > 0
      ? settings.atelierCategories
      : INITIAL_ATELIER_CATEGORIES
  );

  // Category Management Modal State
  const [newCatInput, setNewCatInput] = useState('');
  const [editingCatName, setEditingCatName] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState('');
  const [deletingCatName, setDeletingCatName] = useState<string | null>(null);
  const [targetReassignCat, setTargetReassignCat] = useState<string>('');

  const handleCategoryChange = (index: number, field: keyof AtelierCategoryCard, value: string) => {
    setAtelierCategories((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddCategoryCard = () => {
    const newCard: AtelierCategoryCard = {
      id: `cat-${Date.now()}`,
      title: 'New Collection Showcase',
      subtitle: 'Luxury Apparel & Accessories',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      category: categories[0] || 'Haute Couture',
    };
    setAtelierCategories([...atelierCategories, newCard]);
  };

  const handleDeleteCategoryCard = (index: number) => {
    if (atelierCategories.length <= 1) {
      alert('You must keep at least 1 category showcase card on the homepage.');
      return;
    }
    if (confirm(`Are you sure you want to delete Card #${index + 1}?`)) {
      setAtelierCategories(atelierCategories.filter((_, i) => i !== index));
    }
  };

  // Add Category Tag
  const handleAddNewCategoryTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;
    addCategory(newCatInput.trim());
    setNewCatInput('');
  };

  // Start Rename Category Tag
  const handleStartRename = (catName: string) => {
    setEditingCatName(catName);
    setRenameInput(catName);
  };

  // Save Rename Category Tag
  const handleSaveRename = (oldName: string) => {
    if (!renameInput.trim()) return;
    renameCategory(oldName, renameInput.trim());
    setEditingCatName(null);
  };

  // Start Delete Category Tag
  const handleStartDelete = (catName: string) => {
    const fallbacks = categories.filter((c) => c !== catName);
    if (fallbacks.length === 0) {
      alert('Cannot delete the only remaining category tag.');
      return;
    }
    setDeletingCatName(catName);
    setTargetReassignCat(fallbacks[0]);
  };

  // Confirm Delete & Safe Reassign
  const handleConfirmDelete = () => {
    if (!deletingCatName || !targetReassignCat) return;
    deleteCategory(deletingCatName, targetReassignCat);
    setDeletingCatName(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyName,
      companyTagline,
      brandLogoUrl,
      heroTitle,
      heroSubtitle,
      heroImageUrl,
      marqueeText,
      brandStoryText,
      founderName,
      founderTitle,
      founderBio,
      founderPhotoUrl,
      announcementActive,
      contactEmail,
      contactPhone,
      address,
      categories,
      atelierCategories,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-600/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light gold-gradient-text">
            Storefront Banners & Brand Settings
          </h1>
          <p className="text-xs text-neutral-400">
            Control brand identity logos, collection category tags, founder bio, hero photography, and "Explore The Atelier" cards.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          className="px-4 py-2 rounded-xl bg-noir-900 border border-gold-600/30 text-gold-300 text-xs uppercase font-semibold hover:bg-gold-500/10 flex items-center gap-2"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Storefront Preview</span>
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-noir-900 border border-gold-600/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Section 0: Brand Identity & Logo Settings */}
        <div className="space-y-5 pb-6 border-b border-gold-600/15">
          <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
            <Crown className="w-4 h-4 text-gold-400" />
            <span>Brand Identity & Logo Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ANNEX"
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 font-serif text-base"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Sub-tagline / Subtitle</label>
              <input
                type="text"
                value={companyTagline}
                onChange={(e) => setCompanyTagline(e.target.value)}
                placeholder="COUTURE • PARIS"
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <ImageUploader
            value={brandLogoUrl}
            onChange={(val) => setBrandLogoUrl(val)}
            label="Official Brand Logo Mark (Upload file or enter URL)"
          />
        </div>

        {/* Section 0.5: DYNAMIC COLLECTION CATEGORIES MANAGER (NEW!) */}
        <div className="space-y-5 pb-6 border-b border-gold-600/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
                <Tag className="w-4 h-4 text-gold-400" />
                <span>Product Collection Categories Manager</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Add, rename, or delete category tags. Deleting a category automatically moves its products to another category so no products are lost.
              </p>
            </div>
          </div>

          {/* Add Category Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter new category tag name (e.g. Bridal Wear)..."
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              className="flex-1 bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
            />
            <button
              type="button"
              onClick={handleAddNewCategoryTag}
              className="gold-shimmer-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Tag</span>
            </button>
          </div>

          {/* List of Dynamic Categories */}
          <div className="space-y-2">
            {categories.map((cat) => {
              const productCount = products.filter((p) => p.category === cat).length;
              const isEditing = editingCatName === cat;

              return (
                <div
                  key={cat}
                  className="flex items-center justify-between p-3 rounded-xl bg-noir-950 border border-gold-600/15 hover:border-gold-500/30 transition-all text-xs"
                >
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1 mr-4">
                      <input
                        type="text"
                        value={renameInput}
                        onChange={(e) => setRenameInput(e.target.value)}
                        className="flex-1 bg-noir-900 border border-gold-400 rounded-lg px-3 py-1 text-xs text-neutral-100 focus:outline-none"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveRename(cat)}
                        className="p-1.5 rounded-lg bg-gold-600 text-noir-950 hover:bg-gold-500"
                        title="Save Rename"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCatName(null)}
                        className="p-1.5 rounded-lg bg-noir-900 text-neutral-400 hover:text-white"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-neutral-100">{cat}</span>
                      <span className="px-2 py-0.5 rounded-full bg-gold-600/10 border border-gold-500/30 text-gold-300 text-[10px] font-mono">
                        {productCount} item{productCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}

                  {!isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartRename(cat)}
                        className="p-1.5 rounded-lg bg-noir-900 border border-gold-600/20 text-gold-300 hover:bg-gold-500/10 transition-colors"
                        title="Rename Category Tag"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartDelete(cat)}
                        className="p-1.5 rounded-lg bg-noir-900 border border-red-500/20 text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete Category Tag"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 1: Announcement Marquee Bar */}
        <div className="space-y-4 pb-6 border-b border-gold-600/15">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Top Announcement Ticker Marquee</span>
            </h3>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="accent-gold-500 w-4 h-4 rounded"
              />
              <span className="text-neutral-200 font-medium">Show Banner Bar</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Marquee Ticker Copy</label>
            <input
              type="text"
              value={marqueeText}
              onChange={(e) => setMarqueeText(e.target.value)}
              placeholder="✦ FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $1,000..."
              className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 font-mono"
            />
          </div>
        </div>

        {/* Section 2: Hero Banner Copy & Photography */}
        <div className="space-y-4 pb-6 border-b border-gold-600/15">
          <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-gold-400" />
            <span>Homepage Hero Banner</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Hero Main Title Headline</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400 font-serif text-base"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Hero Subtitle Paragraph</label>
            <textarea
              rows={2}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <ImageUploader
            value={heroImageUrl}
            onChange={(val) => setHeroImageUrl(val)}
            label="Hero Background Photography"
          />
        </div>

        {/* Section 3: "Explore The Atelier" Category Showcase Manager */}
        <div className="space-y-6 pb-6 border-b border-gold-600/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
                <Grid className="w-4 h-4 text-gold-400" />
                <span>Explore The Atelier Category Showcase Manager</span>
              </h3>
              <p className="text-xs text-neutral-400">Add, delete, or re-order showcase cards appearing on the homepage.</p>
            </div>

            <button
              type="button"
              onClick={handleAddCategoryCard}
              className="gold-shimmer-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {atelierCategories.map((card, idx) => (
              <div key={card.id || idx} className="p-5 rounded-2xl bg-noir-950 border border-gold-600/20 space-y-4 relative">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs font-serif font-medium text-gold-400">Card #{idx + 1}: {card.title}</span>
                  
                  {/* Delete Card Button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteCategoryCard(idx)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-950/40 transition-colors flex items-center gap-1 text-[11px]"
                    title="Delete Category Card"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-300 mb-1">Card Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCategoryChange(idx, 'title', e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400 font-serif"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-300 mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={card.subtitle}
                    onChange={(e) => handleCategoryChange(idx, 'subtitle', e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-300 mb-1">Category Target Link</label>
                  <select
                    value={card.category}
                    onChange={(e: any) => handleCategoryChange(idx, 'category', e.target.value)}
                    className="w-full bg-noir-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-gold-400"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <ImageUploader
                  value={card.image}
                  onChange={(val) => handleCategoryChange(idx, 'image', val)}
                  label={`Card #${idx + 1} Cover Photography`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Founder & Creative Director Bio Section */}
        <div className="space-y-4 pb-6 border-b border-gold-600/15">
          <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-gold-400" />
            <span>Founder & Creative Director Bio Configuration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Founder / Owner Name</label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="Ayoola Adebisi"
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Title / Designation</label>
              <input
                type="text"
                value={founderTitle}
                onChange={(e) => setFounderTitle(e.target.value)}
                placeholder="Founder & Creative Director"
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Founder Bio Narrative (Displays on /about page)</label>
            <textarea
              rows={4}
              value={founderBio}
              onChange={(e) => setFounderBio(e.target.value)}
              placeholder="Write story of the founder and creative vision..."
              className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <ImageUploader
            value={founderPhotoUrl}
            onChange={(val) => setFounderPhotoUrl(val)}
            label="Founder Portrait Photo (Upload file or enter URL)"
          />
        </div>

        {/* Section 5: Brand Narrative & Atelier Contact */}
        <div className="space-y-4 pb-6 border-b border-gold-600/15">
          <h3 className="font-serif text-lg text-neutral-100 font-medium">Brand Story & Concierge Info</h3>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Atelier Brand Story</label>
            <textarea
              rows={3}
              value={brandStoryText}
              onChange={(e) => setBrandStoryText(e.target.value)}
              className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Concierge Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">Concierge Phone</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">Atelier Physical Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {/* Save CTA */}
        <button
          type="submit"
          className="w-full gold-shimmer-btn py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-xl"
        >
          <Save className="w-4 h-4" />
          <span>Save & Apply Storefront Changes Live</span>
        </button>

      </form>

      {/* Delete Category Reassignment Modal */}
      {deletingCatName && (
        <div className="fixed inset-0 z-50 p-4 flex items-center justify-center">
          <div className="fixed inset-0 bg-noir-950/80 backdrop-blur-sm" onClick={() => setDeletingCatName(null)} />
          <div className="relative bg-noir-900 border border-gold-600/30 rounded-3xl max-w-md w-full p-6 space-y-5 z-10 shadow-2xl animate-slide-up">
            
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg text-neutral-100 font-medium">Reassign Category Products</h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              You are deleting category <strong className="text-gold-300">"{deletingCatName}"</strong>.
              Select which category tag to re-assign existing items to so no products are lost:
            </p>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Target Reassignment Category</label>
              <select
                value={targetReassignCat}
                onChange={(e) => setTargetReassignCat(e.target.value)}
                className="w-full bg-noir-950 border border-gold-600/30 rounded-xl p-3 text-xs text-neutral-100 focus:outline-none focus:border-gold-400"
              >
                {categories
                  .filter((c) => c !== deletingCatName)
                  .map((c) => (
                    <option key={c} value={c}>
                      Move items to "{c}"
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingCatName(null)}
                className="flex-1 py-2.5 rounded-xl bg-noir-950 border border-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider"
              >
                Confirm & Reassign
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
