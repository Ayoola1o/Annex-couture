# Plan: Dynamic Collection Categories Manager in Admin

## 🎯 Goal & Objectives
Allow brand administrators to dynamically manage product collection categories (add, rename, and delete). When a category is renamed or deleted, automatically reassign any existing products assigned to that category so no products are lost.

## 📐 Solution Architecture

1. **Dynamic Category State in Store (`lib/types.ts`, `lib/data.ts`, `lib/store.tsx`)**:
   - Add `categories: string[]` to `StoreSettings` and `useApp()`.
   - Seed default categories: `['Haute Couture', 'Ready to Wear', 'Evening Gowns', 'Tailored Suits', 'Luxury Accessories']`.
   - Provide helper methods in store context:
     - `addCategory(categoryName: string)`
     - `renameCategory(oldName: string, newName: string)` -> updates category list AND updates all existing products with `category === oldName` to `newName`.
     - `deleteCategory(categoryName: string, reassignTo: string)` -> removes category from list AND updates all existing products with `category === categoryName` to `reassignTo`.

2. **Category Manager UI in Admin Settings (`app/admin/settings/page.tsx`)**:
   - Build a **"Product Collection Categories Manager"** card in Admin Settings.
   - List all active categories with product counts.
   - Provide inline **"Rename"** input, **"Delete"** modal (with target fallback category selection dropdown), and **"➕ Add New Category Tag"** input.

3. **Dynamic Category Synchronization**:
   - **Shop Page (`app/shop/page.tsx`)**: Dynamically render category pills from `settings.categories`.
   - **Product Manager (`app/admin/products/page.tsx`)**: Render category dropdown options and filter pills dynamically from `settings.categories`.
   - **Footer (`components/storefront/Footer.tsx`)**: Render collection links dynamically from `settings.categories`.

---

## 🛠️ Proposed File Changes

### [MODIFY] `lib/types.ts`
- Change `ProductCategory` to `string` and add `categories: string[]` to `StoreSettings` and `AppContextType`.

### [MODIFY] `lib/data.ts`
- Add initial `INITIAL_CATEGORIES` list.

### [MODIFY] `lib/store.tsx`
- Implement `addCategory`, `renameCategory`, and `deleteCategory` with automatic product re-association and `localStorage` persistence.

### [MODIFY] `app/admin/settings/page.tsx`
- Build **Product Collection Categories Manager** with Add, Rename, Delete & Product Reassignment controls.

### [MODIFY] `app/shop/page.tsx`
- Render dynamic category pills from store context.

### [MODIFY] `app/admin/products/page.tsx`
- Render dynamic category filters and form select options from store context.

### [MODIFY] `components/storefront/Footer.tsx`
- Render dynamic collection links from store context.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Functional check: Rename "Evening Gowns" to "Gala Gowns" -> verify products under Evening Gowns update to Gala Gowns on Storefront and Admin!
3. Functional check: Delete a category with products -> select reassignment category -> verify products safely move to target category without product loss!
