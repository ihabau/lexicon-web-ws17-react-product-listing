import { useContext } from "react";
import { ShopContext } from "../context/ShopContext.ts";

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
};
