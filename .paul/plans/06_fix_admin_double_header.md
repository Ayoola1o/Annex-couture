# Plan: Fix Admin Double Header & Hide Storefront Components on Admin Pages

## 🎯 Goal
Eliminate the duplicate header on Admin pages by hiding customer storefront elements (`Navbar`, `Footer`, `MobileBottomDock`) when navigating anywhere inside `/admin` routes.

## 📐 Solution Architecture
- Check `pathname.startsWith('/admin')` inside:
  - `components/storefront/Navbar.tsx`
  - `components/storefront/Footer.tsx`
  - `components/storefront/MobileBottomDock.tsx`
- If on an admin route, return `null` so only the clean, dedicated Admin Header & Layout render on `/admin` pages.

---

## 🛠️ Proposed File Changes

### [MODIFY] `components/storefront/Navbar.tsx`
- Return `null` if `pathname.startsWith('/admin')`.

### [MODIFY] `components/storefront/Footer.tsx`
- Add `usePathname()` hook and return `null` if `pathname.startsWith('/admin')`.

### [MODIFY] `components/storefront/MobileBottomDock.tsx`
- Return `null` if `pathname.startsWith('/admin')`.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Storefront check: Verify `/`, `/shop`, `/about`, `/cart` render customer Navbar & Footer normally.
3. Admin check: Verify `/admin` has only ONE dedicated Admin header and no customer footer/dock!
