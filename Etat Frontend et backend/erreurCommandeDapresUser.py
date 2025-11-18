'''
Download the React DevTools for a better development experience: https://react.dev/link/react-devtools bundle.js:19673:50
Formation: 
Object { dates: "2025-09-41", description: "reseau pro", id: 8, location: "Fianara", name: "Reseau Pro", price: 150000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025/11/14", description: "Dev Dikcit", id: 9, location: "Fianarantsoa", name: "Dev Pro", price: 150000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025/11/27", description: "tonga de mahay devops ianao", id: 11, location: "Imandry Fianarnatsoa", name: "DevOps Pro", price: 800000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025-11-15", description: "dddd", id: 12, location: "Imandry", name: "data", price: 180000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025-09-41", description: "reseau pro", id: 8, location: "Fianara", name: "Reseau Pro", price: 150000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025/11/14", description: "Dev Dikcit", id: 9, location: "Fianarantsoa", name: "Dev Pro", price: 150000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025/11/27", description: "tonga de mahay devops ianao", id: 11, location: "Imandry Fianarnatsoa", name: "DevOps Pro", price: 800000 }
bundle.js:75264:17
Formation: 
Object { dates: "2025-11-15", description: "dddd", id: 12, location: "Imandry", name: "data", price: 180000 }
bundle.js:75264:17
CHECKOUT DÉCLENCHÉ ! bundle.js:72024:13
Cart: 
Array [ {…} ]
bundle.js:72025:13
ENVOI VERS BACKEND: 
Object { items: (1) […] }
bundle.js:77287:11
ERREUR BACKEND: 
Object { msg: "Subject must be a string" }
bundle.js:77299:13noblette@noblette:~/Documents/CommenceACodeSpray/backend/user-service$ source .venv/bin/activate
(.venv) noblette@noblette:~/Documents/CommenceACodeSpray/backend/user-service$ python3 run.py 
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 106-068-016
127.0.0.1 - - [15/Nov/2025 09:03:48] "OPTIONS /login HTTP/1.1" 200 -
127.0.0.1 - - [15/Nov/2025 09:03:48] "POST /login HTTP/1.1" 200 -
noblette@noblette:~/Documents/CommenceACodeSpray/backend/order-service$ source .venv/bin/activate
(.venv) noblette@noblette:~/Documents/CommenceACodeSpray/backend/order-service$ python3 run.py 
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5003
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 601-191-169
127.0.0.1 - - [15/Nov/2025 09:03:50] "GET /api/orders/user/2 HTTP/1.1" 200 -
127.0.0.1 - - [15/Nov/2025 09:04:21] "OPTIONS /api/orders/ HTTP/1.1" 200 -
127.0.0.1 - - [15/Nov/2025 09:04:21] "POST /api/orders/ HTTP/1.1" 422 -
noblette@noblette:~/Documents/CommenceACodeSpray/backend/formation-service$ source .venv/bin/activate
(.venv) noblette@noblette:~/Documents/CommenceACodeSpray/backend/formation-service$ python3 run.py 
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5002
 * Running on http://192.168.1.218:5002
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 965-456-887
127.0.0.1 - - [15/Nov/2025 09:01:04] "GET /api/formations HTTP/1.1" 308 -
127.0.0.1 - - [15/Nov/2025 09:01:05] "GET /api/formations/ HTTP/1.1" 200 -
127.0.0.1 - - [15/Nov/2025 09:01:09] "GET /api/formations HTTP/1.1" 308 -
127.0.0.1 - - [15/Nov/2025 09:01:09] "GET /api/formations/ HTTP/1.1" 200 -
127.0.0.1 - - [15/Nov/2025 09:04:07] "GET /api/formations HTTP/1.1" 308 -
127.0.0.1 - - [15/Nov/2025 09:04:07] "GET /api/formations/ HTTP/1.1" 200 -mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| formation_db       |
| information_schema |
| order_db           |
| payment_db         |
| performance_schema |
| user_db            |
+--------------------+
6 rows in set (0.00 sec)

mysql> use user_db;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select * from user;
+----+----------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+---------------------+
| id | name     | email               | password_hash                                                                                                                                                      | is_admin | created_at          |
+----+----------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+---------------------+
|  1 | Admin    | admin@sprayinfo.com | scrypt:32768:8:1$QTy7KFxhVoF6hfU4$cdaeed4202546ffd486ffbaded164d2775e9ab112f9b9daf4214a229a7ee8ac563a12006e07dc44e13fe1086e81bb01ff2bc7d1c1a1f3b840bbff6eb0479ef8d |        0 | 2025-11-13 07:09:55 |
|  2 | Fenotoky | fenotoky@gmail.com  | scrypt:32768:8:1$lBnlBRdIuMxBpxec$d2eed698a54ae29086fd23db00d59b7c1fb4e64c6d9e285f205b86697b1a005e1da55bc1ddfad3b3237afd4b2a2aac43132b065ae0f02cb59155736b0b926300 |        0 | 2025-11-13 08:21:03 |
+----+----------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+---------------------+
2 rows in set (0.00 sec)

mysql> use order_db;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select * from orders;
+----+---------+--------------+-----------+---------------------+
| id | user_id | total_amount | status    | created_at          |
+----+---------+--------------+-----------+---------------------+
|  1 |       1 |       220000 | paid      | 2025-11-08 13:23:12 |
|  2 |       1 |       150000 | pending   | 2025-11-08 14:42:55 |
|  5 |       1 |       180000 | paid      | 2025-11-10 06:19:19 |
|  6 |       1 |       200000 | pending   | 2025-11-10 06:46:48 |
|  8 |       1 |       800000 | cancelled | 2025-11-10 07:56:58 |
|  9 |       1 |       800000 | pending   | 2025-11-10 15:19:45 |
| 10 |       1 |       800000 | pending   | 2025-11-13 11:01:00 |
| 11 |       1 |       800000 | pending   | 2025-11-13 11:05:28 |
| 12 |       1 |       150000 | pending   | 2025-11-14 07:48:56 |
+----+---------+--------------+-----------+---------------------+
9 rows in set (0.00 sec)

mysql> 
La commande n'est pas créé, c'est le probleme ici, j'ai login en tant que fenotoky et connexion reussi et c'est normale que la commande est vide dans myorders alors je suis allé vers formation et a cliqué devpro, et puis cart et puiu checkout et voilà erreur creation commande; login.js: // src/pages/Login.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userService'; // NAMED
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const primaryColor = '#314482';

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      alert('Connexion réussie !');
      navigate('/my-orders');
      //navigate('/clientData');//ok kolahy, sady mandeha automatique hoe tsisy commande, tsy haiko hoe aona fa tokony hisy message kosa aloha hoe mbola zero commande
      //angao hek
      //navigate('/admin'); //si admin de redirigé ato
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 w-full max-w-md rounded-xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <img src={SprayInfoLogo} alt="Logo" className="h-16 w-16 mx-auto mb-3 rounded-full border-2 border-blue-600 shadow-md" />
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome!</h2>
          <p className="text-gray-500 mt-1">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email requis', pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' } })}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
              style={{ '--tw-ring-color': primaryColor }}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Mot de passe requis', minLength: { value: 6, message: '6 caractères min' } })}
                className={`w-full p-3 pr-12 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
                style={{ '--tw-ring-color': primaryColor }}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 cursor-pointer">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: primaryColor }}
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <a href="#" style={{ color: primaryColor }} className="text-sm hover:underline" onClick={(e) => { e.preventDefault(); alert('Mot de passe oublié'); }}>
            Mot de passe oublié ?
          </a>
          <p className="text-sm text-gray-600 mt-4">
            Pas de compte ? <a href="/register" style={{ color: primaryColor }} className="font-semibold hover:underline">S'inscrire</a>
          </p>
        </div> 
        alana hek ty zany
        */}
        {/* // Dans le bas du formulaire */}
        <div className="mt-6 text-center">
        <button
            type="button"
            style={{ color: primaryColor }}
            className="text-sm hover:underline"
            onClick={() => alert('Mot de passe oublié')}
        >
            Mot de passe oublié ?
        </button>
        <p className="text-sm text-gray-600 mt-4">
            Pas de compte ?{' '}
            <a
            href="/register"
            style={{ color: primaryColor }}
            className="font-semibold hover:underline"
            >
            S'inscrire
            </a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
MyOrders.js: import { useEffect, useState } from 'react';
import { getUserOrders, cancelOrder, reactivateOrder } from '../services/orderService';
import { initiatePayment } from '../services/paymentService'; // PAIEMENT
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
//import { getProfile } from '../services/userService'; //tsy miasa ty zany
import { getCurrentUser } from '../services/userService'; // CHANGÉ ICI

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [payingOrderId, setPayingOrderId] = useState(null);
  const navigate = useNavigate();
  //const userId = 1; // SIMULÉ (sera remplacé par JWT plus tard)

  // RÉCUPÈRE LE VRAI USER CONNECTÉ
  const user = getCurrentUser();
  const userId = user?.id;

  // PROTECTION : Si pas connecté → login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  

  
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(userId); // ICI LE BON userId
        setOrders(data);
      } catch (err) {
        alert(err.message || 'Erreur chargement commandes');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

 

  // === PAIEMENT MVOLA ===
  const handlePay = async (orderId) => {
    if (!phone || phone.length < 10) {
      alert('Veuillez entrer un numéro Mvola valide (ex: 0341234567)');
      return;
    }
    setPayingOrderId(orderId);
    try {
      await initiatePayment(orderId, phone);
      alert('Paiement réussi ! Votre commande est maintenant payée.');
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'paid' } : o))
      );
      setPhone('');
    } catch (error) {
      alert(error.message || 'Échec du paiement');
    } finally {
      setPayingOrderId(null);
    }
  };

  // === ANNULER COMMANDE ===
  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      alert("Commande annulée avec succès");
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // === RÉACTIVER COMMANDE ===
  const handlePending = async (orderId) => {
    try {
      await reactivateOrder(orderId);
      alert("Commande remise à l'état 'en attente'");
      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: 'pending' } : o))
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // === CHARGER LES COMMANDES ===
  /* useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch (err) {
        alert(err.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
 */
  if (loading) return <p className="text-center py-10 text-lg">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* === BOUTON RETOUR + TITRE === */}
      <div className="flex items-center mb-8 max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/clientData")}
          className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center transition"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour
        </button>
        <h1 className="text-3xl font-bold text-blue-800 mx-auto">
          Mes Commandes
        </h1>
      </div>

      {/* === FORMULAIRE MVOLA GLOBAL === */}
      <div className="mb-10 p-6 bg-blue-50 rounded-xl shadow-sm max-w-2xl mx-auto">
        <label className="block text-sm font-semibold text-blue-800 mb-2">
          Numéro Mvola pour le paiement :
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="034 12 345 67"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-xs text-blue-600 mt-2">
          Entrez votre numéro Mvola pour payer n'importe quelle commande en attente
        </p>
      </div>

      {/* === LISTE DES COMMANDES === */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto px-4">
        {orders.map(order => (
          <div
            key={order.id}
            className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-800">Commande {order.id}</h3>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {order.status === 'paid'
                  ? 'Payée'
                  : order.status === 'pending'
                  ? 'En attente'
                  : 'Annulée'}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-1">
              {new Date(order.created_at).toLocaleDateString('fr-FR')}
            </p>
            <p className="font-semibold text-blue-700 mb-3 text-lg">
              {order.total_amount.toLocaleString()} Ar
            </p>

            <Link
              to={`/order/${order.id}`}
              className="text-sm text-blue-600 hover:underline block mb-4"
            >
              Voir détails →
            </Link>

            {/* === ACTIONS === */}
            <div className="flex flex-wrap gap-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-xs transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handlePay(order.id)}
                    disabled={payingOrderId === order.id || !phone}
                    className={`px-4 py-1 rounded shadow text-xs font-medium transition ${
                      payingOrderId === order.id
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : !phone
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {payingOrderId === order.id ? 'Paiement...' : 'Payer Mvola'}
                  </button>
                </>
              )}

              {order.status === 'cancelled' && (
                <button
                  onClick={() => handlePending(order.id)}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow text-xs transition"
                >
                  Remettre en attente
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
CartContext.js: // src/context/CartContext.js
import { createContext, useContext, useState } from 'react';
import { createOrder } from '../services/orderService';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const addToCart = (formation) => {
    setCart((prev) => {
      // Éviter les doublons
      if (prev.some(item => item.id === formation.id)) {
        toast.info(`${formation.name} est déjà dans le panier !`);
        return prev;
      }
      toast.success(`${formation.name} ajouté au panier !`);
      return [...prev, formation];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const removed = prev.find(item => item.id === id);
      if (removed) {
        toast.warn(`${removed.name} retiré du panier.`);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Panier vidé.');
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  /* const checkout = async (userId) => {
    console.log('CHECKOUT DÉCLENCHÉ !');
    console.log('User ID:', userId);  //miova ty
    console.log('Cart:', cart);
    if (cart.length === 0) {
      throw new Error('Le panier est vide.');
    }

    try {
      const order = await createOrder(userId, cart);
      setOrderId(order.id);
      clearCart();
      toast.success(`Commande #${order.id} créée avec succès !`);
      return order;
    } catch (error) {
      toast.error(error.message || 'Échec de la commande.');
      throw error;
    }
  }; */
  // src/context/CartContext.js → REMPLACE LA FONCTION checkout

  const checkout = async () => {
    console.log('CHECKOUT DÉCLENCHÉ !');
    console.log('Cart:', cart);

    if (cart.length === 0) {
      throw new Error('Le panier est vide.');
    }

    try {
      // ON N'ENVOIE PLUS userId → createOrder() utilise le JWT
      const order = await createOrder(cart); // ← PLUS DE PARAMÈTRE !
      setOrderId(order.id);
      clearCart();
      toast.success(`Commande #${order.id} créée avec succès !`);
      return order;
    } catch (error) {
      toast.error(error.message || 'Échec de la commande.');
      throw error;
    }
};


  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      checkout,
      orderId
    }}>
      {children}
    </CartContext.Provider>
  );
};Checkout.js: // src/pages/Checkout.js
//import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // AJOUTE ÇA
import { toast } from 'react-toastify';
import { useState } from 'react'; // ← useContext supprimé (inutilisé)

const Checkout = () => {
  //const { cart, getTotal, clearCart } = useCart();
  const { cart, getTotal, checkout, clearCart } = useCart(); // ← checkout ajouté ici !
  const { user } = useAuth(); // RÉCUPÈRE LE VRAI USER CONNECTÉ
  const [method, setMethod] = useState('mvola');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // PROTECTION : Si pas connecté → redirige vers login
  if (!user) {
    navigate('/login');
    return null;
  }

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }

    setLoading(true);
    try {
      // ENVOIE UNIQUEMENT LES ITEMS → LE BACKEND PREND LE user_id DU JWT
      await checkout(cart); // PLUS DE userId !
      toast.success('Commande créée avec succès !');
      clearCart(); // Vide le panier après commande
      navigate('/my-orders'); // Redirige vers mes commandes
    } catch (err) {
      toast.error(err.message || 'Erreur lors de la commande');
    } finally {
      setLoading(false);
    }
  }; */
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    toast.error('Votre panier est vide');
    return;
  }

  setLoading(true);
  try {
    await checkout(); // ← PLUS DE userId ICI !
    toast.success('Commande créée avec succès !');
    clearCart(); // ← Utilisé → plus de warning
    navigate('/my-orders');
  } catch (err) {
    toast.error(err.message || 'Erreur lors de la commande');
  } finally {
    setLoading(false);
  }
};

  const total = getTotal();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
        Finaliser votre inscription
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* RÉCAPITULATIF */}
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name}</span>
              <span className="font-medium">{item.price.toLocaleString()} Ar</span>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold text-blue-900">
            Total: {total.toLocaleString()} Ar
          </div>
        </div>

        {/* PAIEMENT */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Méthode de paiement</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-3 border rounded-lg text-lg"
            >
              <option value="mvola">Mvola</option>
              <option value="orange">Orange Money</option>
              <option value="cash">Espèces (sur place)</option>
            </select>
          </div>

          {method !== 'cash' && (
            <div>
              <label className="block text-lg font-medium mb-2">
                Numéro {method === 'mvola' ? 'Mvola' : 'Orange Money'}
              </label>
              <input
                type="tel"
                placeholder="Ex: 034 12 345 67"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-3 border rounded-lg text-lg"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? 'Traitement en cours...' : 'Confirmer & Payer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;OrdeService.js: // src/services/orderService.js
//const ORDER_API = 'http://localhost:5003/api/orders';
//const ORDER_API = 'http://localhost:5003/api/orders/'; //nasina slash ty
//const ORDER_API = 'http://localhost:5003/api/orders'; //averiko tsy asina slash ty pour test bouton cancel et remmettre en pending, tsy miboaky koa gn commande
const ORDER_API = 'http://localhost:5003/api/orders/';//averina @ty
/* export const createOrder = async (userId, items) => {
  console.log('createOrder appelé !');
  console.log('Payload:', { user_id: userId, items: items.map(i => ({ formation_id: i.id })) });
  const payload = {
    user_id: userId,    //ovana ty
    items: items.map(item => ({ formation_id: item.id }))
  };

  const response = await fetch(ORDER_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Échec création commande');
  }

  return response.json();
}; */
// src/services/orderService.js → REMPLACE createOrder

// src/services/orderService.js

export const createOrder = async (items) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Vous devez être connecté');
  }

  const payload = {
    items: items.map(item => ({
      formation_id: item.id
    }))
  };

  console.log('ENVOI VERS BACKEND:', payload); // Tu vois bien ça dans la console

  const response = await fetch(ORDER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('ERREUR BACKEND:', errorData);
    throw new Error(errorData.error || 'Échec création commande');
  }

  const result = await response.json();
  console.log('COMMANDE CRÉÉE !', result);
  return result;
};

//preparation frontend pour order service


export const getUserOrders = async (userId) => {
  //const response = await fetch(`${ORDER_API}/user/${userId}`);//taloha
  const response = await fetch(`${ORDER_API}user/${userId}`);  // pas de slash avant user
  if (!response.ok) throw new Error('Échec chargement commandes');
  return response.json();
};

//niova anty
// export const getUserOrders = async (userId) => {
//   const response = await fetch(`${ORDER_API}/orders/user/${userId}`);
//   if (!response.ok) throw new Error('Erreur chargement commandes');
//   return response.json();
// };//mitovy ihany

export const getAllOrders = async () => {
  const response = await fetch(ORDER_API);
  if (!response.ok) throw new Error('Échec chargement commandes admin');
  return response.json();
};
//Noble
/* export const getAllOrder_items = async (orderId) => {
  // const response = await fetch(ORDER_API);//aona ty
  const response = await fetch(`${ORDER_API}order/${orderId}`);
  if (!response.ok) throw new Error('Échec chargement voir plus commandes admin');
  return response.json();
}; */
export const getAllOrder_items = async () => {
  const response = await fetch(`${ORDER_API}items`); // <-- ICI !  @slash @ order_routes @ backend agn kay reto items reto
   //const response = await fetch(ORDER_API);//aona ty
  //const response = await fetch(`${ORDER_API}order/${orderId}`);
  if (!response.ok) throw new Error('Échec chargement voir plus commandes admin');
  return response.json();
};

//Noble
export const getOrder = async (orderId) => {
  // const response = await fetch(`${ORDER_API}/${orderId}`); //taloha
  const response = await fetch(`${ORDER_API}order/${orderId}`);
  if (!response.ok) throw new Error('Commande introuvable');
  return response.json();
};

/* export const cancelOrder = async (orderId) => {
  const response = await fetch(`${ORDER_API}/${orderId}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Échec annulation');
  }
  return response.json();
}; */

// src/services/orderService.js

export const cancelOrder = async (orderId) => {
  // const token = localStorage.getItem("token"); // ✅ récupère le token stocké après login
  ///|| "dummy-token"; // SIMULE
  const token = localStorage.getItem("token")|| "dummy-jwt-token-2025"; // SIMULE

  const response = await fetch(`${ORDER_API}${orderId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,  // ✅ on envoie le token au backend
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Échec annulation");
  }

  return response.json();
};

//remettre en etat pending
// src/services/orderService.js

export const reactivateOrder = async (orderId) => {
  const token = localStorage.getItem("token") || "dummy-jwt-token-2025";
  const response = await fetch(`${ORDER_API}/${orderId}/reactivate`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Échec réactivation");
  }
  return response.json();
};order_routes.py: # order-service/app/routes/order_routes.py
#juste ameliortion pendant code
from flask import Blueprint, request, jsonify # type: ignore
#from . import db
#from app.models.order import db
#from .models.order import Order, OrderItem # type: ignore
from app import db
from app.models.order import Order, OrderItem
import requests
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore


order_bp = Blueprint('order_bp', __name__)

# Récupérer les formations via formation-service
FORMATION_SERVICE_URL = 'http://localhost:5002/api/formations'

def get_formation_details(formation_id):
    try:
        resp = requests.get(f"{FORMATION_SERVICE_URL}/{formation_id}")
        if resp.status_code == 200:
            return resp.json()
    except:
        pass
    return None

""" @order_bp.route('/', methods=['POST'])
@jwt_required()  # OBLIGATOIRE MAINTENANT  @zay tsy user_id=1 sasy
def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items', [])  # [{formation_id: 1}, ...]

    if not user_id or not items:
        return jsonify({'error': 'user_id et items requis'}), 400

    total = 0
    order_items = []

    for item in items:
        formation_id = item.get('formation_id')
        formation = get_formation_details(formation_id)
        if not formation:
            return jsonify({'error': f'Formation {formation_id} non trouvée'}), 404
        
        price = formation['price']
        total += price

        order_items.append(OrderItem(
            formation_id=formation_id,
            formation_name=formation['name'],
            price=price
        ))

    order = Order(user_id=user_id, total_amount=total, status='pending')
    order.items = order_items

    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201

 """

@order_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()

    try:
        data = request.get_json(force=True)
    except:
        return jsonify({"error": "JSON invalide"}), 400

    print("DATA REÇUE →", data)  # ← Tu vas voir ça !

    # VÉRIFICATION PROPRE ET CLAIRE
    if not data or 'items' not in data:
        return jsonify({"error": "Le champ 'items' est requis"}), 422

    items = data['items']

    if not isinstance(items, list) or len(items) == 0:
        return jsonify({"error": "Le champ 'items' doit être une liste non vide"}), 422

    # MAINTENANT ON EST SÛR QUE items EST UNE LISTE NON VIDE
    total = 0
    order_items = []

    for item in items:
        formation_id = item.get('formation_id')
        if not formation_id:
            return jsonify({"error": "formation_id manquant dans un item"}), 400

        formation = get_formation_details(formation_id)
        if not formation:
            return jsonify({'error': f'Formation {formation_id} non trouvée'}), 404

        price = formation['price']
        total += price
        order_items.append(OrderItem(
            formation_id=formation_id,
            formation_name=formation['name'],
            price=price
        ))

    # CRÉATION DE LA COMMANDE
    order = Order(user_id=user_id, total_amount=total, status='pending')
    order.items = order_items
    db.session.add(order)
    db.session.commit()

    return jsonify(order.to_dict()), 201

@order_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])



@order_bp.route('/<int:order_id>/pay', methods=['POST'])
def mark_as_paid(order_id):
    order = Order.query.get_or_404(order_id)
    order.status = 'paid'
    db.session.commit()
    return jsonify(order.to_dict())


""" # === ANNULER UNE COMMANDE (seulement si pending et appartenant au client) ===
@order_bp.route('/<int:order_id>', methods=['DELETE'])
@jwt_required()
def cancel_order(order_id):
    current_user_id = get_jwt_identity()  # ID du client connecté
    order = Order.query.get_or_404(order_id)

    # Vérifie que la commande appartient bien à l'utilisateur connecté
    if order.user_id != current_user_id:
        return jsonify({"error": "Accès refusé : cette commande ne vous appartient pas"}), 403

    # Seules les commandes en attente ("pending") peuvent être annulées
    if order.status != 'pending':
        return jsonify({"error": "Seules les commandes en attente peuvent être annulées"}), 400

    # OPTION 1 : supprimer la commande (si tu tiens à delete)
    # db.session.delete(order)

    # OPTION 2 (recommandé) : mettre à jour le statut en "cancelled"
    order.status = "cancelled"

    db.session.commit()

    return jsonify({"message": "Commande annulée avec succès"}), 200
 """


# === ANNULER COMMANDE (seulement si pending + appartient à l'utilisateur) ===
@order_bp.route('/<int:order_id>', methods=['DELETE'])
#@jwt_required()  #apodiko @ place_ny @zay
#@jwt_required()#commenter-na hi tester-vana zvt
@jwt_required(optional=True)  # PERMET TEST SANS JWT
def cancel_order(order_id):
    #current_user_id = get_jwt_identity()    # ✅ récupère l'id dans le token
    current_user_id = 1 #apodiko @ place_ny @zay  apres n'ny test supprimer commande, devient status cancelled
    order = Order.query.get_or_404(order_id)

    # Vérifie que la commande appartient à l'utilisateur connecté
    if order.user_id != current_user_id:
        return jsonify({"error": "Accès refusé : cette commande ne vous appartient pas"}), 403

    # Seules les commandes "pending" peuvent être annulées
    if order.status != 'pending':
        return jsonify({"error": "Seules les commandes en attente peuvent être annulées"}), 400

    # OPTION RECOMMANDÉE : Marquer comme "cancelled" (au lieu de supprimer)
    order.status = "cancelled" #ty kay
    db.session.commit()

    return jsonify({"message": "Commande annulée avec succès"}), 200


#pour afficher order service en frontend
# === OBTENIR UNE COMMANDE PAR ID (pour Confirmation) ===
@order_bp.route('/order/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict()), 200


# === TOUTES LES COMMANDES (admin) ===
@order_bp.route('', methods=['GET'])
@order_bp.route('/', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    return jsonify([o.to_dict() for o in orders]), 200

'''
@order_bp.route('/order/<int:order_id>', methods=['GET'])
def get_order(order_id): ...


