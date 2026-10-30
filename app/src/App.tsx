import Header from "./components/Header";
import type { NavItem } from "./types";

function App() {
  const navItems: NavItem[] = [
    { label: "New Arrival", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Sale", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-slate-100/30 font-sans text-slate-950 antialiased">
      <Header brand="LITE.SHOP" navItems={navItems} cartCount={0} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-slate-600"></p>
      </main>
    </div>
  );
}

export default App;
