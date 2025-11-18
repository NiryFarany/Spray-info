import React, { createContext, useContext, useState } from "react";

// Création du contexte
const CartContext = createContext();

// ✅ Hook personnalisé
export const useCart = () => useContext(CartContext);

// ✅ Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (formation) => {
    console.log("FORMATION AJOUTÉE :", formation);
    setCart((prev) => [...prev, formation]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Export du contexte brut si besoin
export { CartContext };
