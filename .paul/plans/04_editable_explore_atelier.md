# Plan: Editable "Explore The Atelier" Category Showcase in Admin

## 🎯 Goal
Allow brand administrators to edit the "Explore The Atelier" section on the homepage (category titles, subtitles, and photography images via device upload or link) directly inside the Admin Portal.

## 📐 Solution Architecture

1. **Data Types & Store (`lib/types.ts` & `lib/store.tsx`)**:
   - Define `AtelierCategoryCard` interface (id, title, subtitle, image, category).
   - Add `atelierCategories` array to `StoreSettings` and seed initial defaults in `lib/data.ts`.
   - Provide `updateAtelierCategory(id, data)` helper in `lib/store.tsx` with `localStorage` persistence.

2. **Admin Settings Manager (`app/admin/settings/page.tsx`)**:
   - Add an **"Explore The Atelier Section Manager"** card in Admin Settings.
   - Provide form fields for each of the 4 category cards: Title, Subtitle, Category Link, and Image (with local device upload or URL switcher!).

3. **Homepage Dynamic Rendering (`app/page.tsx`)**:
   - Replace hardcoded `categories` array with dynamic `settings.atelierCategories` from `useApp()`.

---

## 🛠️ Proposed File Changes

### [MODIFY] `lib/types.ts`
- Add `AtelierCategoryCard` interface and update `StoreSettings`.

### [MODIFY] `lib/data.ts`
- Add default `atelierCategories` data.

### [MODIFY] `lib/store.tsx`
- Add `updateAtelierCategory` helper to store context.

### [MODIFY] `app/admin/settings/page.tsx`
- Add "Explore The Atelier" card editor with `ImageUploader` component.

### [MODIFY] `app/page.tsx`
- Dynamically render `atelierCategories` on landing page.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Functional check: Change a category card image/title in Admin Settings -> verify home page "Explore The Atelier" section updates live!
