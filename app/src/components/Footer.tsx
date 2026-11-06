import { AtSign, Camera, Package } from "lucide-react";
import { useShop } from "../hooks/useShop.ts";

const year = new Date().getFullYear();

const shopTags = ["New Arrival", "Men", "Women", "Sale"];

const Footer = () => {
  const { state, dispatch } = useShop();
  const { selectedTag } = state;

  const handleTagChange = (tag: string) => {
    dispatch({ type: "TOGGLE_TAG", payload: tag });
  };

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <a
              href="#"
              className="flex items-center gap-2 font-bold tracking-tight text-slate-900 dark:text-slate-100"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
                <Package size={20} strokeWidth={2.5} />
              </span>
              <span className="text-xl tracking-tighter uppercase font-black">
                LITE.SHOP
              </span>
            </a>

            <p className="max-w-xs text-sm text-slate-500 leading-relaxed font-medium dark:text-slate-400">
              Modern e-commerce experience built for speed and elegance.
              Discover the latest trends in outerwear, footwear and accessories.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white"
              >
                <AtSign size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white"
              >
                <Camera size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">
              Shop
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              {shopTags.map((tag) => (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => handleTagChange(tag)}
                    aria-current={selectedTag === tag ? "page" : undefined}
                    className={`transition-colors hover:text-blue-600 ${
                      selectedTag === tag
                        ? "text-blue-600 underline underline-offset-4"
                        : ""
                    }`}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-slate-100 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
            © {year} LITE.SHOP. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-100"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
