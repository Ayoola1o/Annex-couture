'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import ImageUploader from '@/components/admin/ImageUploader';
import { Sliders, Save, Sparkles, Image as ImageIcon, MapPin, Mail, Phone, Eye } from 'lucide-react';

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
    });
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-600/15 pb-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-neutral-100 font-light gold-gradient-text">
            Storefront Banners & Brand Settings
          </h1>
          <p className="text-xs text-neutral-400">
            Control live storefront announcements, hero background photography, brand copy, and concierge contact info.
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

      <form onSubmit={handleSave} className="space-y-6 bg-noir-900 border border-gold-600/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
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

        {/* Section 3: Brand Narrative & Atelier Contact */}
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
