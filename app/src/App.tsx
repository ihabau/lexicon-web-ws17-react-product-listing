import { useState } from "react";
import Header from "./components/Header.tsx";
import FiltersSidebar from "./components/FiltersSidebar.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import Newsletter from "./components/Newsletter.tsx";
import Footer from "./components/Footer.tsx";
import CartDrawer from "./components/CartDrawer.tsx";

type CartItem = {
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartProduct = {
  title: string;
  price: number;
  image: string;
};

function App() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navItems = [
    { label: "New Arrival" },
    { label: "Men" },
    { label: "Women" },
    { label: "Sale" },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTag((current) => (current === tag ? "All" : tag));
  };

  const addToCart = (product: CartProduct) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.title === product.title);
      if (existing) {
        return items.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (title: string) => {
    setCartItems((items) => items.filter((item) => item.title !== title));
  };

  const changeQuantity = (title: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.title === title
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const filterKey = [
    selectedTag,
    selectedCategory,
    maxPrice,
    inStockOnly,
    onSaleOnly,
    sortBy,
  ].join("|");

  return (
    <div className="min-h-screen bg-slate-100/30 font-sans text-slate-950 antialiased">
      <Header
        brand="LITE.SHOP"
        navItems={navItems}
        cartCount={cartCount}
        selectedTag={selectedTag}
        onTagChange={toggleTag}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <FiltersSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            onSaleOnly={onSaleOnly}
            onOnSaleChange={setOnSaleOnly}
          />
          <ProductGrid
            key={filterKey}
            selectedTag={selectedTag}
            selectedCategory={selectedCategory}
            maxPrice={maxPrice}
            inStockOnly={inStockOnly}
            onSaleOnly={onSaleOnly}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onAddToCart={addToCart}
          />
        </div>
      </main>

      <Newsletter />
      <Footer selectedTag={selectedTag} onTagChange={toggleTag} />

      <CartDrawer
        items={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onChangeQuantity={changeQuantity}
      />
    </div>
  );
}

export default App;
