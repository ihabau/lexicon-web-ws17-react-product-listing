import Header from "./components/Header.tsx";
import FiltersSidebar from "./components/FiltersSidebar.tsx";
import ProductGrid from "./components/ProductGrid.tsx";
import Newsletter from "./components/Newsletter.tsx";
import Footer from "./components/Footer.tsx";
import CartDrawer from "./components/CartDrawer.tsx";
import { ShopProvider } from "./context/ShopProvider.tsx";

function ShopPage() {
  return (
    <div className="min-h-screen bg-slate-100/30 font-sans text-slate-950 antialiased">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <FiltersSidebar />
          <ProductGrid />
        </div>
      </main>

      <Newsletter />
      <Footer />

      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <ShopPage />
    </ShopProvider>
  );
}

export default App;
