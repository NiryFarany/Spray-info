// src/components/Navbar.js → VERSION PARFAITE (comme avant + "Se connecter" ajouté)

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaListAlt,
  FaUserCog,
  FaTachometerAlt,
  FaHome
} from 'react-icons/fa';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
    toast.success('Déconnexion réussie ! À bientôt !');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO À GAUCHE — IDENTIQUE */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={SprayInfoLogo}
              alt="Logo"
              className="h-14 w-14 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition"
            />
            <div>
              <h1 className="text-2xl font-bold">Spray Info Formation</h1>
              <p className="text-xs opacity-90">Behind every success, there is sacrifice</p>
            </div>
          </Link>

          {/* MENU CENTRAL — IDENTIQUE */}
          <div className="hidden md:flex items-center space-x-10 text-lg font-medium">
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link to="/formations" className="hover:text-yellow-300 transition">Formations</Link>
            <Link to="/cart" className="relative hover:text-yellow-300 transition">
              Panier
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
            </Link>
          </div>

          {/* MENU DROIT — LA SEULE CHOSE CHANGÉE */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              // CONNECTÉ → Ton beau bouton avec nom (inchangé)
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-full px-5 py-3 transition backdrop-blur-sm"
              >
                <FaUserCircle size={32} />
                <span className="font-semibold">{user.name}</span>
              </button>
            ) : (
              // PAS CONNECTÉ → Deux boutons (Se connecter + S'inscrire) dans le même style
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="border-2 border-cyan-400 hover:bg-cyan-400 hover:text-blue-900 px-7 py-3 rounded-full font-bold text-lg transition shadow-lg"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="bg-cyan-500 hover:bg-cyan-400 px-8 py-3 rounded-full font-bold text-lg transition shadow-lg"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            {/* TON DROPDOWN MAGNIFIQUE — 100% INCHANGÉ */}
            {isOpen && user && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5 text-center">
                  <FaUserCircle size={50} className="mx-auto mb-2" />
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm opacity-90">{user.email}</p>
                  {user.is_admin && (
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold">
                      ADMINISTRATEUR
                    </span>
                  )}
                </div>
                <div className="py-2">
                  {user.is_admin ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-6 py-4 hover:bg-blue-50 transition text-blue-700 font-semibold"
                    >
                      <FaTachometerAlt className="text-blue-600" />
                      <span>Tableau de bord Admin</span>
                    </Link>
                  ) : (
                    <Link
                      to="/clientData"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-6 py-4 hover:bg-blue-50 transition text-blue-700 font-semibold"
                    >
                      <FaHome className="text-blue-600" />
                      <span>Mon Espace Client</span>
                    </Link>
                  )}
                  <Link
                    to="/my-orders"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-100 transition text-gray-800"
                  >
                    <FaListAlt className="text-blue-600" />
                    <span>Mes Commandes</span>
                  </Link>
                  <Link
                    to="/my-info"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-100 transition text-gray-800"
                  >
                    <FaUserCog className="text-blue-600" />
                    <span>Mon Profil</span>
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-6 py-4 hover:bg-red-50 transition text-red-600 w-full text-left"
                  >
                    <FaSignOutAlt />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
//tsy soa ty