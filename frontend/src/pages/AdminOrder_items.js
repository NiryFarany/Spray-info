import { useEffect, useState } from 'react';
import { getAllOrder_items } from '../services/orderService';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from "react-router-dom";



export default function AdminOrder_items() {
  const [order_items, setOrder_items] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      const fetch = async () => {
        try {
          const data = await getAllOrder_items();
          setOrder_items(data);
        } catch (err) {
          alert(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetch();
    }, []);
  
    if (loading) return <p className="text-center">Chargement...</p>;
  
   return (
  <div className="max-w-6xl mx-auto p-6">
    
    <button
      onClick={() => navigate("/admin/orders")}
      className="mb-6 flex items-center gap-2 bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      
    </button>

    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
      Détails de toutes les commandes
    </h1>

    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full border-collapse text-center">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 border">ID</th>
            <th className="p-3 border">ID Commande</th>
            <th className="p-3 border">ID Formation</th>
            <th className="p-3 border">Nom Formation</th>
            <th className="p-3 border">Prix (Ar)</th>
          </tr>
        </thead>

        <tbody>
          {order_items.map((o_i, index) => (
            <tr
              key={o_i.id}
              className={`border ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              <td className="p-3">{o_i.id}</td>
              <td className="p-3">{o_i.order_id}</td>
              <td className="p-3">{o_i.formation_id}</td>
              <td className="p-3 font-medium">{o_i.formation_name}</td>
              <td className="p-3 text-green-700 font-semibold">{o_i.price.toLocaleString()} Ar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
 
/* return (
  <div className="max-w-5xl mx-auto p-6">
    <button
      onClick={() => navigate("/admin/orders")}
      className="mb-6 flex items-center gap-2 bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      Toutes les commandes
    </button>

    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
      Détails commandés regroupés par commande
    </h1>

    {Object.entries(
      order_items.reduce((acc, item) => {
        if (!acc[item.order_id]) acc[item.order_id] = [];
        acc[item.order_id].push(item);
        return acc;
      }, {})
    ).map(([orderId, items]) => (
      <div key={orderId} className="mb-8 p-4 shadow-lg border rounded-lg bg-white">

        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🧾 Commande #{orderId} &nbsp;
          <span className="text-sm text-gray-500">({items.length} formations)</span>
        </h2>

        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 border">ID Formation</th>
              <th className="p-3 border">Nom Formation</th>
              <th className="p-3 border">Prix (Ar)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr key={i.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-3 border">{i.formation_id}</td>
                <td className="p-3 border font-medium">{i.formation_name}</td>
                <td className="p-3 border text-green-700 font-semibold">
                  {i.price.toLocaleString()} Ar
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    ))}
  </div>
);
//ok zao ihany
 */}