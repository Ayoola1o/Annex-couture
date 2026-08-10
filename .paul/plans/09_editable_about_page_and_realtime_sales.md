# Plan: Editable About Page & Real-time Sales Revenue Analytics

## 🎯 Goal & Objectives

### 1. Editable About Page Manager (`app/admin/settings/page.tsx` & `app/about/page.tsx`)
- Allow brand managers to edit every element of the `/about` page inside Admin Settings:
  - About Hero Title, Subtitle, and Hero Background Photography (`ImageUploader`).
  - About Philosophy Title & Narrative Body text.
  - Atelier Craftsmanship Spotlight Image (`ImageUploader`).
  - 3 Editable Excellence Pillars (Title & Description).
  - Sync `app/about/page.tsx` to dynamically render all fields live.

### 2. Real-Time Sales & Revenue Analytics in Admin Dashboard (`app/admin/page.tsx`)
- Transform the Admin Dashboard overview (`/admin`) into a live real-time financial hub:
  - **Real-Time Sales Volume ($)**: Sum of all confirmed customer orders.
  - **Catalog Inventory Total Worth ($)**: Real-time calculation of total retail value (`sum(product.price * product.stock)`).
  - **Average Order Value (AOV)**: Real-time average transaction value.
  - **Revenue Breakdown by Category**: Category sales distribution & revenue preview.
  - **Real-Time Order Revenue Feed**: Detailed itemized financial log for every customer order.

---

## 🛠️ Proposed File Changes

### [MODIFY] `lib/types.ts`
- Add About page fields to `StoreSettings` (`aboutHeroTitle`, `aboutHeroSubtitle`, `aboutHeroImageUrl`, `aboutPhilosophyTitle`, `aboutPhilosophyBody`, `aboutCraftsmanshipImageUrl`, `aboutPillars`).

### [MODIFY] `lib/data.ts`
- Seed initial defaults for About page settings.

### [MODIFY] `app/admin/settings/page.tsx`
- Add **"About Page Content & Photography Manager"** section with `ImageUploader` inputs.

### [MODIFY] `app/about/page.tsx`
- Render dynamic About page settings from store context.

### [MODIFY] `app/admin/page.tsx`
- Implement real-time revenue analytics calculations (Total Sales Worth, Catalog Inventory Valuation, Average Order Value, Category Revenue Distribution, and Financial Order Logs).

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Storefront check: Edit About hero title, philosophy, or photo in Admin Settings -> verify `/about` page updates live!
3. Admin check: Add a product or place an order -> verify Admin Dashboard real-time sales value, catalog inventory worth, and average order value update automatically!
