// src/components/CardFormations.js  (à remplacer entièrement)
import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';  // AJOUTÉ
import { useNavigate } from 'react-router-dom';     // AJOUTÉ
import { toast } from "react-toastify";
import {
  FaLaptopCode, FaNetworkWired, FaShieldAlt, 
  FaRobot, FaChartLine, FaGraduationCap
} from 'react-icons/fa';

const CardFormations = ({ formation }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();           // ON RÉCUPÈRE L'USER
  const navigate = useNavigate();       // Pour rediriger

  const getFormationIcon = (name) => {
    if (!name) return <FaGraduationCap />;
    const lower = name.toLowerCase();
    if (lower.includes("devops")) return <FaShieldAlt />;
    if (lower.includes("reseau") || lower.includes("network")) return <FaNetworkWired />;
    if (lower.includes("dev")) return <FaLaptopCode />;
    if (lower.includes("data")) return <FaChartLine />;
    if (lower.includes("robot") || lower.includes("ai")) return <FaRobot />;
    return <FaGraduationCap />;
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Vous devez être connecté pour vous inscrire à une formation !", {
        position: "top-center",
        autoClose: 3000,
        onClose: () => navigate('/login')
      });
      return;
    }

    addToCart(formation);
    toast.success(`${formation.name} ajouté au panier !`);
  };

  return (
    <div className="bg-white p-7 shadow-xl rounded-xl border border-gray-100 flex flex-col h-full transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="text-center mb-4">
        <span className="text-5xl text-gray-500 mx-auto">
          {getFormationIcon(formation.name)}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-3 text-center text-gray-800">
        {formation.name}
      </h3>
      <p className="text-gray-600 mb-4 text-center flex-grow">{formation.description}</p>

      <div className="flex items-center justify-center text-xl mb-4 pt-4 border-t border-gray-200">
        <span className="text-gray-600 font-extrabold mr-2">
          {formation.price > 0 ? 'Fees' : 'GRATUIT'}
        </span>
        <p className="font-extrabold text-gray-800">
          {formation.price > 0 ? formation.price.toLocaleString() + ' Ar' : '0 Ar'}
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-auto text-white p-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-700"
        style={{ backgroundColor: '#314482' }}
      >
        {formation.price > 0 ? 'S’inscrire maintenant' : 'En savoir plus'}
      </button>
    </div>
  );
};

export default CardFormations;