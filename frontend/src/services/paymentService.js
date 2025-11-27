// src/services/paymentService.js
//const PAYMENT_API = 'http://localhost:5004/'; pour docker miala localhost
const PAYMENT_API = 'http://payment-service:5000/';

export const initiatePayment = async (orderId, phone) => {
  const response = await fetch(`${PAYMENT_API}/pay/${orderId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Paiement échoué');
  }

  return response.json();
};


//afficher tous  payment pour Admin
export const getAllPayment = async () => {
  //const response = await fetch(PAYMENT_API);
  const response = await fetch(`${PAYMENT_API}payments`); // <-- ICI !  @slash @ order_routes @ backend agn kay reto items reto
  if (!response.ok) throw new Error('Échec chargement commandes admin');
  return response.json();
};
//payments
