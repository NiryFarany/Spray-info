// src/pages/Login.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/userService'; // NAMED
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const primaryColor = '#314482';

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      alert('Connexion réussie !');
      //navigate('/my-orders');//miala @zay ty
      navigate('/clientData');
      //navigate('/clientData');//ok kolahy, sady mandeha automatique hoe tsisy commande, tsy haiko hoe aona fa tokony hisy message kosa aloha hoe mbola zero commande
      //angao hek
      //navigate('/admin'); //si admin de redirigé ato
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 w-full max-w-md rounded-xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <img src={SprayInfoLogo} alt="Logo" className="h-16 w-16 mx-auto mb-3 rounded-full border-2 border-blue-600 shadow-md" />
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome!</h2>
          <p className="text-gray-500 mt-1">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email requis', pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' } })}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
              style={{ '--tw-ring-color': primaryColor }}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Mot de passe requis', minLength: { value: 6, message: '6 caractères min' } })}
                className={`w-full p-3 pr-12 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
                style={{ '--tw-ring-color': primaryColor }}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 cursor-pointer">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: primaryColor }}
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <a href="#" style={{ color: primaryColor }} className="text-sm hover:underline" onClick={(e) => { e.preventDefault(); alert('Mot de passe oublié'); }}>
            Mot de passe oublié ?
          </a>
          <p className="text-sm text-gray-600 mt-4">
            Pas de compte ? <a href="/register" style={{ color: primaryColor }} className="font-semibold hover:underline">S'inscrire</a>
          </p>
        </div> 
        alana hek ty zany
        */}
        {/* // Dans le bas du formulaire */}
        <div className="mt-6 text-center">
        <button
            type="button"
            style={{ color: primaryColor }}
            className="text-sm hover:underline"
            onClick={() => alert('Mot de passe oublié')}
        >
            Mot de passe oublié ?
        </button>
        <p className="text-sm text-gray-600 mt-4">
            Pas de compte ?{' '}
            <a
            href="/register"
            style={{ color: primaryColor }}
            className="font-semibold hover:underline"
            >
            S'inscrire
            </a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
//avy @ login ok 1 
//de tiako ho rediriger-na @ user page ao