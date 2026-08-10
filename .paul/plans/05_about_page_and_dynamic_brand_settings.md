# Plan: About Page & Dynamic Brand Logo, Owner Bio & Category Cards Management

## 🎯 Goal & Objectives
1. **Create Brand About Page (`/about`)**:
   - Build a luxury editorial About page showcasing Atelier heritage, haute couture craftsmanship, and Creative Director / Founder Bio.
   - Pull founder name, title, bio, photo, and brand history dynamically from `settings`.

2. **Editable Brand Identity & Founder Bio in Admin (`/admin/settings`)**:
   - **Brand Identity**: Company Name ("ANNEX"), Tagline ("COUTURE • PARIS"), and Brand Logo Uploader (file upload or URL).
   - **Founder / Owner Bio**: Founder Name ("Ayoola Adebisi"), Title ("Founder & Creative Director"), Bio text, and Founder Photo Uploader.

3. **Dynamic Add & Delete Category Showcase Cards (`/admin/settings`)**:
   - Add a **"➕ Add New Category Card"** button to create new cards.
   - Add a **"🗑️ Delete Card"** button on each category card to remove cards.

4. **Navigation**:
   - Add **"About"** link (`/about`) to Navbar and Footer.

---

## 🛠️ Proposed File Changes

### [MODIFY] `lib/types.ts`
- Extend `StoreSettings` with: `companyName`, `companyTagline`, `brandLogoUrl`, `founderName`, `founderTitle`, `founderBio`, `founderPhotoUrl`.

### [MODIFY] `lib/data.ts`
- Seed initial defaults for brand identity and founder bio.

### [NEW] `app/about/page.tsx`
- Build editorial About page with brand story, craftsmanship pillars, and founder bio card.

### [MODIFY] `app/admin/settings/page.tsx`
- Add Brand Identity & Logo Uploader section.
- Add Founder Bio & Photo Uploader section.
- Add Add/Delete card actions in Explore The Atelier section manager.

### [MODIFY] `components/storefront/Navbar.tsx`
- Render dynamic logo & company name from `settings`.
- Add "About" link to navigation menu.

### [MODIFY] `components/storefront/Footer.tsx`
- Render dynamic logo & company name from `settings`.
- Add "About" link to Footer.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Functional check: Edit logo, company name, founder bio, or add/delete category cards in Admin Settings -> verify changes sync live across `/about`, `/`, navbar, and footer!
