# LITE.SHOP – React Workshop 1

A React + Vite + TypeScript implementation of the product listing layout in
[`../index.html`](../index.html), styled with Tailwind CSS and icons from
`lucide-react`.

## Run

```bash
npm install
npm run dev
```

Production build: `npm run build`, lint: `npm run lint`.

## Components

| Component | Purpose |
| :--- | :--- |
| `App` | Page shell. Holds the nav links and composes the other components. |
| `Header` | Top navigation bar with brand, nav links and cart count. |
| `FiltersSidebar` | Left sidebar with Categories, Price Range, Availability and the Summer Sale promo. |
| `ProductGrid` | Section heading, sort dropdown, product grid and pagination. Owns the product data and current page. |
| `ProductCard` | Single product card with image, badge, favorite, rating, price and cart action. |
| `Pagination` | Page navigation below the grid with previous/next and numbered buttons. |
| `Newsletter` | Dark "Join the LITE.CLUB" section with the email form. |
| `CartDrawer` | Slide-in cart panel with quantities, removal, total and checkout. |
| `Footer` | Link columns and copyright at the bottom of the page. |

## Props

- `Header` — `brand: string`, `navItems: NavItem[]`, `cartCount: number`,
  `selectedTag: string`, `onTagChange: (tag: string) => void`,
  `onCartClick: () => void`.
- `FiltersSidebar` — `selectedCategory: string`,
  `onCategoryChange: (category: string) => void`, `maxPrice: number`,
  `onMaxPriceChange: (value: number) => void`, `inStockOnly: boolean`,
  `onInStockChange: (value: boolean) => void`, `onSaleOnly: boolean`,
  `onOnSaleChange: (value: boolean) => void`.
- `ProductGrid` — `selectedTag: string`, `selectedCategory: string`,
  `maxPrice: number`, `inStockOnly: boolean`, `onSaleOnly: boolean`,
  `sortBy: string`, `onSortChange: (value: string) => void`,
  `onAddToCart: (product: CartProduct) => void`.
- `ProductCard` — `title`, `category`, `price`, `oldPrice?`, `rating`, `image`,
  `badge`, `badgeTone`, `stock`, `available`, `onAddToCart: () => void`.
- `Pagination` — `totalPages: number`, `currentPage: number`,
  `onPageChange: (page: number) => void`.
- `CartDrawer` — `items: CartItem[]`, `open: boolean`, `onClose`,
  `onRemove: (title: string) => void`,
  `onChangeQuantity: (title: string, delta: number) => void`.
- `Footer` — `selectedTag: string`, `onTagChange: (tag: string) => void`.

`NavItem` is declared next to `Header`, `ProductCardProps` next to
`ProductCard`, and the cart types next to `App` and `CartDrawer`, so each
component owns the types it needs.

## Why props

The components are meant to be reusable, so they only know about the data they
render. `Header` receives the brand, links, active tag, cart count and callbacks
from `App` instead of hard-coding them. `FiltersSidebar` receives the selected
category, price and availability values plus change callbacks, so the sidebar
only displays and reports filters. `ProductCard` receives all of its display
data plus an `onAddToCart` callback, which lets `ProductGrid` render any list of
products with `.map()`. `Pagination` receives the current page and a callback,
so page state stays in `ProductGrid` and the component just reports what the
user clicked. `CartDrawer` receives the cart items and callbacks for closing,
removing and changing quantities, so all cart state stays in `App`.

## How it fits together

`App` owns the nav links, the active tag, the category/price/availability
filters, the sort order and the cart. It renders `Header`, then a 12-column grid
where `FiltersSidebar` takes 3 columns and `ProductGrid` takes 9. The navbar
tags filter the products, while the sidebar filters by product category, price
and availability. `ProductGrid` applies those filters, sorts the result, maps
each visible product to a `ProductCard`, and renders `Pagination` underneath.
`ProductCard` reports add-to-cart clicks up to `App`, which updates the cart and
opens `CartDrawer`. `Newsletter` and `Footer` close the page.
