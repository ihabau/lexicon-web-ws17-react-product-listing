import { useState } from "react";
import ProductCard from "./ProductCard.tsx";
import Pagination from "./Pagination.tsx";

type Product = {
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  badge: string;
  badgeTone: "rose" | "amber" | "blue" | "slate";
  stock: string;
  available: boolean;
  tags: string[];
};

interface ProductGridProps {
  selectedTag: string;
  selectedCategory: string;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddToCart: (product: { title: string; price: number; image: string }) => void;
}

const products: Product[] = [
  {
    title: "Technical Shell Jacket",
    category: "Outerwear",
    price: 890,
    oldPrice: 1450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800",
    badge: "Discount",
    badgeTone: "rose",
    stock: "In Stock • Ships in 2 days",
    available: true,
    tags: ["Men", "Sale"],
  },
  {
    title: "Speedster Running Shoes",
    category: "Footwear",
    price: 1200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    badge: "Limited",
    badgeTone: "amber",
    stock: "Only 4 items left",
    available: true,
    tags: ["Men", "New Arrival"],
  },
  {
    title: "Minimalist Quartz Watch",
    category: "Accessories",
    price: 1850,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    badge: "Sold Out",
    badgeTone: "slate",
    stock: "Back in stock next week",
    available: false,
    tags: ["Women"],
  },
  {
    title: "Classic Canvas Sneakers",
    category: "Footwear",
    price: 550,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    badge: "Popular",
    badgeTone: "blue",
    stock: "In Stock • Ships in 1 day",
    available: true,
    tags: ["Women", "New Arrival"],
  },
  {
    title: "Premium Wireless Headphones",
    category: "Accessories",
    price: 1690,
    oldPrice: 2200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    badge: "Hot Deal",
    badgeTone: "rose",
    stock: "In Stock • Ships in 2 days",
    available: true,
    tags: ["Men", "Sale"],
  },
  {
    title: "Tech Daypack",
    category: "Accessories",
    price: 1100,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    badge: "New Arrival",
    badgeTone: "amber",
    stock: "In Stock • Ships in 1 day",
    available: true,
    tags: ["Women", "New Arrival"],
  },
];

const pageSize = 3;

const ProductGrid = ({
  selectedTag,
  selectedCategory,
  maxPrice,
  inStockOnly,
  onSaleOnly,
  sortBy,
  onSortChange,
  onAddToCart,
}: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter(
    (product) =>
      (selectedTag === "All" || product.tags.includes(selectedTag)) &&
      (selectedCategory === "All Products" ||
        product.category === selectedCategory) &&
      product.price <= maxPrice &&
      (!inStockOnly || product.available) &&
      (!onSaleOnly || product.oldPrice !== undefined),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Best Selling") return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <section className="lg:col-span-9">
      <div className="border border-slate-200 rounded-[1.25rem] bg-slate-50/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-400 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Recommended for you
          </h1>

          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="appearance-none border border-slate-200 bg-white rounded-[0.75rem] py-2 pl-3 pr-9 text-sm text-slate-950 transition-all duration-200 outline-none cursor-pointer focus:border-blue-400 focus:ring-4 focus:ring-blue-600/10"
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
            </select>
          </label>
        </div>

        <div className="mt-5 h-px bg-slate-100"></div>

        {visibleProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.title}
                {...product}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 mb-6 text-center text-sm text-slate-500">
            No products match these filters.
          </p>
        )}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
