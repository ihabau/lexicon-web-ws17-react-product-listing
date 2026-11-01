import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

type CartItem = {
  title: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartDrawerProps {
  items: CartItem[];
  open: boolean;
  onClose: () => void;
  onRemove: (title: string) => void;
  onChangeQuantity: (title: string, delta: number) => void;
}

const CartDrawer = ({
  items,
  open,
  onClose,
  onRemove,
  onChangeQuantity,
}: CartDrawerProps) => {
  if (!open) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-blue-600" />
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Your cart
            </h2>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ShoppingBag size={28} />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-900">
                Your cart is empty
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Add a product to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-16 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.price.toLocaleString("en-US")} kr
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.title)}
                        aria-label={`Remove ${item.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(item.title, -1)}
                          aria-label={`Decrease ${item.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center text-slate-500 hover:text-blue-600"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(item.title, 1)}
                          aria-label={`Increase ${item.title}`}
                          className="inline-flex h-8 w-8 items-center justify-center text-slate-500 hover:text-blue-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-black text-slate-900">
                        {(item.price * item.quantity).toLocaleString("en-US")} kr
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Total</span>
            <span className="text-lg font-black text-slate-900">
              {total.toLocaleString("en-US")} kr
            </span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="mt-3 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
