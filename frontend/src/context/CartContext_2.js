// src/context/CartContext.js
import { createContext, useContext, useState } from 'react';
import { createOrder } from '../services/orderService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{ id, name, price }, ...]
  const [orderId, setOrderId] = useState(null);

  const addToCart = (formation) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === formation.id);
      if (exists) return prev;
      return [...prev, formation];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const checkout = async (userId) => {
    if (cart.length === 0) throw new Error("Panier vide");
    const order = await createOrder(userId, cart);
    setOrderId(order.id);
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      checkout,
      orderId
    }}>
      {children}
    </CartContext.Provider>
  );
};