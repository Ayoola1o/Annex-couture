# Plan: Shop Collection Pagination (12 Products Per Page)

## 🎯 Goal & Objectives
Implement client-side pagination on the `/shop` collection catalog page:
- Maximum 12 products displayed per page.
- Pagination navigation bar at the bottom (`‹ Prev`, `1`, `2`, `3...`, `Next ›`).
- Reset to Page 1 automatically when category filter, search query, price slider, or sorting options change.

## 📐 Solution Architecture

1. **Pagination State in `app/shop/page.tsx`**:
   - `const ITEMS_PER_PAGE = 12;`
   - `const [currentPage, setCurrentPage] = useState<number>(1);`
   - `const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);`
   - Slice `filteredProducts`: `const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);`

2. **Filter Reset Hook**:
   - Reset `currentPage` to 1 whenever `selectedCategory`, `searchQuery`, `priceMax`, or `sortBy` changes.

3. **Pagination UI Controls**:
   - Render luxury pagination bar below the product grid:
     - `‹ Prev` button (disabled on page 1).
     - Page number buttons (`1`, `2`, etc.).
     - `Next ›` button (disabled on page `totalPages`).
     - Item counter text (e.g. *Showing 1 - 12 of 24 products*).

---

## 🛠️ Proposed File Changes

### [MODIFY] `app/shop/page.tsx`
- Implement 12-item pagination logic and pagination controls UI.

---

## 🧪 Quality Gates & Verification
1. Build check: `npx next build` (0 compilation errors).
2. Functional check: Test pagination navigation on `/shop` with multiple items.
