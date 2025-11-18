// src/pages/Login.js → VERSION QUI MARCHE À COUP SÛR
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ON UTILISE LE CONTEXT DIRECTEMENT
import { toast } from 'react-toastify';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth(); // ON RÉCUPÈRE login ET user du contexte

  // CETTE PARTIE EST LA CLÉ : ON ÉCOUTE SI L'USER CHANGE APRÈS LOGIN
  useEffect(() => {
    if (user) {
      toast.success(`Bienvenue ${user.name} !`);
      
      // Redirection intelligente
      if (user.is_admin) {
        navigate('/admin');
      } else {
        navigate('/clientData');
      }
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password); // Cette fonction met à jour le context
      // ON NE NAVIGUE PLUS ICI → on laisse l'effect s'en occuper
    } catch (error) {
      toast.error(error.message || "Erreur de connexion");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-10 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <img src={SprayInfoLogo} alt="Logo" className="h-20 w-20 mx-auto mb-4 rounded-full border-4 border-blue-600 shadow-lg" />
          <h2 className="text-4xl font-extrabold text-gray-900">Welcome!</h2>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email requis',
                pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
              })}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
              placeholder="exemple@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { 
                  required: 'Mot de passe requis',
                  minLength: { value: 6, message: 'Minimum 6 caractères' }
                })}
                className="w-full p-4 pr-14 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition shadow-lg disabled:opacity-70"
          >
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-3">
          <button className="text-blue-700 hover:underline text-sm">
            Mot de passe oublié ?
          </button>
          <p className="text-gray-600">
            Pas de compte ?{' '}
            <a href="/register" className="text-blue-700 font-bold hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
//apres nle Loginmarche io ah