// src/context/CartContext.js
import { createContext, useContext, useState } from 'react';
import { createOrder } from '../services/orderService';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const addToCart = (formation) => {
    setCart((prev) => {
      // Éviter les doublons
      if (prev.some(item => item.id === formation.id)) {
        toast.info(`${formation.name} est déjà dans le panier !`);
        return prev;
      }
      toast.success(`${formation.name} ajouté au panier !`);
      return [...prev, formation];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const removed = prev.find(item => item.id === id);
      if (removed) {
        toast.warn(`${removed.name} retiré du panier.`);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Panier vidé.');
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  /* const checkout = async (userId) => {
    console.log('CHECKOUT DÉCLENCHÉ !');
    console.log('User ID:', userId);  //miova ty
    console.log('Cart:', cart);
    if (cart.length === 0) {
      throw new Error('Le panier est vide.');
    }

    try {
      const order = await createOrder(userId, cart);
      setOrderId(order.id);
      clearCart();
      toast.success(`Commande #${order.id} créée avec succès !`);
      return order;
    } catch (error) {
      toast.error(error.message || 'Échec de la commande.');
      throw error;
    }
  }; */
  // src/context/CartContext.js → REMPLACE LA FONCTION checkout

  /* const checkout = async () => {
    console.log('CHECKOUT DÉCLENCHÉ !');
    console.log('Cart:', cart);

    if (cart.length === 0) {
      throw new Error('Le panier est vide.');
    }

    try {
      // ON N'ENVOIE PLUS userId → createOrder() utilise le JWT
      const order = await createOrder(cart); // ← PLUS DE PARAMÈTRE !
      setOrderId(order.id);
      clearCart();
      toast.success(`Commande #${order.id} créée avec succès !`);
      return order;
    } catch (error) {
      toast.error(error.message || 'Échec de la commande.');
      throw error;
    }
};
solona ty
 */
// src/context/CartContext.js → VERSION FINALE QUI MARCHE À 1000%

const checkout = async (items) => {  // ← items en paramètre OBLIGATOIRE
  console.log('CHECKOUT DÉCLENCHÉ !');
  console.log('Items envoyés:', items);

  if (!items || items.length === 0) {
    throw new Error('Le panier est vide.');
  }

  try {
    const order = await createOrder(items); // ← on passe bien les items
    setOrderId(order.id);
    clearCart();
    toast.success(`Commande #${order.id} créée avec succès !`);
    return order;
  } catch (error) {
    toast.error(error.message || 'Échec de la commande.');
    throw error;
  }
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