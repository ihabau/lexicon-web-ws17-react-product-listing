import { createContext, type Dispatch } from "react";
import type { ShopAction, ShopState } from "../state/shopReducer.ts";

export interface ShopContextValue {
  state: ShopState;
  dispatch: Dispatch<ShopAction>;
  cartCount: number;
  cartTotal: number;
}

export const ShopContext = createContext<ShopContextValue | undefined>(
  undefined,
);
