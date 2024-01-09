import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartBadge, setCartBadge] = useState(0);

  const updateCartBadge = (cart) => {
    const newCartBadge = cart.reduce((total, item) => total + item.qty, 0);
    setCartBadge(newCartBadge);
  };
  return (
    <CartContext.Provider value={{ cartBadge, updateCartBadge }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within the CartProvider");
  }
  return context;
};
