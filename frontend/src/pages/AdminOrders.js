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

  if (loading) return <p className="text-center mt-10 text-xl text-gray-700">Chargement...</p>;

 return (
  <div className="max-w-6xl mx-auto p-6">
    
    {/* Conteneur pour le bouton de retour et le titre */}
    <div className="grid grid-cols-3 items-center mb-8">
      
      {/* Bouton retour : placé très à gauche (justify-self-start) */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white py-2 px-4 rounded-lg transition justify-self-start"
      >
        <ArrowLeftIcon className="h-5 w-5" /> 
      </button>
      
      {/* Titre : centré (col-span-1 au milieu) */}
      <h1 className="text-3xl font-bold text-gray-900 text-center col-span-1">
        Toutes les Commandes
      </h1>
      
      {/* Colonne vide pour l'alignement */}
      <div className="col-span-1"></div>
    </div>


    {/* Tableau */}
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full bg-white border rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
             <th className="p-4 text-left">ID commande</th>
            <th className="p-4 text-left">ID Client</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Statut</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-4 font-medium"> {o.id}</td>
              <td className="p-4 font-medium"> {o.user_id}</td>

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
                      : o.status === "cancelled" // J'ai ajouté 'cancelled' pour correspondre à l'image
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800" // Statut par défaut si non reconnu
                  }`}
                >
                  {o.status}
                </span>
              </td>

              {/* Date */}
              <td className="p-4">
                {new Date(o.created_at).toLocaleDateString()}
              </td>

              {/* Voir détails (Lien dans le tableau) */}
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

    {/* Bouton pour afficher tous les order_items : déplacé en bas et centré */}
    <div className="flex justify-center">
      <button
        onClick={() => navigate("/admin/order_items")}
        className="flex items-center gap-2 bg-blue-700 hover:bg-blue-900 text-white py-2 px-5 rounded-lg transition shadow-md"
      >
        
        Voir détails des articles commandés
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
);
}