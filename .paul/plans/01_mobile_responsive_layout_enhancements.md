# Plan: Mobile Responsiveness & Luxury Layout Refinements

## 🎯 Goal & Objectives
Elevate the mobile user experience (UX) and layout responsiveness for **Annex Couture** across all mobile viewports (375px - 430px iPhones & Androids, 768px iPads) to feel like a high-end luxury fashion native app.

## 📱 Planned Enhancements

### 1. Mobile Floating Bottom Navigation Dock (`components/storefront/MobileBottomDock.tsx`)
- Fixed sticky bottom navigation bar visible ONLY on mobile screens (`sm:hidden`).
- Quick tap links for **Home**, **Shop Catalog**, **Bespoke Tailoring**, **Shopping Bag** (with live counter badge), and **Admin Portal**.
- Glassmorphism backdrop blur with gold accent highlights for active route.

### 2. Collapsible Mobile Filter Sheet in Catalog (`app/shop/page.tsx`)
- On small screens, replace crowded search/price sliders with a clean "Filter & Sort" trigger button that opens an elegant slide-up bottom drawer.
- Avoid horizontal scroll overflow and give products full edge-to-edge breathing room on mobile grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

### 3. Mobile Touch-Optimized Product Cards & Modals (`components/storefront/ProductCard.tsx` & `QuickViewModal.tsx`)
- Increase touch targets to minimum 44px for size pills, color swatches, and CTA buttons.
- Optimized image aspect ratios and swipeable gallery preview for mobile screens.

### 4. Mobile Responsive Admin Portal (`app/admin/*`)
- Add responsive Card Layout fallback for Admin Products Table and Orders Tracker on small screens (`< 768px`) so brand owners can manage inventory on their smartphones easily.

---

## 🛠️ Proposed File Changes

### [NEW] `components/storefront/MobileBottomDock.tsx`
- Mobile sticky bottom navigation dock component.

### [MODIFY] `app/layout.tsx`
- Render `MobileBottomDock` inside root layout for mobile users.

### [MODIFY] `app/shop/page.tsx`
- Refactor filter section into responsive slide-up bottom sheet on mobile screens.

### [MODIFY] `app/admin/products/page.tsx` & `app/admin/orders/page.tsx`
- Add responsive card views for mobile screen widths (`sm:hidden` / `hidden sm:table`).

---

## 🧪 Quality Gates & Verification
1. Run `npx next build` to verify 0 build or compilation errors.
2. Verify mobile rendering on 375px (iPhone SE/13 mini), 390px (iPhone 14/15), and 768px (iPad portrait).
3. Test tap interactions on bottom dock, mobile drawer, size pills, and checkout buttons.
