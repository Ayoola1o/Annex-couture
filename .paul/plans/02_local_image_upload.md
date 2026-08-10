# Plan: Local Image Upload Capability for Brand Admin

## 🎯 Goal
Allow brand administrators to upload fashion garment photos and hero banner images directly from their device (computer/phone file picker) in addition to pasting image URLs.

## 📐 Solution Architecture
1. **Base64 Data URL FileReader Helper (`lib/utils.ts` / `components/admin/ImageUploader.tsx`)**:
   - Client-side image file processor that converts local device images (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`) into optimized Data URLs (`data:image/...;base64,...`).
   - Enables instant rendering across Customer Storefront and Admin Dashboard with 0 external dependency or storage configuration required.

2. **Reusable Image Uploader Component (`components/admin/ImageUploader.tsx`)**:
   - Tab switcher: **"📁 Upload from Device"** vs **"🔗 Image URL Link"**.
   - Drag-and-drop file dropzone + file browser button.
   - Live image thumbnail preview with remove/replace action.

3. **Integration Points**:
   - **Product Manager Modal (`app/admin/products/page.tsx`)**: Allow file uploads when adding/editing products.
   - **Hero Banner Settings (`app/admin/settings/page.tsx`)**: Allow file uploads for homepage hero background photography.

---

## 🛠️ Proposed File Changes

### [NEW] `components/admin/ImageUploader.tsx`
- Reusable file upload dropzone + URL switch component with live thumbnail preview.

### [MODIFY] `app/admin/products/page.tsx`
- Replace plain text URL input with `ImageUploader` component in product modal.

### [MODIFY] `app/admin/settings/page.tsx`
- Replace plain text URL input with `ImageUploader` component in hero banner settings.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Functional check: Upload an image file from local device in Admin Products modal -> verify image renders immediately on Storefront homepage & shop catalog!
