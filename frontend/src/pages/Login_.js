// Fichier: Login.jsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg'; 
const { login } = require('../services/userService');
const { useNavigate } = require('react-router-dom');

const onSubmit = async (data) => {
  try {
    await login(data.email, data.password);
    alert('Connexion réussie !');
    navigate('/my-orders');
  } catch (error) {
    alert(error.message);
  }
};

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(); 
  const [showPassword, setShowPassword] = useState(false);
  const primaryColor = '#314482'; // VOTRE BLEU DE MARQUE  #007BFF'
  

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Login data:', data);
        alert('Connexion réussie ! (Simulée)');
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 w-full max-w-md rounded-xl shadow-2xl border border-gray-100">
        
        {/* En-tête avec Logo */}
        <div className="text-center mb-8">
          <img 
            src={SprayInfoLogo} 
            alt="Spray Info Logo" 
            // ⚠️ La bordure était indigo. Nous la changeons pour utiliser une classe bleue ou le style de couleur.
            className="h-16 w-16 mx-auto mb-3 rounded-full border-2 border-blue-600 shadow-md" 
          />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome!
          </h2>
          <p className="text-gray-500 mt-1">Log in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
              })}
              // 🛑 Utilisation des styles pour le focus ring (Bleu Vif) au lieu de ring-indigo-500
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
              style={{'--tw-ring-color': primaryColor}} // Définit la couleur du ring via CSS variable
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          {/* Mot de Passe */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Must be at least 6 characters' }
                })}
                // 🛑 Utilisation des styles pour le focus ring (Bleu Vif) au lieu de ring-indigo-500
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg pr-12 focus:outline-none focus:ring-2`}
                style={{'--tw-ring-color': primaryColor}} // Définit la couleur du ring via CSS variable
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                // ⚠️ Changement de hover:text-indigo-600 à hover:text-blue-700
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-blue-700 transition"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          
          {/* Bouton de Connexion */}
          <button
            type="submit"
            disabled={isSubmitting} 
            style={{ backgroundColor: primaryColor }} // Bleu Vif
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'} 
          </button>
        </form>
        
        {/* Liens Utiles et Inscription */}
        <div className="mt-6 text-center">
            <a 
                href="#" 
                style={{ color: primaryColor }} // Bleu Vif
                className="text-sm font-medium hover:text-blue-700 hover:underline transition duration-150 block"
                onClick={(e) => { e.preventDefault(); alert('Redirecting to password reset page'); }}
            >
                Forgot your password?
            </a>
            
            <p className="text-sm text-gray-600 mt-4">
                Don't have an account? 
                <a 
                    href="#" 
                    style={{ color: primaryColor }} // Bleu Vif
                    className="ml-1 font-semibold hover:text-blue-700 hover:underline transition duration-150"
                    onClick={(e) => { e.preventDefault(); alert('Redirecting to registration page'); }}
                >
                    Register
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;