// src/pages/Checkout.js
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, getTotal, checkout } = useCart();
  const [method, setMethod] = useState('mvola');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // SIMULE UN USER CONNECTÉ (plus tard via AuthContext)
  const userId = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await checkout(userId); // → Crée la vraie commande
      toast.success('Commande créée avec succès !');
      navigate('/confirmation');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = getTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finaliser l'inscription</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl mb-2">Récapitulatif</h2>
          {cart.map(item => (
            <div key={item.id} className="py-1">
              {item.name} - {item.price.toLocaleString()} Ar
            </div>
          ))}
          <div className="font-bold mt-2">Total: {total.toLocaleString()} Ar</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="mvola">Mvola</option>
            <option value="orange">Orange Money</option>
            <option value="cash">Espèces</option>
          </select>

          {method !== 'cash' && (
            <input
              type="text"
              placeholder={method === 'mvola' ? 'Numéro Mvola' : 'Numéro Orange Money'}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-900 text-white p-3 w-full rounded font-bold hover:bg-blue-800 transition"
          >
            {loading ? 'Traitement...' : 'Payer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;