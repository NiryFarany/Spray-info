// src/pages/Register.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../services/userService';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg';

const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.661 10.038C3.12 4.905 6.784 2 10 2s6.88 2.905 9.339 8.038c-2.459 5.133-6.123 8.038-9.339 8.038S3.12 15.171.661 10.038zM10 16a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
  </svg>
);

const EyeSlashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.52 3.52a.75.75 0 011.06 0L10 8.94l5.479-5.479a.75.75 0 111.061 1.06L11.06 10l5.48 5.48a.75.75 0 01-1.06 1.06L10 11.06l-5.48 5.48a.75.75 0 01-1.06-1.06L8.94 10 3.52 4.52a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const Register = () => {
  const primaryColor = '#314482';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data;
    try {
      await apiRegister(userData);
      alert('Inscription réussie ! Veuillez vous connecter.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 w-full max-w-md rounded-xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <img src={SprayInfoLogo} alt="Logo" className="h-16 w-16 mx-auto mb-3 rounded-full border-2 border-blue-600 shadow-md" />
          <h2 className="text-4xl font-serif italic text-gray-900 mb-4">Create Your Account</h2>
          <p className="text-gray-500 mt-1">Start learning from now</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              {...register('name', { required: 'Nom requis', minLength: { value: 3, message: '3 caractères min' } })}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
              style={{ '--tw-ring-color': primaryColor }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="text"
              {...register('phone', {
                required: 'Téléphone requis',
                pattern: { value: /^[0-9+\- ]+$/, message: 'Numéro invalide' }
              })}
              className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>


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

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Mot de passe requis', minLength: { value: 8, message: '8 caractères min' } })}
                className={`w-full p-3 pr-12 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
                style={{ '--tw-ring-color': primaryColor }}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 cursor-pointer">
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirmez votre mot de passe',
                  validate: value => value === password || 'Les mots de passe ne correspondent pas'
                })}
                className={`w-full p-3 pr-12 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
                style={{ '--tw-ring-color': primaryColor }}
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 cursor-pointer">
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: primaryColor }}
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ? <a href="/login" style={{ color: primaryColor }} className="font-semibold hover:underline">Se connecter</a>
          </p>
        </div>
        {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <a
            href="/login"
            style={{ color: primaryColor }}
            className="font-semibold hover:underline"
            >
            Se connecter
            </a>
        </p>
        </div> */}
      </div>
    </div>
  );
};

export default Register;