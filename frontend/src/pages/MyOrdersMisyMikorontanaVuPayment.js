import { useEffect, useState } from 'react';
import { getUserOrders, cancelOrder, reactivateOrder } from '../services/orderService';
import { Link } from 'react-router-dom';
import {  ArrowLeftIcon} from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
import { initiatePayment } from '../services/paymentService'; // AJOUT pour payment service
 
                              
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = 1; // SIMULE user.id

  //payment service
  const [phone, setPhone] = useState('');           // Numéro Mvola
  const [payingOrderId, setPayingOrderId] = useState(null); // Commande en cours de paiement
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
      prev.map(o => o.id === orderId ? { ...o, status: 'paid' } : o)
    );
    setPhone(''); // Réinitialise le champ
  } catch (error) {
    alert(error.message);
  } finally {
    setPayingOrderId(null);
  }
};
  //payment service

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      alert("Commande annulée avec succès ✅");
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: "cancelled" } : o))
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePending = async (orderId) => {
    try {
      await reactivateOrder(orderId); // Appeler l'API pour réactiver la commande
      alert("Commande remise à l'état 'en attente' ✅");
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: "pending" } : o))
      );
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center mb-8">
        <button
            onClick={() => navigate("/clientData")}
            className="bg-gray-600 text-white py-2 px-4 rounded-md flex items-center"
        >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Retour
        </button>
        <h1 className="text-3xl font-bold text-blue-800 mx-auto">
            Mes Commandes
        </h1>
      </div>
      {/* payment service  */}
      <div className="mb-8 p-5 bg-blue-50 rounded-xl shadow-sm">
        <label className="block text-sm font-semibold text-blue-800 mb-2">
          Numéro Mvola pour le paiement :
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="034 12 345 67"
          className="w-full max-w-md px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-xs text-blue-600 mt-1">
          Entrez votre numéro Mvola pour payer n'importe quelle commande
        </p>
      </div>
      {/* payment service */}



    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
  {orders.map(order => (
    <div key={order.id} className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-gray-800">Commande {order.id}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          order.status === 'paid' ? 'bg-green-100 text-green-700' :
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {order.status === 'paid' ? 'Payée' :
           order.status === 'pending' ? 'pending' : 'cancelled'}
        </span>
        {/* <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          order.status === 'paid' ? 'bg-green-100 text-green-700' :
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {order.status === 'paid' ? 'Payée' :
          order.status === 'pending' ? 'En attente' : 'Annulée'}
        </span> */}
      </div>
      <p className="text-sm text-gray-500 mb-1">
        {new Date(order.created_at).toLocaleDateString()}
      </p>
      <p className="font-semibold text-blue-700 mb-3 text-lg">
        {order.total_amount.toLocaleString()} Ar
      </p>
      <Link
        to={`/order/${order.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        Voir détails →
      </Link>
      <div className="mt-4 flex flex-wrap gap-2">
        {order.status === 'pending' && (
          <button
            onClick={() => handleCancel(order.id)}
            className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs"
          >
            Annuler
          </button>
        )}
        {order.status === 'cancelled' && (
          <button
            onClick={() => handlePending(order.id)}
            className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow text-xs"
          >
            Remettre en attente
          </button>
        )}
        {/*payment service */}
        {order.status === 'pending' && (
            <>
              <button
                onClick={() => handleCancel(order.id)}
                className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs"
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
        {/*payment service */}
      </div>
    </div>
  ))}
</div>
</div>

 );
}