interface FiltersSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  onSaleOnly: boolean;
  onOnSaleChange: (value: boolean) => void;
}

const categories = [
  { name: "All Products", count: 6 },
  { name: "Outerwear", count: 1 },
  { name: "Footwear", count: 2 },
  { name: "Accessories", count: 3 },
];

const FiltersSidebar = ({
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  inStockOnly,
  onInStockChange,
  onSaleOnly,
  onOnSaleChange,
}: FiltersSidebarProps) => {
  return (
    <aside className="lg:col-span-3 lg:sticky lg:top-20 self-start">
      <div className="border border-slate-200 rounded-[1.25rem] bg-slate-50/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-400 p-5">
        <section aria-labelledby="filters-categories" className="space-y-4">
          <h2 id="filters-categories" className="text-sm font-bold text-slate-900">
            Categories
          </h2>

          <div className="space-y-3">
            {categories.map((category) => (
              <label
                key={category.name}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === category.name}
                  onChange={() => onCategoryChange(category.name)}
                  className="h-[1.125rem] w-[1.125rem] rounded-[0.375rem] border border-slate-200 accent-blue-600 cursor-pointer"
                />
                <span className="flex-1 text-sm text-slate-700">
                  {category.name}{" "}
                  <span className="text-slate-400 font-normal">
                    ({category.count})
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <div className="my-5 h-px bg-slate-100"></div>

        <section aria-labelledby="filters-price" className="space-y-3">
          <h2 id="filters-price" className="text-sm font-bold text-slate-900">
            Price Range
          </h2>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>0 kr</span>
            <span>{maxPrice.toLocaleString("en-US")} kr</span>
          </div>

          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            className="w-full accent-blue-500"
            aria-label="Price range"
          />
        </section>

        <div className="my-5 h-px bg-slate-100"></div>

        <section aria-labelledby="filters-availability" className="space-y-4">
          <h2 id="filters-availability" className="text-sm font-bold text-slate-900">
            Availability
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => onInStockChange(event.target.checked)}
                className="h-[1.125rem] w-[1.125rem] rounded-[0.375rem] border border-slate-200 accent-blue-600 cursor-pointer"
              />
              <span className="flex-1 text-sm text-slate-700">In Stock</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(event) => onOnSaleChange(event.target.checked)}
                className="h-[1.125rem] w-[1.125rem] rounded-[0.375rem] border border-slate-200 accent-blue-600 cursor-pointer"
              />
              <span className="flex-1 text-sm text-slate-700">On Sale</span>
            </label>
          </div>
        </section>

        <section className="mt-6">
          <div className="rounded-[1.25rem] bg-gradient-to-br from-blue-600 to-amber-500 text-white overflow-hidden relative p-6">
            <div className="absolute -top-[20%] -right-[10%] h-[200px] w-[200px] rounded-full bg-white/20 blur-2xl"></div>
            <h3 className="text-lg font-bold text-white">Summer Sale</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Get up to 50% off on all summer collections. Limited time offer!
            </p>
            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[0.75rem] bg-white px-5 py-2.5 font-semibold text-blue-600 shadow-lg transition-all duration-200 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-px"
            >
              Shop Now
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
