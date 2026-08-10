'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import ImageUploader from '@/components/admin/ImageUploader';
import { ProductCategory, AtelierCategoryCard } from '@/lib/types';
import { INITIAL_ATELIER_CATEGORIES } from '@/lib/data';
import { Sliders, Save, Sparkles, Image as ImageIcon, MapPin, Mail, Phone, Eye, Grid, Edit3 } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, showToast } = useApp();

  const [heroTitle, setHeroTitle] = useState(settings.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle);
  const [heroImageUrl, setHeroImageUrl] = useState(settings.heroImageUrl);
  const [marqueeText, setMarqueeText] = useState(settings.marqueeText);
  const [brandStoryText, setBrandStoryText] = useState(settings.brandStoryText);
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

  const handleCategoryChange = (index: number, field: keyof AtelierCategoryCard, value: string) => {
    setAtelierCategories((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      heroTitle,
      heroSubtitle,
      heroImageUrl,
      marqueeText,
      brandStoryText,
      announcementActive,
      contactEmail,
      contactPhone,
      address,
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
            Control homepage hero background photography, "Explore The Atelier" category showcase cards, marquee ticker, and contact details.
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

          {/* Image Uploader for Hero Background Photography */}
          <ImageUploader
            value={heroImageUrl}
            onChange={(val) => setHeroImageUrl(val)}
            label="Hero Background Photography"
          />
        </div>

        {/* Section 3: "Explore The Atelier" Category Showcase Manager */}
        <div className="space-y-6 pb-6 border-b border-gold-600/15">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-neutral-100 font-medium flex items-center gap-2">
              <Grid className="w-4 h-4 text-gold-400" />
              <span>Explore The Atelier Category Showcase Manager</span>
            </h3>
            <span className="text-[11px] text-gold-400 uppercase font-semibold">4 Homepage Cards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {atelierCategories.map((card, idx) => (
              <div key={card.id || idx} className="p-5 rounded-2xl bg-noir-950 border border-gold-600/20 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-serif font-medium text-gold-400">Card #{idx + 1}: {card.title}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">Category: {card.category}</span>
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
                    <option value="Haute Couture">Haute Couture</option>
                    <option value="Ready to Wear">Ready to Wear</option>
                    <option value="Evening Gowns">Evening Gowns</option>
                    <option value="Tailored Suits">Tailored Suits</option>
                    <option value="Luxury Accessories">Luxury Accessories</option>
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

        {/* Section 4: Brand Narrative & Atelier Contact */}
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

    </div>
  );
}
