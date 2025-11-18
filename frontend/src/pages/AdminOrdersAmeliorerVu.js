// src/pages/AdminOrders.js
import { useEffect, useState } from 'react';
import { getAllOrders } from '../services/orderService';
import { ArrowLeftIcon , ArrowRightIcon} from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p className="text-center">Chargement...</p>;

  /* return (
    <div className="container mx-auto p-6">
      <button onClick={() => navigate("/admin")}
      className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
      {/* //⬅ Retour * /}
      <ArrowLeftIcon className="h-5 w-5 mr-2" /> retour Admin
      </button>
      <h1 className="text-3xl font-bold mb-6">Toutes les Commandes</h1>
      <button onClick={() => navigate("/admin/order_items")}
      className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
      {/* //⬅ Retour * /}
      <ArrowLeftIcon className="h-5 w-5 mr-2" /> voir plus sur toutes les Commandes
      </button>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="p-3 text-left">ID</th> * /}
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                {/* <td className="p-3">{o.id}</td> * /}
                <td className="p-3">User {o.user_id}</td>
                <td className="p-3 font-medium">{o.total_amount.toLocaleString()} Ar</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    o.status === 'paid' ? 'bg-green-200' :
                    o.status === 'pending' ? 'bg-yellow-200' :
                    'bg-red-200'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(o.created_at).toLocaleDateString()} 
                  <Link
                    to={`/Admin/orderDetail/${o.id}`}
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Voir détails 
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
 */
 return (
  <div className="max-w-6xl mx-auto p-6">
    

    {/* Bouton retour */}
    <button
      onClick={() => navigate("/admin")}
      className="mb-6 flex items-center gap-2 bg-gray-800 hover:bg-black text-white py-2 px-4 rounded-lg transition"
    >
      <ArrowLeftIcon className="h-5 w-5" /> retour Admin
      
    </button>
    

    {/* Titre */}
    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
      Toutes les Commandes
    </h1>

    {/* Bouton pour afficher tous les order_items */}
    <button
      onClick={() => navigate("/admin/order_items")}
      className="mb-6 flex items-center gap-2 bg-blue-700 hover:bg-blue-900 text-white py-2 px-5 rounded-lg transition"
    >
      
      Voir détails des articles commandés
      <ArrowRightIcon className="h-5 w-5" />
    </button>

    {/* Tableau */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
            <th className="p-4 text-left">Client</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Statut</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-4 font-medium">User {o.user_id}</td>

              <td className="p-4 font-semibold text-green-700">
                {o.total_amount.toLocaleString()} Ar
              </td>

              {/* Badge du statut */}
              <td className="p-4">
                <span
                  className={`px-3 py-1 text-xs uppercase font-semibold rounded-full
                  ${
                    o.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : o.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {o.status}
                </span>
              </td>

              {/* Date */}
              <td className="p-4">
                {new Date(o.created_at).toLocaleDateString()}
              </td>

              {/* Voir détails */}
              <td className="p-4 text-center">
                <Link
                  to={`/admin/orderDetail/${o.id}`}
                  className="text-blue-600 hover:text-blue-900 underline font-medium"
                >
                  Voir détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
