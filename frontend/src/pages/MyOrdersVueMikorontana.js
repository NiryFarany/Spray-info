import { useEffect, useState } from 'react';
import { getUserOrders, cancelOrder, reactivateOrder } from '../services/orderService';
import { Link } from 'react-router-dom';
import {  ArrowLeftIcon} from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
 
                              
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = 1; // SIMULE user.id

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
    <div className="container mx-auto p-6">
      <button onClick={() => navigate("/clientData")}
      className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
      {/* //⬅ Retour */}
      <ArrowLeftIcon className="h-5 w-5 mr-2" /> 
      </button>

      <h1 className="text-3xl font-bold mb-6">Mes Commandes</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">Aucune commande pour le moment.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Commande {order.id}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'paid' ? 'bg-green-200' :
                  order.status === 'pending' ? 'bg-yellow-200' :
                  'bg-red-200'
                }`}>
                  {order.status}
                </span>

                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="mt-3 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Annuler tsy mety mety miankina @ user service ve?
                  </button>
                )}
                {order.status === 'cancelled' && (
                  <button
                    onClick={() => handlePending(order.id)}
                    className="mt-3 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                  >
                    Remettre à l'état 'en attente tsy mety' 
                  </button>
                )}

                {/* {order.status === 'pending' && (
                <button
                    onClick={() => handleCancel(order.id)}
                    className="mt-3 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                >
                    Annuler
                </button>
                )}
                {order.status === 'cancelled' && (
                <button
                    onClick={() => handlePending(order.id)}
                    className="mt-3 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs"
                >
                    Remettre en attente
                </button>
                )} */}
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p className="font-semibold text-blue-600">
                {order.total_amount.toLocaleString()} Ar
              </p>
              <Link
                to={`/order/${order.id}`}
                className="text-sm text-blue-600 hover:underline mt-2 inline-block"
              >
                Voir détails →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}