export type SortBy =
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Best Selling";

export type CartProduct = {
  title: string;
  price: number;
  image: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

export type ShopState = {
  selectedTag: string;
  selectedCategory: string;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: SortBy;
  page: number;
  cartItems: CartItem[];
  cartOpen: boolean;
};

export type ShopAction =
  | { type: "TOGGLE_TAG"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_MAX_PRICE"; payload: number }
  | { type: "SET_IN_STOCK_ONLY"; payload: boolean }
  | { type: "SET_ON_SALE_ONLY"; payload: boolean }
  | { type: "SET_SORT"; payload: SortBy }
  | { type: "SET_PAGE"; payload: number }
  | { type: "ADD_TO_CART"; payload: CartProduct }
  | { type: "REMOVE_FROM_CART"; payload: { title: string } }
  | { type: "CHANGE_QUANTITY"; payload: { title: string; delta: number } }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "RESET_FILTERS" };

export const initialShopState: ShopState = {
  selectedTag: "All",
  selectedCategory: "All Products",
  maxPrice: 2000,
  inStockOnly: false,
  onSaleOnly: false,
  sortBy: "Newest",
  page: 1,
  cartItems: [],
  cartOpen: false,
};

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "TOGGLE_TAG":
      return {
        ...state,
        selectedTag:
          state.selectedTag === action.payload ? "All" : action.payload,
        page: 1,
      };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload, page: 1 };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload, page: 1 };
    case "SET_IN_STOCK_ONLY":
      return { ...state, inStockOnly: action.payload, page: 1 };
    case "SET_ON_SALE_ONLY":
      return { ...state, onSaleOnly: action.payload, page: 1 };
    case "SET_SORT":
      return { ...state, sortBy: action.payload, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "ADD_TO_CART":
      return {
        ...state,
        cartOpen: true,
        cartItems: state.cartItems.some(
          (item) => item.title === action.payload.title,
        )
          ? state.cartItems.map((item) =>
              item.title === action.payload.title
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.title !== action.payload.title,
        ),
      };
    case "CHANGE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.title === action.payload.title
              ? { ...item, quantity: item.quantity + action.payload.delta }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "SET_CART_OPEN":
      return { ...state, cartOpen: action.payload };
    case "RESET_FILTERS":
      return {
        ...state,
        selectedTag: "All",
        selectedCategory: "All Products",
        maxPrice: 2000,
        inStockOnly: false,
        onSaleOnly: false,
        sortBy: "Newest",
        page: 1,
      };
    default:
      return state;
  }
}
