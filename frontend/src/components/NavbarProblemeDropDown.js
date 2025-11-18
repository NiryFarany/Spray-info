// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
//import SprayInfoLogo from '../../public/logo/sprayInfo-white.png';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg'; // Renommé pour plus de clarté
import { FaBell, FaUser, FaSignOutAlt, FaUserCog } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const pendingOrders = user?.orders?.filter(o => o.status === 'pending').length || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: '#314482' }} className="p-5 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4">
          <img src={SprayInfoLogo} alt="Logo" className="h-14 w-14 rounded-full border-4 border-white shadow-lg" />
          <div>
            <h1 className="text-white text-2xl font-bold">Spray Info Formation</h1>
            <p className="text-cyan-200 text-xs italic">Behind every success, there is sacrifice</p>
          </div>
        </Link>

        <div className="flex items-center space-x-8 text-white text-lg">
          <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
          <Link to="/formations" className="hover:text-cyan-300 transition">Formations</Link>
          <Link to="/cart" className="hover:text-cyan-300 transition relative">
            Panier
            {cart.length > 0 && <span className="absolute -top-2 -right-4 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>}
          </Link>

          {user ? (
            <>
              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-cyan-300">
                  <FaBell size={22} />
                  {pendingOrders > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {pendingOrders}
                    </span>
                  )}
                </button>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-2 hover:text-cyan-300">
                  <FaUser size={22} />
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl hidden group-hover:block">
                  <Link to="/my-orders" className="block px-4 py-3 text-gray-800 hover:bg-blue-50">Mes Commandes</Link>
                  <Link to="/my-info" className="block px-4 py-3 text-gray-800 hover:bg-blue-50">Mon Profil</Link>
                  {user.is_admin && (
                    <Link to="/admin" className="block px-4 py-3 text-purple-600 font-bold hover:bg-purple-50">
                      Admin Panel
                    </Link>
                  )}
                  <hr />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <FaSignOutAlt /> Déconnexion
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-cyan-300">Connexion</Link>
              <Link to="/register" className="bg-cyan-500 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-cyan-400 transition">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
//ta pares n'i Navbar marche ty ah