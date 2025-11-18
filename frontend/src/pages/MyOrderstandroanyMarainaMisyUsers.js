import { useEffect, useState } from 'react';
import { getUserOrders, cancelOrder, reactivateOrder } from '../services/orderService';
import { initiatePayment } from '../services/paymentService'; // PAIEMENT
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { getProfile } from '../services/userService';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [payingOrderId, setPayingOrderId] = useState(null);
  const navigate = useNavigate();
  const userId = 1; // SIMULÉ (sera remplacé par JWT plus tard)
  useEffect(() => {
  const checkAuth = async () => {
    try {
      await getProfile();
    } catch {
      navigate('/login');
    }
  };
  checkAuth();
}, [navigate]);

  // === PAIEMENT MVOLA ===
  const handlePay = async (orderId) => {
    if (!phone || phone.length < 10) {
      alert('Veuillez entrer un numéro Mvola valide (ex: 0341234567)');
      return;
    }
    setPayingOrderId(orderId);
    try {
      await initiatePayment(orderId, phone);
      alert('Paiement réussi ! Votre commande est maintenant payée.');
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'paid' } : o))
      );
      setPhone('');
    } catch (error) {
      alert(error.message || 'Échec du paiement');
    } finally {
      setPayingOrderId(null);
    }
  };

  // === ANNULER COMMANDE ===
  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      alert("Commande annulée avec succès");
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // === RÉACTIVER COMMANDE ===
  const handlePending = async (orderId) => {
    try {
      await reactivateOrder(orderId);
      alert("Commande remise à l'état 'en attente'");
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'pending' } : o))
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // === CHARGER LES COMMANDES ===
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        alert(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-10 text-lg">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* === BOUTON RETOUR + TITRE === */}
      <div className="flex items-center mb-8 max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/clientData")}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour
        </button>
        <h1 className="text-3xl font-bold text-blue-800 mx-auto">
          Mes Commandes
        </h1>
      </div>

      {/* === FORMULAIRE MVOLA GLOBAL === */}
      <div className="mb-10 p-6 bg-blue-50 rounded-xl shadow-sm max-w-2xl mx-auto">
        <label className="block text-sm font-semibold text-blue-800 mb-2">
          Numéro Mvola pour le paiement :
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="034 12 345 67"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-xs text-blue-600 mt-2">
          Entrez votre numéro Mvola pour payer n'importe quelle commande en attente
        </p>
      </div>

      {/* === LISTE DES COMMANDES === */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto px-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-800">Commande {order.id}</h3>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {order.status === 'paid'
                  ? 'Payée'
                  : order.status === 'pending'
                  ? 'En attente'
                  : 'Annulée'}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-1">
              {new Date(order.created_at).toLocaleDateString('fr-FR')}
            </p>
            <p className="font-semibold text-blue-700 mb-3 text-lg">
              {order.total_amount.toLocaleString()} Ar
            </p>

            <Link
              to={`/order/${order.id}`}
              className="text-sm text-blue-600 hover:underline block mb-4"
            >
              Voir détails →
            </Link>

            {/* === ACTIONS === */}
            <div className="flex flex-wrap gap-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handlePay(order.id)}
                    disabled={payingOrderId === order.id || !phone}
                    className={`px-4 py-1 rounded shadow text-xs font-medium transition ${
                      payingOrderId === order.id
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : !phone
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {payingOrderId === order.id ? 'Paiement...' : 'Payer Mvola'}
                  </button>
                </>
              )}

              {order.status === 'cancelled' && (
                <button
                  onClick={() => handlePending(order.id)}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow text-xs transition"
                >
                  Remettre en attente
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
//My order vo t@ maraina ty