// src/pages/Confirmation.js
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  const { orderId } = useCart();

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Commande confirmée !
      </h1>
      <p className="text-lg mb-2">
        Votre commande <strong>#{orderId}</strong> a été enregistrée.
      </p>
      <p className="mb-6">
        Vous recevrez un email avec les détails de paiement.
      </p>
      <Link
        to="/formations"
        className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
      >
        Retour aux formations
      </Link>
    </div>
  );
}