// src/pages/Checkout.js
//import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // AJOUTE ÇA
import { toast } from 'react-toastify';
import { useState } from 'react'; // ← useContext supprimé (inutilisé)

const Checkout = () => {
  //const { cart, getTotal, clearCart } = useCart();
  const { cart, getTotal, checkout, clearCart } = useCart(); // ← checkout ajouté ici !
  const { user } = useAuth(); // RÉCUPÈRE LE VRAI USER CONNECTÉ
  const [method, setMethod] = useState('mvola');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // PROTECTION : Si pas connecté → redirige vers login
  if (!user) {
    navigate('/login');
    return null;
  }

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setLoading(true);
    try {
      // ENVOIE UNIQUEMENT LES ITEMS → LE BACKEND PREND LE user_id DU JWT
      await checkout(cart); // PLUS DE userId !
      toast.success('Commande créée avec succès !');
      clearCart(); // Vide le panier après commande
      navigate('/my-orders'); // Redirige vers mes commandes
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  }; */
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    toast.error('Votre panier est vide');
    return;
  }

  setLoading(true);
  try {
    await checkout(); // ← PLUS DE userId ICI !
    toast.success('Commande créée avec succès !');
    clearCart(); // ← Utilisé → plus de warning
    navigate('/my-orders');
  } catch (err) {
    toast.error(err.message || 'Erreur lors de la commande');
  } finally {
    setLoading(false);
  }
};

  const total = getTotal();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Finaliser votre inscription
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* RÉCAPITULATIF */}
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name}</span>
              <span className="font-medium">{item.price.toLocaleString()} Ar</span>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold text-blue-900">
            Total: {total.toLocaleString()} Ar
          </div>
        </div>

        {/* PAIEMENT */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Méthode de paiement</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-3 border rounded-lg text-lg"
            >
              <option value="mvola">Mvola</option>
              <option value="orange">Orange Money</option>
              <option value="cash">Espèces (sur place)</option>
            </select>
          </div>

          {method !== 'cash' && (
            <div>
              <label className="block text-lg font-medium mb-2">
                Numéro {method === 'mvola' ? 'Mvola' : 'Orange Money'}
              </label>
              <input
                type="tel"
                placeholder="Ex: 034 12 345 67"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-3 border rounded-lg text-lg"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? 'Traitement en cours...' : 'Confirmer & Payer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;