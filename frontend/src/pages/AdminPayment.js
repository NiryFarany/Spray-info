// src/pages/AdminOrders.js
import { useEffect, useState } from 'react';
import { getAllPayment } from '../services/paymentService';
import { ArrowLeftIcon , ArrowRightIcon} from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function AdminPayment() {
  const [payment, setAllPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllPayment();
        setAllPayment(data);
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
       Payment
      </h1>
      
      {/* Colonne vide pour l'alignement */}
      <div className="col-span-1"></div>
    </div>


    {/* Tableau */}
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full bg-white border rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">ID Order</th>
            <th className="p-4 text-left">Prix</th>
            <th className="p-4 text-left">Methode</th>
            <th className="p-4 text-center">Phone</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Transaction ID</th>
            <th className="p-4 text-center">Date de payment</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {payment.map(p => (
            <tr key={p.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-4 font-medium">{p.id}</td>
              <td className="p-4 font-medium">{p.order_id}</td>

              <td className="p-4 font-semibold text-green-700">
                {p.amount.toLocaleString()} Ar
              </td>
              <td className="p-4 font-medium">User {p.method}</td>
              <td className="p-4 font-medium">User {p.phone}</td>

              {/* Badge du statut */}
              <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      p.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {p.status === 'success' ? 'Succès' : 
                       p.status === 'failed' ? 'Échec' : 'En attente'}
                    </span>
                  </td>
              <td className="p-4 font-medium">User {p.transaction_id}</td>

              {/* Date */}
              <td className="p-4">
                {new Date(p.created_at).toLocaleDateString()}
              </td>

              {/* Voir détails (Lien dans le tableau) */}
              <td className="p-4 text-center">
                <Link
                  to={`/admin/paymentDetail/${p.id}`} 
                  className="text-blue-600 hover:text-blue-900 underline font-medium"
                >
                  {/* plus plus d'info plus tard par exemple le nom ou tel gmail du client qui a payé */}
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
//gn'anah ty avao gn