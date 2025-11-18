import { useEffect, useState } from 'react';
import { getUserOrders } from '../services/orderService';
import { useAuth } from '../context/AuthContext'; // À créer plus tard
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Simule : { id: 1 }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.id);
        setOrders(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.id]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border p-4 rounded-lg">
              <div className="flex justify-between">
                <h2 className="font-bold">Commande #{order.id}</h2>
                <span className={`px-2 py-1 rounded text-sm ${
                  order.status === 'paid' ? 'bg-green-200' :
                  order.status === 'pending' ? 'bg-yellow-200' :
                  'bg-red-200'
                }`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <p>Total: {order.total_amount.toLocaleString()} Ar</p>
              <Link to={`/order/${order.id}`} className="text-blue-600">
                Voir détails →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
////taloha fa nandeha ty