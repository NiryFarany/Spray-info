// src/pages/Login.js → VERSION PARFAITE (à copier-coller)

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth(); // ← on prend login du contexte

  // REDIRECTION AUTOMATIQUE DÈS QUE L'USER CHANGE
  useEffect(() => {
    if (user) {
      toast.success(`Bienvenue ${user.name} !`);
      if (user.is_admin) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/clientData', { replace: true });
      }
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password); // ← met à jour le state user
      // Plus besoin de navigate ici → useEffect s'en charge
    } catch (error) {
      toast.error(error.message || "Erreur de connexion");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white p-10 w-full max-w-md rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <img src={SprayInfoLogo} alt="Logo" className="h-20 w-20 mx-auto mb-4 rounded-full border-4 border-blue-700" />
          <h2 className="text-4xl font-bold text-gray-800">Welcome!</h2>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email requis' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none"
              placeholder="votre@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Mot de passe requis' })}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#314482] text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition shadow-lg disabled:opacity-60"
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <a href="/forgot-password" className="text-[#314482] hover:underline text-sm">
            Mot de passe oublié ?
          </a>
          <p className="text-gray-600">
            Pas de compte ?{' '}
            <a href="/register" className="text-[#314482] font-bold hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;