import React, { useContext } from 'react';
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

export default CardFormations;