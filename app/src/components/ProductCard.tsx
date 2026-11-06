import { Eye, Heart, Plus, Star } from "lucide-react";

interface ProductCardProps {
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
  onAddToCart: () => void;
}

const badgeTones: Record<ProductCardProps["badgeTone"], string> = {
  rose: "border-rose-100/50 bg-rose-500/10 text-rose-600",
  amber: "border-amber-100/50 bg-amber-500/10 text-amber-600",
  blue: "border-blue-100/50 bg-blue-500/10 text-blue-600",
  slate: "border-slate-200/50 bg-slate-900/60 text-white",
};

const ProductCard = ({
  title,
  category,
  price,
  oldPrice,
  rating,
  image,
  badge,
  badgeTone,
  stock,
  available,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <article className="border border-slate-200 rounded-[1.25rem] bg-white p-3 transition-all duration-400 hover:border-blue-400 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 group dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500">
      <div
        className={`relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 ${
          available ? "" : "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
        }`}
      >
        <img
          src={image}
          alt={title}
          className="aspect-[4/5] w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={!available}
            aria-label="Quick View"
            className="h-12 w-12 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:text-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            <Eye size={20} />
          </button>
          <button
            type="button"
            disabled={!available}
            onClick={onAddToCart}
            aria-label="Add to cart"
            className="h-12 w-12 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:text-slate-400"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>

        <span
          className={`absolute left-3 top-3 px-3 py-1 text-[11px] font-bold rounded-full border backdrop-blur-md ${badgeTones[badgeTone]}`}
        >
          {badge}
        </span>

        <button
          type="button"
          aria-label="Add to favorites"
          title="Favorite"
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/50 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-rose-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-rose-400"
        >
          <Heart size={20} />
        </button>
      </div>

      <div className="mt-4 px-1 pb-2 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600/70 dark:text-blue-400">
            {category}
          </p>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-bold text-slate-400">{rating}</span>
          </div>
        </div>
        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-slate-100 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className={`text-[11px] font-medium ${available ? "text-slate-500 dark:text-slate-400" : "text-slate-400 italic dark:text-slate-500"}`}>
          {stock}
        </p>

        <div className="flex items-center justify-between gap-3 pt-3">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-[10px] text-slate-400 line-through font-medium leading-none dark:text-slate-500">
                {oldPrice.toLocaleString("en-US")} kr
              </span>
            )}
            <span
              className={`text-lg font-black tracking-tight ${
                available
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {price.toLocaleString("en-US")} kr
            </span>
          </div>

          <button
            type="button"
            disabled={!available}
            onClick={onAddToCart}
            aria-label="Add to cart"
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-5 text-xs font-bold transition-all duration-300 ${
              available
                ? "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:shadow-blue-900/40"
                : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
            }`}
          >
            {available ? "Add to cart" : "Notify Me"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
