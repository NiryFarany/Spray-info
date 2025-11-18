// src/services/orderService.js
const ORDER_API = 'http://localhost:5003/api/orders';

export const createOrder = async (userId, cartItems) => {
  const items = cartItems.map(item => ({
    formation_id: item.id
  }));

  const response = await fetch(ORDER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      items
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Échec création commande');
  }

  return response.json();
};

export const getUserOrders = async (userId) => {
  const response = await fetch(`${ORDER_API}/user/${userId}`);
  if (!response.ok) throw new Error('Échec récupération commandes');
  return response.json();
};