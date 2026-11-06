# LITE.SHOP - React Hooks

A React + Vite + TypeScript implementation of the product listing layout in
[`../index.html`](../index.html), styled with Tailwind CSS and icons from
`lucide-react`. This version uses `useReducer`, `useContext`, and `useMemo`
instead of passing all state through props.

## Run

```bash
npm install
npm run dev
```

Production build: `npm run build`, lint: `npm run lint`.

## Hooks

| Hook | Where | Purpose |
| :--- | :---- | :------ |
| `useReducer` | `state/shopReducer.ts`, `context/ShopProvider.tsx` | Owns the filters, sort order, page, cart, and drawer state. |
| `useContext` | `context/ShopContext.ts`, `hooks/useShop.ts` | Shares the shop state and `dispatch` with any component. |
| `useMemo` | `context/ShopProvider.tsx`, `components/ProductGrid.tsx` | Caches the cart count, cart total, filtered products, sorted products, and visible page. |
| `useState` | `components/Newsletter.tsx` | Keeps the email and submitted state local to the form. |

## State

`ShopState` in `state/shopReducer.ts` contains:

- `selectedTag`, `selectedCategory`, `maxPrice`, `inStockOnly`, `onSaleOnly`
- `sortBy`, `page`
- `cartItems`, `cartOpen`

The reducer handles these actions:

`TOGGLE_TAG`, `SET_CATEGORY`, `SET_MAX_PRICE`, `SET_IN_STOCK_ONLY`,
`SET_ON_SALE_ONLY`, `SET_SORT`, `SET_PAGE`, `ADD_TO_CART`, `REMOVE_FROM_CART`,
`CHANGE_QUANTITY`, `SET_CART_OPEN`, `RESET_FILTERS`.

Filter actions reset `page` to `1`, so the grid never stays on a page that no
longer exists after a filter changes.

## Components

| Component | Purpose |
| :--- | :--- |
| `App` | Wraps the page in `ShopProvider` and composes the other components. |
| `Header` | Top navigation bar. Reads the active tag and cart count from `useShop()` and dispatches tag and drawer actions. |
| `FiltersSidebar` | Left sidebar with Categories, Price Range, Availability, and the Summer Sale promo. Reads filters from `useShop()` and dispatches changes. |
| `ProductGrid` | Section heading, sort dropdown, product grid, and pagination. Reads filters from `useShop()`, derives the visible products with `useMemo`, and dispatches cart actions. |
| `ProductCard` | Single product card with image, badge, favorite, rating, price, and cart action. Still receives its display data through props. |
| `Pagination` | Page navigation below the grid. Still receives `totalPages`, `currentPage`, and `onPageChange` through props. |
| `Newsletter` | Dark "Join the LITE.CLUB" section with a local email form. |
| `CartDrawer` | Slide-in cart panel. Reads items, open state, count, and total from `useShop()` and dispatches remove and quantity actions. |
| `Footer` | Link columns and copyright. Reads the active tag from `useShop()` and dispatches tag changes. |

## Data flow

`ShopProvider` creates one reducer state and exposes it through `ShopContext`.
`useShop()` reads that context and throws a clear error if a component is
rendered outside the provider. `Header`, `FiltersSidebar`, `Footer`, and
`CartDrawer` read and update the shared state without receiving shop props.

`ProductGrid` uses the filter state from the context to compute the filtered
products, sorts them, and slices the current page. All three derived lists are
wrapped in `useMemo` so they only recalculate when their inputs change.
`ProductCard` and `Pagination` stay presentational: they receive the data they
render and report user actions through callbacks.

## Why hooks

The shop state is shared by several parts of the page. Passing the cart and
every filter callback through `App`, the layout, and the sidebar would create
prop drilling. The context keeps the state in one place, and the reducer keeps
every state transition explicit and testable. `useMemo` avoids repeating the
filter, sort, and cart total work on unrelated renders.
