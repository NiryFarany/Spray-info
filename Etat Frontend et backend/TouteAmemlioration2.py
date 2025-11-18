'''
maintennt on se concentre sur l'amelioration de l'application,les servive marche trés bien : formtion, order, payment et user, et comme on a deja fait, apres login, l'user connecté est respecté, il peut faire commande de formation et dans sa page, il peurt le payer, et tout ça, mais ça marche comme ça si on passe par login d'about mais la quand l'application est ouvert, quand un inconu clic directement sur formation, le processus marche jusqu'on payment et confirmation, c'est là qu'il y a message d'erreur que Erreur creation commande, mais logiquement, je veux ameliorer ça, une fois un client clic sur register mais il esrt meme pas connecté, il faut qu'il soit recommander de login, et aussi pour payment,par exemple ce order, personne n'est connecté mais le payment marche, ce commande id 14 est le commande l'user id2 mais il est à present payé car il y pas reglage de ce soit disant owner du compte; et aussi comme on voit meme si on est simpler user ou admin, on voit tous le navbar admin et user, je crois qu'il faut ameliorer ça,si il est user alors il ne voit pas admin et si il est admin et peut tous voir; et s'il est pas connecté il ne puisse rien faire pour les actions à moins qu'il se connecte; un rappelle, le order commande marche bien avec cette login lais il ne reste que le payment service; aussi une chose, ces icon person et notification sont juste des decoration jusq'ici, je veux qu'ils soit utilié logiquement et normalement; je t'envoie les extraits de code : CardFormation.js: import React, { useContext } from 'react';

import { useCart } from '../context/CartContext';

import { toast } from "react-toastify";





import { 

FaLaptopCode, 

FaNetworkWired, 

FaShieldAlt, 

FaRobot, 

FaBookOpen, 

FaChartLine, 

FaGraduationCap, 

FaUniversity 

} from 'react-icons/fa';




const CardFormations = ({ formation }) => {

const { addToCart } = useCart();




// Fonction pour obtenir une icône spécifique basée sur l'ID ou le nom de la formation

/* const getFormationIcon = (id) => {

    switch (id) {

      case 1: return <FaLaptopCode />;

      case 2: return <FaNetworkWired />;

      case 3: return <FaShieldAlt />;

      case 4: return <FaRobot />;

      case 5: return <FaBookOpen />;

      case 6: return <FaChartLine />;

      case 7: return <FaGraduationCap />;

      case 8: return <FaUniversity />;

      default: return <FaGraduationCap />;

    }

  }; */

const getFormationIcon = (name) => {

if (!name) return <FaGraduationCap />;




const lower = name.toLowerCase();




if (lower.includes("devops pro")) return <FaShieldAlt />;

if (lower.includes("reseau pro") || lower.includes("network")) return <FaNetworkWired />;

if (lower.includes("dev pro")) return <FaLaptopCode />;

if (lower.includes("data")) return <FaChartLine />;

if (lower.includes("robot") || lower.includes("ai")) return <FaRobot />;




return <FaGraduationCap />; // Icon par défaut

};





return (

<div className="bg-white p-7 shadow-xl rounded-xl border border-gray-100 flex flex-col h-full transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">

{/* Icône de la formation : Centrée et en gris plus neutre */}

<div className="text-center mb-4">

<span className="text-5xl text-gray-500 mx-auto">

{/* {getFormationIcon(formation.id)} */}

{getFormationIcon(formation.name)}

</span>

</div>




{/* Titre et Description */}

<h3 className="text-2xl font-bold mb-3 text-center text-gray-800 flex-grow-0">

{formation.name}

</h3>

<p className="text-gray-600 mb-4 text-center flex-grow">{formation.description}</p>




{/* Prix */}

<div className="flex items-center justify-center text-xl mb-4 pt-4 border-t border-gray-200">

<span className="text-gray-600 font-extrabold mr-2">

{formation.price > 0 ? 'fees' : 'FREE'}

</span>

<p className="font-extrabold text-gray-800">

{formation.price > 0 ? formation.price.toLocaleString('en-US') + ' Ar' : ''}

</p>

</div>




{/* Bouton d'Inscription */}

<button

onClick={() => {

addToCart(formation);//eto

toast.success(`${formation.name} added to cart !`);

// increaseNotif(); // Ceci ajoute +1 à l’icône tsy nety avela hek

  }}

className="mt-auto text-white p-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-600"

style={{ backgroundColor: '#314482' }} // Bleu foncé par défaut

>

{formation.price > 0 ? 'Reegister Now' : 'Learn More'}

</button>

</div>

  );

};




export default CardFormations;voici login juste pour rappel:// src/pages/Login.js

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

//navigate('/my-orders');//miala @zay ty

navigate('/clientData');

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

payement_routes.py: # backend/payment-service/app/routes/payment_routes.py

from flask import Blueprint, request, jsonify # type: ignore

from app import db

from app.models.payment import Payment

import requests

import uuid

import time




payment_bp = Blueprint('payment_bp', __name__)




ORDER_SERVICE_URL = 'http://localhost:5003/api/orders'




# Simule appel Mvola

def simulate_mvola_payment(phone, amount):

    time.sleep(2)  # Simulation délai

return {

"success": True,

"transaction_id": f"MV{uuid.uuid4().hex[:10].upper()}",

"message": "Paiement reçu"

    }




@payment_bp.route('/pay/<int:order_id>', methods=['POST'])

def initiate_payment(order_id):

    data = request.get_json()

    phone = data.get('phone')

if not phone:

return jsonify({"error": "Numéro de téléphone requis"}), 400




# Vérifie commande

try:

        resp = requests.get(f"{ORDER_SERVICE_URL}/order/{order_id}")

if resp.status_code != 200:

return jsonify({"error": "Commande introuvable"}), 404

        order = resp.json()

except:

return jsonify({"error": "Service commande indisponible"}), 500




if order['status'] != 'pending':

return jsonify({"error": "Commande non payable"}), 400




# Crée paiement

    payment = Payment(

order_id=order_id,

amount=order['total_amount'],

phone=phone

    )

    db.session.add(payment)

    db.session.commit()




# Simule Mvola

    result = simulate_mvola_payment(phone, order['total_amount'])




if result['success']:

        payment.status = 'success'

        payment.transaction_id = result['transaction_id']

        db.session.commit()




# Met à jour commande

        requests.post(f"{ORDER_SERVICE_URL}/{order_id}/pay")




return jsonify({

"message": "Paiement réussi !",

"payment": payment.to_dict()

        }), 200

else:

        payment.status = 'failed'

        db.session.commit()

return jsonify({"error": "Paiement échoué"}), 400




#voir table payment

# backend/payment-service/app/routes/payment_routes.py




@payment_bp.route('/payments', methods=['GET'])

def get_all_payments():

    payments = Payment.query.all()

return jsonify([p.to_dict() for p in payments])

#fa izy ty kay


Admin.js: import React from "react";

import { useNavigate } from "react-router-dom";

import {  BookOpenIcon,UsersIcon,ClipboardListIcon, CreditCardIcon } from '@heroicons/react/solid';







const Admin = () => {

const navigate = useNavigate();




return (

<div className="container mx-auto py-20 px-6 text-center">




<h1 className="text-3xl font-bold mb-10 text-blue-700">

        🚀 Admin Panel — Choisissez une section

</h1>




{/* <div className="flex justify-center gap-12"> */}

{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full"> {/* Utilisation d'un grid pour le positionnement */}

<div className="flex justify-center space-x-12 max-w-4xl w-full mx-auto"> 





<div

className="cursor-pointer bg-white shadow-xl rounded-2xl p-10 text-center border-t-4 border-blue-600 hover:shadow-2xl transition max-w-full" // max-w-full pour prendre l'espace dans la grille

onClick={() => navigate("/admin/formations")}

>

<BookOpenIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" /> {/* Nouvelle icône */}

<h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Gestion des Formations</h2>

{/* <p className="text-gray-500 text-sm md:text-base">Ajouter, modifier et supprimer des formations</p> */}

<p className="text-gray-500 text-sm md:text-base"></p>

</div>




<div

className="cursor-pointer bg-gray shadow-xl rounded-2xl p-12 text-center border-t-4 border-gray-600 hover:shadow-2xl transition max-w-full"

onClick={() => navigate("/admin/personnel")}

>

<UsersIcon className="h-12 w-12 mx-auto text-gray-600 mb-4" /> {/* Nouvelle icône */}

<h2 className="text-xl md:text-2xl font-bold text-gray-600 mb-2">Gestion du Personnel</h2>

{/* <p className="text-gray-500 text-sm md:text-base">Gérer les formateurs et membres du staff</p> */}

<p className="text-gray-500 text-sm md:text-base"></p>

</div>




<div

className="cursor-pointer bg-white shadow-xl rounded-2xl p-10 text-center border-t-4 border-purple-600 hover:shadow-2xl transition max-w-full" // max-w-full pour prendre l'espace dans la grille

onClick={() => navigate("/admin/orders")}

>

<ClipboardListIcon className="h-12 w-12 mx-auto text-purple-600 mb-4" /> {/* Nouvelle icône */}

<h2 className="text-xl md:text-2xl font-bold text-purple-600 mb-2">Voir tous les Commande</h2>

{/* <p className="text-gray-500 text-sm md:text-base">Ajouter, modifier et supprimer des formations</p> */}

<p className="text-gray-500 text-sm md:text-base"></p>

</div>




<div

className="cursor-pointer bg-white shadow-xl rounded-2xl p-10 text-center border-t-4 border-green-600 hover:shadow-2xl transition max-w-full" // max-w-full pour prendre l'espace dans la grille

onClick={() => navigate("/admin/payment")}

>

<CreditCardIcon className="h-12 w-12 mx-auto text-green-600 mb-4" /> {/* Icône de carte de crédit */}

<h2 className="text-xl md:text-2xl font-bold text-green-600 mb-2">Voir Paiements</h2>

<p className="text-gray-500 text-sm md:text-base"></p>

</div>





</div>





</div>

  );

};




export default Admin;

//fa izy avao kay ty;  voici AdminPersonnel qui respecte cette connection: import React, { useState, useEffect,useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

import Swal from 'sweetalert2';

import { getAllUsers, deleteUser, updateUserRole } from '../services/userService';




const AdminPersonnel = () => {

const navigate = useNavigate();

const [users, setUsers] = useState([]);

const [loading, setLoading] = useState(true);




/* const fetchUsers = async () => {

    try {

      const data = await getAllUsers();

      setUsers(data);

    } catch (err) {

      Swal.fire("Accès refusé", err.message, "error");

      navigate("/"); // Redirige si pas admin

    } finally {

      setLoading(false);

    }

  };




  useEffect(() => {

    fetchUsers();

  }, []); */

const fetchUsers = useCallback(async () => {

try {

const data = await getAllUsers();

setUsers(data);

  } catch (err) {

Swal.fire("Accès refusé", err.message, "error");

navigate("/");

  } finally {

setLoading(false);

  }

}, [navigate]);




useEffect(() => {

fetchUsers();

}, [fetchUsers]);





/* const handleDelete = async (userId, userName) => {

    const result = await Swal.fire({

      title: "Supprimer cet utilisateur ?",

      text: `${userName} sera supprimé définitivement`,

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Oui, supprimer",

      cancelButtonText: "Annuler",

      confirmButtonColor: "#d33"

    });




    if (result.isConfirmed) {

      try {

        await deleteUser(userId);

        Swal.fire("Supprimé !", `${userName} a été retiré.`, "success");

        fetchUsers();

      } catch {

        Swal.fire("Erreur", "Impossible de supprimer", "error");

      }

    }

  }; */




const handleDelete = async (userId, userName) => {

const result = await Swal.fire({

title: "Supprimer cet utilisateur ?",

text: `${userName} sera supprimé définitivement`,

icon: "warning",

showCancelButton: true,

confirmButtonText: "Oui, supprimer",

cancelButtonText: "Annuler",

confirmButtonColor: "#d33"

  });




if (result.isConfirmed) {

try {

await deleteUser(userId);

Swal.fire("Supprimé !", `${userName} a été retiré.`, "success");

fetchUsers();

    } catch (err) {

Swal.fire("Erreur", err.message, "error");

    }

  }

};




/* const toggleAdmin = async (userId, currentStatus, userName) => {

      const newStatus = !currentStatus;

      const role = newStatus ? "administrateur" : "utilisateur";

      const result = await Swal.fire({

        title: `Rendre ${userName} ${role} ?`,

        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Oui",

        cancelButtonText: "Non"

      });

      if (result.isConfirmed) {

        // À implémenter plus tard si tu veux

        Swal.fire("Fonctionnalité future", "Bientôt disponible !", "info");

      }

    };

 */

const toggleAdmin = async (userId, currentStatus, userName) => {

const newStatus = !currentStatus;

const role = newStatus ? "administrateur" : "utilisateur";




const result = await Swal.fire({

title: `Rendre ${userName} ${role} ?`,

icon: "question",

showCancelButton: true,

confirmButtonText: "Oui",

cancelButtonText: "Non"

  });




if (result.isConfirmed) {

try {

await updateUserRole(userId, newStatus);

Swal.fire("Succès", `${userName} est maintenant ${role}`, "success");

fetchUsers(); // refresh

    } catch {

Swal.fire("Erreur", "Impossible de changer le rôle", "error");

    }

  }

};




if (loading) return <div className="text-center py-20 text-xl">Chargement des utilisateurs...</div>;




return (

<div className="container mx-auto py-12 px-6">

<button

onClick={() => navigate("/admin")}

className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-gray-700 transition"

>

<ArrowLeftIcon className="h-5 w-5 mr-2" /> Retour au Dashboard Admin

</button>




<div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-green-600">

<h1 className="text-4xl font-bold text-green-600 mb-8 text-center">

          Tous les utilisateurs

</h1>




<div className="overflow-x-auto">

<table className="min-w-full bg-white border border-gray-300">

<thead className="bg-green-100">

<tr>

<th className="py-4 px-6 text-left">Nom</th>

<th className="py-4 px-6 text-left">Phone</th>

<th className="py-4 px-6 text-left">Email</th>

<th className="py-4 px-6 text-center">Rôle</th>

<th className="py-4 px-6 text-center">Inscrit le</th>

<th className="py-4 px-6 text-center">Action</th>

</tr>

</thead>

<tbody>

{users.map(user => (

<tr key={user.id} className="border-b hover:bg-gray-50 transition">

<td className="py-4 px-6 font-medium">{user.name}</td>

<td className="py-4 px-6 font-medium">{user.phone}</td>

<td className="py-4 px-6">{user.email}</td>

<td className="py-4 px-6 text-center">

<span className={`px-4 py-2 rounded-full text-sm font-bold ${user.is_admin ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}>

{/* {user.is_admin ? 'ADMINISTRATEUR' : 'UTILISATEUR'} */}

{user.is_admin ? 'ADMIN' : 'Utilisateur'}

</span>

<button

onClick={() => toggleAdmin(user.id, user.is_admin, user.name)}

className="text-purple-600 hover:scale-110"

title="Changer le rôle"

>

<PencilIcon className="h-6 w-6" />

</button>

</td>

<td className="py-4 px-6 text-center text-gray-600">{user.created_at}</td>

<td className="py-4 px-6 text-center">

{/* <button

                                          onClick={() => toggleAdmin(user.id, user.is_admin, user.name)}

                                          className="text-purple-600 hover:scale-110"

                                          title="Changer le rôle"

                                        >

                                          <PencilIcon className="h-6 w-6" />

                                        </button> */}

<button

onClick={() => handleDelete(user.id, user.name)}

className="text-red-600 hover:scale-125 transition ml-4"

title="Supprimer"

>

<TrashIcon className="h-7 w-7" />

</button>

</td>

</tr>

              ))}

</tbody>

</table>

</div>

</div>

</div>

  );

};




export default AdminPersonnel;

navbar: import React from 'react';

import { Link } from 'react-router-dom';

import SprayInfoLogo from '../assets/images/sprayInfo.jpeg'; // Renommé pour plus de clarté

import { FaBell } from "react-icons/fa";

import { useState } from "react";

import { FaUser } from "react-icons/fa";





const Navbar = () => {

const [notifCount, setNotifCount] = useState(0);




const handleNotifClick = () => {

setNotifCount(0); // ou juste afficher les notifs

  };




return (

// Augmentation de l'espace vertical (p-5 au lieu de p-4) et utilisation du thème bleu

<nav style={{ backgroundColor: '#314482' }} className="p-5 shadow-lg"> 

<div className="container mx-auto flex justify-between items-center">

{/* Logo and Slogan Section */}

<div className="flex items-center">

{/* Logo Spray Info (Agrandissement : h-12 w-12 au lieu de h-10 w-10) */}

<Link to="/" className="flex items-center">

<img 

src={SprayInfoLogo} 

alt="Spray Info Logo" 

className="h-12 w-12 rounded-full border-2 border-white transition transform hover:scale-105" // Agrandissement et style

/>

</Link>




<div className="ml-4"> {/* Marge entre le logo et le titre */}

{/* Titre Principal */}

<Link to="/" className="text-white text-3xl font-extrabold tracking-tight hover:text-gray-100 transition"> 

              Spray Info Formation

</Link>

{/* Slogan (Style amélioré) */}

<p className="text-white text-sm italic opacity-90 mt-0.5"> 

              Behind every success, there is sacrifice

</p>

</div>

</div>




{/* Menu Links */}

<div className="flex space-x-6 text-lg font-medium"> {/* Augmentation de l'espace et de la taille du texte des liens */}

<Link to="/" className="text-white hover:text-gray-200 transition">

            Home

</Link>

<Link to="/formations" className="text-white hover:text-gray-200 transition">

            Formation

</Link>

<Link to="/cart" className="text-white hover:text-gray-200 transition">

            Cart

</Link>

<Link to="/checkout" className="text-white hover:text-gray-200 transition">

            Checkout

</Link>

<Link to="/login" className="text-white hover:text-gray-200 transition">

            Login

</Link>

<Link to="/register" className="text-white hover:text-gray-200 transition">

            Register

</Link>

<Link to="/admin" className="text-white hover:text-gray-200 transition">

            Admin

</Link>

<Link to="/clientData" className="text-white hover:text-gray-200 transition">{/*misy idirnle @ route miniscule @ App ty*/}

            User

</Link>

<Link to="/aboutUs" className="text-white hover:text-gray-200 transition">

            AboutUs

</Link>

{/*  */}

<FaUser size={24} style={{ color: "white", cursor: "pointer" }} />

<FaBell 

size={24} 

style={{ color: "white", cursor: "pointer" }} 

onClick={handleNotifClick} 

/>

{notifCount > 0 && (

<span

style={{

position: "absolute",

top: -5,

right: -5,

backgroundColor: "red",

color: "white",

borderRadius: "50%",

padding: "2px 6px",

fontSize: "12px",

    }}

>

{notifCount}

</span>

)}

{/*  */}

</div>

{/*  */}

{/* */}

</div>

      {/*  */}

      {/*  */}

</nav>

  );

};




export default Navbar; et App.js:  import React from 'react';

import Navbar from './components/Navbar';

import Home from './pages/Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';

import Checkout from './pages/Checkout';

import Admin from './pages/Admin';

import AdminFormation from "./pages/AdminFormation";

import AdminPersonnel from "./pages/AdminPersonnel";

import AboutUs from './pages/AboutUs';

import Register from './pages/Register';

import Footer from './components/Footer';

import Cart from './pages/Cart';

import Formations from './pages/Formations';

import { AuthProvider } from './context/AuthContext';

import { CartProvider } from './context/CartContext';

import { ToastContainer } from 'react-toastify';

import '../src/assets/styles/index.css'

import Sidebar from './components/Sidebar';

import Confirmation from './pages/Confirmation'; // À créer

import MyOrders from './pages/MyOrders';

import OrderDetail from './pages/OrderDetail';

import AdminOrders from './pages/AdminOrders';

import AdminOrder_items from './pages/AdminOrder_items'

import ClientData from './pages/ClientData'

import AdminOrderDetailInOrder_items from './pages/AdminOrderDetailInOrder_items'

import AdminPayment from './pages/AdminPayment'

import AdminPaymentDetail from './pages/AdminPaymentDetail'

import MyInfo from './pages/MyInfo'

import MyInfoForgotpw from './pages/MyInfoForgotpw'




const App = () => {

return (

<AuthProvider>

<CartProvider>

<Router>

<div id="app" className="bg-gray-100">

<Navbar />

<div className="main-content">

<Routes>

<Route path="/" element={<Home />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/formations" element={<Formations />} />

<Route path="/cart" element={<Cart />} />

<Route path="/checkout" element={<Checkout />} />

<Route path="/admin" element={<Admin />} />

<Route path="/admin/formations" element={<AdminFormation />} />

<Route path="/admin/personnel" element={<AdminPersonnel />} />

<Route path="/aboutUs" element={<AboutUs />} />

{/* Supprimez ou créez une page AboutUs si nécessaire */}

{/* <Route path="/aboutUs" element={<AboutUs />} /> */}

<Route path="/confirmation" element={<Confirmation />} />

<Route path="/my-orders" element={<MyOrders />} />

<Route path="/order/:id" element={<OrderDetail />} />

<Route path="/admin/orders" element={<AdminOrders />} />

<Route path="/admin/order_items" element={<AdminOrder_items />} />

<Route path="/clientData" element={<ClientData />} />

<Route path="/admin/orderDetail/:id" element={<AdminOrderDetailInOrder_items />} />

<Route path="/admin/payment" element={<AdminPayment />} />

<Route path="/admin/paymentDetail/:id" element={<AdminPaymentDetail />} />

{/* tsy tokony hitovy @ zay zany gn raha hitan'ny admin vo gn olo tsotra apres nzao aby */}

<Route path="/my-info" element={<MyInfo />} />

<Route path="/forgot-password" element={<MyInfoForgotpw />} />

</Routes>

</div>

<Footer />

</div>

<ToastContainer position="top-right" autoClose={2000} />

</Router>

</CartProvider>

</AuthProvider>

  );

};




export default App;voic rappel de base de données; mysql> show databases;

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

6 rows in set (17.21 sec)

mysql> use user_db;

Reading table information for completion of table and column names

You can turn off this feature to get a quicker startup with -A

Database changed

mysql> select * from user;

+----+------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+---------------------+------------------+

| id | name                   | email               | password_hash                                                                                                                                                      | is_admin | created_at          | phone            |

+----+------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+---------------------+------------------+

|  1 | Admin                  | admin@sprayinfo.com | scrypt:32768:8:1$QTy7KFxhVoF6hfU4$cdaeed4202546ffd486ffbaded164d2775e9ab112f9b9daf4214a229a7ee8ac563a12006e07dc44e13fe1086e81bb01ff2bc7d1c1a1f3b840bbff6eb0479ef8d |        1 | 2025-11-13 07:09:55 | NULL             |

|  2 | Fenotokyyaoyyyziiiaaaa | fenotoky@gmail.com  | scrypt:32768:8:1$7WpbvfuPhy9FxuRt$7fa05df86f17efa04c00e5d5aea34ce64a833504f817e166a323e3ad4d483e2c1d0b30b05f66de543512d274c8de32bda5c9a4cad42959d75094926319d3e9df |        0 | 2025-11-13 08:21:03 | 0349954043397108 |

|  4 | feno                   | feno@gmail.com      | scrypt:32768:8:1$X7hBPBnYeVETWn7M$7da2449cd31d6f37ed19d8348a7256fe61174edf10d1d0b622967e6c05d5b627308aa312c8c3a4bf3dbeeff27602590df8c7ed06aaee1ac3bec69c248bdbe7f0 |        0 | 2025-11-15 09:02:57 | NULL             |

|  6 | Aina                   | aina@gmail.com      | scrypt:32768:8:1$Y51PgW2WtZf3YMGf$1a4eca5e64f29b1cfd05a7a9309a616dc8f01f635386fce65a5b235b34119756dfdbb9e710bf310eb0a309ccc91c4f459067f1e65d2c65a64c019bd580b6e74b |        0 | 2025-11-15 12:25:29 | 0349954048       |

+----+------------------------+---------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+---------------------+------------------+

4 rows in set (0.19 sec)

mysql> use payment_db;

Reading table information for completion of table and column names

You can turn off this feature to get a quicker startup with -A

Database changed

mysql> select * from payment;

+----+----------+--------+--------+------------+---------+----------------+---------------------+

| id | order_id | amount | method | phone      | status  | transaction_id | created_at          |

+----+----------+--------+--------+------------+---------+----------------+---------------------+

|  1 |        1 | 220000 | mvola  | 0341234567 | success | MV9E71289DDB   | 2025-11-12 08:04:56 |

|  2 |        5 | 180000 | mvola  | 0349954043 | success | MVFD8D7FB54D   | 2025-11-12 08:43:47 |

|  3 |       13 | 150000 | mvola  | 0349954043 | success | MV7EA673A982   | 2025-11-15 07:47:00 |

|  4 |       14 | 800000 | mvola  | 0349954043 | success | MV146CDD6001   | 2025-11-18 07:07:52 |

+----+----------+--------+--------+------------+---------+----------------+---------------------+

4 rows in set (0.36 sec)

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

| 13 |       2 |       150000 | paid      | 2025-11-15 07:15:31 |

| 14 |       2 |       800000 | paid      | 2025-11-15 07:52:48 |

+----+---------+--------------+-----------+---------------------+

11 rows in set (0.03 sec)

mysql> select * from oder_items;

ERROR 1146 (42S02): Table 'order_db.oder_items' doesn't exist

mysql> select * from order_items;

+----+----------+--------------+----------------+--------+

| id | order_id | formation_id | formation_name | price  |

+----+----------+--------------+----------------+--------+

|  1 |        1 |            8 | Reseau Pro     | 220000 |

|  2 |        2 |            9 | Dev Pro        | 150000 |

|  5 |        5 |           12 | data           | 180000 |

|  6 |        6 |           13 | robot          | 200000 |

|  8 |        8 |           15 | Reseau Pro     | 800000 |

|  9 |        9 |           15 | Reseau Pro     | 800000 |

| 10 |       10 |           11 | DevOps Pro     | 800000 |

| 11 |       11 |           11 | DevOps Pro     | 800000 |

| 12 |       12 |            9 | Dev Pro        | 150000 |

| 13 |       13 |            9 | Dev Pro        | 150000 |

| 14 |       14 |           11 | DevOps Pro     | 800000 |

+----+----------+--------------+----------------+--------+

11 rows in set (0.03 sec)

mysql> 

mysql> use formation_db;

Reading table information for completion of table and column names

You can turn off this feature to get a quicker startup with -A

Database changed

mysql> select * from formation;

+----+------------+-----------------------------+--------+----------------------+------------+

| id | name       | description                 | price  | location             | dates      |

+----+------------+-----------------------------+--------+----------------------+------------+

|  8 | Reseau Pro | reseau pro                  | 150000 | Fianara              | 2025-09-41 |

|  9 | Dev Pro    | Dev Dikcit                  | 150000 | Fianarantsoa         | 2025/11/14 |

| 11 | DevOps Pro | tonga de mahay devops ianao | 800000 | Imandry Fianarnatsoa | 2025/11/27 |

| 12 | data       | dddd                        | 180000 | Imandry              | 2025-11-15 |

+----+------------+-----------------------------+--------+----------------------+------------+

4 rows in set (0.00 sec)

mysql> 


'''