#taloha
@order_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict()), 200


@order_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id): ...

#taloha
@order_bp.route('/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([o.to_dict() for o in orders])

'''

#remettre statut en pending
@order_bp.route('/<int:order_id>/reactivate', methods=['POST'])
#@jwt_required()#commenter-na hi tester-na zvt
@jwt_required(optional=True)  # PERMET TEST SANS JWT
def reactivate_order(order_id):
    #current_user_id = get_jwt_identity()
    current_user_id = 1  # SIMULE user_id = 1
    order = Order.query.get_or_404(order_id)

    # Vérifie que la commande appartient à l'utilisateur connecté
    if order.user_id != current_user_id:
        return jsonify({"error": "Accès refusé : cette commande ne vous appartient pas"}), 403

    # Seules les commandes "cancelled" peuvent être réactivées
    if order.status != 'cancelled':
        return jsonify({"error": "Seules les commandes annulées peuvent être réactivées"}), 400

    # Met à jour le statut en "pending"
    order.status = "pending"
    db.session.commit()

    return jsonify({"message": "Commande réactivée avec succès"}), 200


#pour order_items pour Admin
# === TOUTES LES LIGNES DE COMMANDES (order_items) ===
@order_bp.route('/items', methods=['GET'])
def get_all_order_items():
    items = OrderItem.query.all()
    return jsonify([{
        "id": item.id,
        "order_id": item.order_id,
        "formation_id": item.formation_id,
        "formation_name": item.formation_name,
        "price": item.price
    } for item in items]), 200

'''