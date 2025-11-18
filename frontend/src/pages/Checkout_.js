// src/pages/Checkout.js
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
//import orderService from '../services/orderService'; aleo koa ty alana heki koa aloha

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [method, setMethod] = useState('mvola');
  const [details, setDetails] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
  //  await orderService.createOrder({ cart, method, details, total });
    clearCart();
    navigate('/confirmation');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finaliser l'inscription</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl">Récapitulatif</h2>
          {cart.map((item) => (
            <div key={item.id} className="py-2">{item.name} - {item.price} MGA</div>
          ))}
          <div className="font-bold">Total: {total} MGA</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="border p-2 w-full">
            <option value="mvola">Mvola</option>
            <option value="sprayinfo">Compte Spray Info</option>
            <option value="cash">En espèces</option>
          </select>
          {method !== 'cash' && (
            <input
              type="text"
              placeholder={method === 'mvola' ? 'Numéro Mvola' : 'ID Spray Info'}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="border p-2 w-full"
              required
            />
          )}
          <button type="submit" className="bg-blue-900 text-white p-2 w-full">Payer</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;