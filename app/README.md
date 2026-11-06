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

## Hook checklist

### Non-visual hooks

- [x] `useReducer` — owns the shared shop state. The reducer lives in
  `state/shopReducer.ts` and is created in `context/ShopProvider.tsx`.
- [x] `useContext` — shares the reducer state, `dispatch`, cart count, and cart
  total through `context/ShopContext.ts`. `hooks/useShop.ts` wraps it in a
  guarded custom hook.
- [x] `useMemo` — caches the cart count, cart total, filtered products, sorted
  products, and visible page.
- [x] `useState` — keeps the newsletter email and submitted state local to the
  form in `components/Newsletter.tsx`.
- [x] `useShop` (custom) — reads `ShopContext` and throws a clear error when a
  component is rendered outside `ShopProvider`.

### Visual hook

- [x] `useTheme` (custom) — the visible hook. It reads the saved theme, falls
  back to the system preference, and toggles light/dark mode from the button in
  the header.
- [x] `useEffect` — applies the theme class to `<html>` and saves the choice to
  `localStorage` inside `hooks/useTheme.ts`.

The theme is separate from the shop reducer: `useTheme` only changes the class on
the document root, and the Tailwind `dark:` variants handle the visuals.

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
| `Header` | Top navigation bar. Reads the active tag and cart count from `useShop()`, dispatches tag and drawer actions, and renders the light/dark toggle from `useTheme()`. |
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
