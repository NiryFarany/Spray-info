// src/pages/AdminPayment.js
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
///recommandé

const PAYMENT_API = 'http://localhost:5004';

export default function AdminPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${PAYMENT_API}/payments`);
        if (!response.ok) throw new Error('Échec chargement');
        const data = await response.json();
        setPayments(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <p className="text-center py-10">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* === HEADER === */}
      <div className="flex items-center mb-8 max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour
        </button>
        <h1 className="text-3xl font-bold text-blue-800 mx-auto">Paiements</h1>
      </div>

      {/* === TABLEAU === */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Prix</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Méthode</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Téléphone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Transaction ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-800">{payment.id}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">#{payment.order_id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    {parseFloat(payment.amount).toLocaleString()} Ar
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                    {payment.method === 'mvola' ? 'Mvola' : payment.method}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{payment.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {payment.status === 'success' ? 'Succès' : 
                       payment.status === 'failed' ? 'Échec' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-600">{payment.transaction_id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(payment.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/order/${payment.order_id}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
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
    </div>
  );
}