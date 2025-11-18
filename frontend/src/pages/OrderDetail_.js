import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../services/orderService';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrder(id);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Commande #{order.id}</h1>
      <p className="text-lg">Statut: <strong>{order.status}</strong></p>
      <p>Date: {new Date(order.created_at).toLocaleString()}</p>
      <p>Total: <strong>{order.total_amount.toLocaleString()} Ar</strong></p>

      <h2 className="text-xl mt-4">Formations :</h2>
      <ul className="list-disc pl-6">
        {order.items.map(item => (
          <li key={item.formation_id}>
            {item.formation_name} - {item.price.toLocaleString()} Ar
          </li>
        ))}
      </ul>
    </div>
  );
}