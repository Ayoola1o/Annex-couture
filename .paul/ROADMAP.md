# ROADMAP.md — Annex Couture

## 🗺️ Project Phases

### Phase 1: Core Foundation & Deployment Structure (COMPLETED)
- [x] Initialize Next.js 14 (App Router) project with TypeScript & Tailwind CSS.
- [x] Configure `tailwind.config.js` with Obsidian Noir & Champagne Gold design system.
- [x] Set up `vercel.json` and Vercel serverless API routes (`/api/products`, `/api/orders`, `/api/settings`).
- [x] Implement React Context store with `localStorage` persistence (`lib/store.tsx`).

### Phase 2: Customer Storefront (COMPLETED)
- [x] Build editorial Hero Carousel, Category cards, and Brand Story on Landing (`/`).
- [x] Build interactive Product Catalog with search, category tabs, price slider, and sorting (`/shop`).
- [x] Build Product Specs page with size guide modal, fabric notes, and thumbnail gallery (`/product/[id]`).
- [x] Build slide-over Cart Drawer & full Checkout page with shipping input form (`/cart`).
- [x] Build Bespoke Custom Tailoring Booking page (`/custom-order`).

### Phase 3: Brand Admin Management Portal (COMPLETED)
- [x] Build protected Admin authentication screen (`/admin/login`).
- [x] Build Admin Dashboard Overview with sales KPIs, stock warning alerts, and recent orders feed (`/admin`).
- [x] Build Product Catalog CRUD Manager with create/edit modal and stock toggles (`/admin/products`).
- [x] Build Orders & Bespoke Fitting Request tracker with status updater (`/admin/orders`).
- [x] Build Storefront Banner & Hero Copy live manager (`/admin/settings`).

### Phase 4: Mobile Responsiveness & Luxury Layout (COMPLETED)
- [x] Add sticky Mobile Bottom Navigation Dock (`components/storefront/MobileBottomDock.tsx`).
- [x] Add Mobile Slide-Up Filter & Sort Sheet (`app/shop/page.tsx`).
- [x] Add Mobile Card View Layout for Admin Products (`app/admin/products/page.tsx`).
- [x] Add `predev` cache purge script to prevent Webpack chunk errors.

### Phase 5: Local Device Image Upload (COMPLETED)
- [x] Build reusable `ImageUploader` component with device file picker + Base64 converter (`components/admin/ImageUploader.tsx`).
- [x] Integrate local device file upload into Product Catalog Manager (`app/admin/products/page.tsx`).
- [x] Integrate local device file upload into Hero Banner Settings (`app/admin/settings/page.tsx`).

### Phase 6: Remove Admin Buttons & Newsletter Box (COMPLETED)
- [x] Remove Admin gold badge button from header navbar and mobile drawer menu (`components/storefront/Navbar.tsx`).
- [x] Remove Admin tab from sticky mobile bottom dock (`components/storefront/MobileBottomDock.tsx`).
- [x] Remove newsletter card block and Brand Portal footer column from footer (`components/storefront/Footer.tsx`).

### Phase 7: Editable "Explore The Atelier" Category Showcase (COMPLETED)
- [x] Add `AtelierCategoryCard` interface and seed initial default cards (`lib/types.ts` & `lib/data.ts`).
- [x] Add "Explore The Atelier Category Showcase Manager" card inside Admin Settings (`app/admin/settings/page.tsx`).
- [x] Render dynamic category cards on homepage landing (`app/page.tsx`).

### Phase 8: Official AC Monogram Logo & Favicon Integration (COMPLETED)
- [x] Save official Annex Couture gold AC monogram logo (`public/logo.png`, `public/logo.jpg`).
- [x] Configure browser favicon & Apple touch icon (`app/favicon.ico`, `app/icon.png`, `public/favicon.ico`).
- [x] Update Navbar, Footer, Admin Login screen, and Admin Header to render official logo image.

### Phase 9: About Page, Owner Bio, Dynamic Brand Logo & Add/Delete Cards (COMPLETED)
- [x] Create Brand About & Founder Bio page (`app/about/page.tsx`).
- [x] Add Brand Identity Editor (Company Name, Tagline, Brand Logo Uploader) in Admin Settings (`app/admin/settings/page.tsx`).
- [x] Add Founder & Creative Director Bio Editor in Admin Settings (`app/admin/settings/page.tsx`).
- [x] Add "➕ Add New Card" and "🗑️ Delete Card" controls to Explore The Atelier Section Manager (`app/admin/settings/page.tsx`).
- [x] Add "About" link (`/about`) to header Navbar and Footer.

### Phase 10: Future Enhancements (PLANNED)
- [ ] Connect real database persistence (Supabase / Prisma / Vercel Postgres).
- [ ] Connect live payment gateway integration (Stripe / Paystack).
- [ ] Email notification trigger on order submission.
