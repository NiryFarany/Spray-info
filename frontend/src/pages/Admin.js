import React from "react";
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
//fa izy avao kay ty