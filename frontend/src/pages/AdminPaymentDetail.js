// src/pages/OrderDetail.js

//vo hovaiko juste avy natao copie collé t@ OrderDetail
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import { getOrder } from '../services/orderService';
import {  ArrowLeftIcon} from '@heroicons/react/solid';


export default function AdminPaymentDetail() {
    const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <button onClick={() => navigate("/admin/payment")}
      className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
      {/* //⬅ Retour */}
      <ArrowLeftIcon className="h-5 w-5 mr-2" /> 
      </button>
      <h1 className="text-3xl font-bold mb-4">Detail payment </h1>
      
         
    </div>
  );
}