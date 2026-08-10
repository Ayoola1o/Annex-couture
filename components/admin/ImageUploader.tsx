'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'Garment Photo' }: ImageUploaderProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (.jpg, .png, .webp, .svg)');
        return;
      }

      // Convert image file to base64 Data URL for instant local rendering
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      onChange(urlInput);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-neutral-300">{label} *</label>

        {/* Mode Switcher Pills */}
        <div className="flex items-center gap-1 p-1 bg-noir-950 rounded-lg border border-gold-600/20 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider flex items-center gap-1 transition-all ${
              mode === 'upload' ? 'bg-gold-500 text-noir-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider flex items-center gap-1 transition-all ${
              mode === 'url' ? 'bg-gold-500 text-noir-950 font-bold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image URL</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Device File Upload Dropzone */}
      {mode === 'upload' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!value ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gold-600/30 hover:border-gold-400 rounded-2xl p-6 text-center bg-noir-950/60 hover:bg-noir-950 cursor-pointer transition-all space-y-2 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold-600/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-gold-300">
                  Click to select image file from device
                </p>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  Supports JPG, PNG, WEBP, SVG files
                </p>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-gold-600/30 bg-noir-950 p-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src={value} alt="Preview" className="w-16 h-16 rounded-xl object-cover bg-noir-900 border border-white/10 shrink-0" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-gold-300 block">Image Selected</span>
                  <span className="text-[10px] text-neutral-400 truncate block">
                    {value.startsWith('data:') ? 'Local Device File (Base64 Data)' : value}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pr-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-noir-900 border border-gold-600/30 text-xs text-gold-300 hover:bg-gold-500/10"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-950/40"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Image URL Input */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste image URL (https://images.unsplash.com/...)"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                onChange(e.target.value);
              }}
              className="flex-1 bg-noir-950 border border-gold-600/20 rounded-xl px-4 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-gold-400 font-mono"
            />
          </div>

          {value && (
            <div className="relative h-24 rounded-xl overflow-hidden border border-gold-600/20">
              <img src={value} alt="URL Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1 rounded-full bg-noir-950/80 text-white hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
