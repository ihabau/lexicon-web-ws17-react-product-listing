import { useMemo, useReducer, type ReactNode } from "react";
import { ShopContext } from "./ShopContext.ts";
import { initialShopState, shopReducer } from "../state/shopReducer.ts";

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(shopReducer, initialShopState);

  const cartCount = useMemo(
    () => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [state.cartItems],
  );

  const cartTotal = useMemo(
    () =>
      state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    [state.cartItems],
  );

  return (
    <ShopContext.Provider value={{ state, dispatch, cartCount, cartTotal }}>
      {children}
    </ShopContext.Provider>
  );
};
