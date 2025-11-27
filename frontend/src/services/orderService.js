// src/services/orderService.js
//const ORDER_API = 'http://localhost:5003/api/orders';
//const ORDER_API = 'http://localhost:5003/api/orders/'; //nasina slash ty
//const ORDER_API = 'http://localhost:5003/api/orders'; //averiko tsy asina slash ty pour test bouton cancel et remmettre en pending, tsy miboaky koa gn commande
//const ORDER_API = 'http://localhost:5003/api/orders/';//averina @ty
const ORDER_API = 'http://order-service:5000/api/orders/';//averina @ty, pour docker de miala ny localhost
/* export const createOrder = async (userId, items) => {
  console.log('createOrder appelé !');
  console.log('Payload:', { user_id: userId, items: items.map(i => ({ formation_id: i.id })) });
  const payload = {
    user_id: userId,    //ovana ty
    items: items.map(item => ({ formation_id: item.id }))
  };

  const response = await fetch(ORDER_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Échec création commande');
  }

  return response.json();
}; */
// src/services/orderService.js → REMPLACE createOrder

// src/services/orderService.js

export const createOrder = async (items) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Vous devez être connecté');
  }

  const payload = {
    items: items.map(item => ({
      formation_id: item.id
    }))
  };

  console.log('ENVOI VERS BACKEND:', payload); // Tu vois bien ça dans la console

  const response = await fetch(ORDER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('ERREUR BACKEND:', errorData);
    throw new Error(errorData.error || 'Échec création commande');
  }

  const result = await response.json();
  console.log('COMMANDE CRÉÉE !', result);
  return result;
};

//preparation frontend pour order service


export const getUserOrders = async (userId) => {
  //const response = await fetch(`${ORDER_API}/user/${userId}`);//taloha
  const response = await fetch(`${ORDER_API}user/${userId}`);  // pas de slash avant user
  if (!response.ok) throw new Error('Échec chargement commandes');
  return response.json();
};

//niova anty
// export const getUserOrders = async (userId) => {
//   const response = await fetch(`${ORDER_API}/orders/user/${userId}`);
//   if (!response.ok) throw new Error('Erreur chargement commandes');
//   return response.json();
// };//mitovy ihany

export const getAllOrders = async () => {
  const response = await fetch(ORDER_API);
  if (!response.ok) throw new Error('Échec chargement commandes admin');
  return response.json();
};
//Noble
/* export const getAllOrder_items = async (orderId) => {
  // const response = await fetch(ORDER_API);//aona ty
  const response = await fetch(`${ORDER_API}order/${orderId}`);
  if (!response.ok) throw new Error('Échec chargement voir plus commandes admin');
  return response.json();
}; */
export const getAllOrder_items = async () => {
  const response = await fetch(`${ORDER_API}items`); // <-- ICI !  @slash @ order_routes @ backend agn kay reto items reto
   //const response = await fetch(ORDER_API);//aona ty
  //const response = await fetch(`${ORDER_API}order/${orderId}`);
  if (!response.ok) throw new Error('Échec chargement voir plus commandes admin');
  return response.json();
};

//Noble
export const getOrder = async (orderId) => {
  // const response = await fetch(`${ORDER_API}/${orderId}`); //taloha
  const response = await fetch(`${ORDER_API}order/${orderId}`);
  if (!response.ok) throw new Error('Commande introuvable');
  return response.json();
};

/* export const cancelOrder = async (orderId) => {
  const response = await fetch(`${ORDER_API}/${orderId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Échec annulation');
  }
  return response.json();
}; */

// src/services/orderService.js

export const cancelOrder = async (orderId) => {
  // const token = localStorage.getItem("token"); // ✅ récupère le token stocké après login
  ///|| "dummy-token"; // SIMULE
  const token = localStorage.getItem("token")|| "dummy-jwt-token-2025"; // SIMULE

  const response = await fetch(`${ORDER_API}${orderId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,  // ✅ on envoie le token au backend
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Échec annulation");
  }

  return response.json();
};

//remettre en etat pending
// src/services/orderService.js

export const reactivateOrder = async (orderId) => {
  const token = localStorage.getItem("token") || "dummy-jwt-token-2025";
  const response = await fetch(`${ORDER_API}/${orderId}/reactivate`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Échec réactivation");
  }
  return response.json();
};

