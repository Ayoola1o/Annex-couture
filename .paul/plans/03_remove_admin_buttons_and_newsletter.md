# Plan: Remove Admin Buttons from Storefront & Remove Newsletter Box

## 🎯 Goal & Objectives
Clean up the customer storefront UI by removing all public Admin links/buttons and removing the newsletter subscription box. The brand owner knows to access the admin portal directly by navigating to `/admin`.

## 🛠️ Planned Changes

### 1. Header Navbar (`components/storefront/Navbar.tsx`)
- Remove the `Brand Admin` / `Admin Active` gold button in top right header.
- Remove the `Brand Admin Portal` button from the mobile drawer overlay.

### 2. Mobile Bottom Dock (`components/storefront/MobileBottomDock.tsx`)
- Remove the `Admin` icon tab from the mobile bottom dock. The dock will now cleanly display **Home**, **Shop**, **Bespoke**, and **Bag**.

### 3. Footer Component (`components/storefront/Footer.tsx`)
- Remove the top **"Subscribe for Runway Pre-Orders & Private Fits"** newsletter card block.
- Remove the **"Brand Portal"** column and **"Admin Management"** button from the footer navigation grid.
- Adjust footer layout grid to cleanly balance **Brand Story & Address**, **Collections**, and **Atelier Services**.

---

## 🛠️ Proposed File Changes

### [MODIFY] `components/storefront/Navbar.tsx`
- Remove admin link from desktop header and mobile drawer.

### [MODIFY] `components/storefront/MobileBottomDock.tsx`
- Remove admin item from dock array.

### [MODIFY] `components/storefront/Footer.tsx`
- Remove newsletter card block and Brand Portal footer column.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Storefront check: Verify no admin buttons or newsletter box appear on public pages.
3. Direct navigation check: Verify `/admin` remains 100% accessible when navigating directly.
