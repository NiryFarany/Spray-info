import React from "react";
import { useNavigate } from "react-router-dom";
import {  ArrowLeftIcon } from '@heroicons/react/solid';


const AdminPersonnel = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 px-6">
      <button onClick={() => navigate("/admin")}
        className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
        {/* ⬅ Retour */}
         <ArrowLeftIcon className="h-5 w-5 mr-2" /> 
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Gestion du Personnelaaa</h2>
        <p>➡ Tu ajouteras ici la gestion des membres du personnel.</p>
      </div>
    </div>
  );
};

export default AdminPersonnel;
