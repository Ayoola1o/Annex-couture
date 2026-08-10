# PROJECT.md — Annex Couture

## 🎯 Vision & Core Value
Annex Couture is an elite, mobile-responsive haute couture fashion brand web application & brand management admin portal, built with Next.js 14 and Tailwind CSS, structured for 1-click Vercel deployment.

- **Storefront**: High-fashion obsidian & champagne gold aesthetic, interactive product catalog, size guide modals, custom bespoke tailoring booking, slide-over bag drawer, and simulated checkout.
- **Brand Admin Portal**: Protected dashboard to add/edit/delete products, monitor real-time customer orders and bespoke fitting requests, update stock levels, and control homepage hero banners.

## 🏗️ Technical Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide Icons.
- **Routing**:
  - Storefront: `/`, `/shop`, `/product/[id]`, `/cart`, `/custom-order`
  - Admin Portal: `/admin/login`, `/admin`, `/admin/products`, `/admin/orders`, `/admin/settings`
  - API Routes: `/api/products`, `/api/orders`, `/api/settings`
- **State Management**: React Context (`lib/store.tsx`) with automatic `localStorage` persistence and fallback seed catalog (`lib/data.ts`).
- **Deployment Target**: Vercel Serverless.

## 🚀 Key Quality Standards
- Mobile-first responsive layouts across 375px (mobile), 768px (tablet), 1440px (desktop).
- 100% clean Next.js build validation without TypeScript or syntax errors.
- Automatic `predev` cache purge to prevent Webpack chunk collisions on dev server launches.
