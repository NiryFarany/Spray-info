// src/pages/OrderDetail.js

//vo hovaiko juste avy natao copie collé t@ OrderDetail
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/orderService';
import {  ArrowLeftIcon} from '@heroicons/react/solid';


export default function AdminOrderDetailInOrder_items() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrder(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate('/my-orders'), 2000);
      }
    };
    fetchOrder();
  }, [id, navigate]);

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!order) return <p className="text-center">Chargement...</p>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <button onClick={() => navigate("/admin/orders")}
      className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
      {/* //⬅ Retour */}
      <ArrowLeftIcon className="h-5 w-5 mr-2" /> 
      </button>
      <h1 className="text-3xl font-bold mb-4">Commande number {order.id}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-lg mb-2">
          <strong>Statut:</strong>{' '}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === 'paid' ? 'bg-green-100 text-green-800' :
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {order.status.toUpperCase()}
          </span>
        </p>
        <p className="mb-2"><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p className="text-xl font-bold mb-4">
          Total: <span className="text-blue-600">{order.total_amount.toLocaleString()} Ar</span>
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Formations commandées :</h2>
        <ul className="space-y-2">
          {order.items.map(item => (
            <li key={item.formation_id} className="flex justify-between border-b pb-2">
              <span>{item.formation_name}</span>
              <span className="font-medium">{item.price.toLocaleString()} Ar</span>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-3">user  info :</h2>
        name: info plus tard
      </div>
    </div>
  );
}