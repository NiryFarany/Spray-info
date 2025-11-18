import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SprayInfoLogo from '../assets/images/sprayInfo.jpeg'; 
const { register } = require('../services/userService');
import { useNavigate } from 'react-router-dom';
// Remplacement des imports externes d'icônes par des SVGs inline pour la compatibilité
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
// Remplacement de l'import d'image par un placeholder SVG
// import SprayInfoLogo from '../assets/images/sprayInfo.jpeg'; 
// Si vous utilisez toast pour les notifications (comme dans les autres fichiers)
// import { toast } from 'react-toastify'; 

// SVG pour l'icône de l'œil (Afficher mot de passe)
const onSubmit = async (data) => {
  const { confirmPassword, ...registerData } = data;
  try {
    await register(registerData);
    alert('Inscription réussie ! Veuillez vous connecter.');
    navigate('/login');
  } catch (error) {
    alert(error.message);
  }
};

const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.661 10.038C3.12 4.905 6.784 2 10 2s6.88 2.905 9.339 8.038c-2.459 5.133-6.123 8.038-9.339 8.038S3.12 15.171.661 10.038zM10 16a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
  </svg>
);

// SVG pour l'icône de l'œil barré (Cacher mot de passe)
const EyeSlashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.52 3.52a.75.75 0 011.06 0L10 8.94l5.479-5.479a.75.75 0 111.061 1.06L11.06 10l5.48 5.48a.75.75 0 01-1.06 1.06L10 11.06l-5.48 5.48a.75.75 0 01-1.06-1.06L8.94 10 3.52 4.52a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);


const Register = () => {
  const primaryColor = '#314482'; // VOTRE BLEU DE MARQUE
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch, // Utilisé pour surveiller la valeur d'un champ
    formState: { errors, isSubmitting } 
  } = useForm(); 
  
  const password = watch("password"); // Regarde la valeur du champ 'password'
  

  const onSubmit = (data) => {
    // Retirez confirmPassword avant d'envoyer les données si ce n'est pas nécessaire à l'API
    const { confirmPassword, ...registerData } = data;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Register data:', registerData);
        // Remplacement de 'alert' par une notification simulée/un message de confirmation
        console.log('Inscription réussie ! Veuillez vérifier votre email. (Simulée)');
        resolve();
      }, 2000);
    });
  };

  return (
    // Ajout d'une div pour le style Tailwind si le code est utilisé dans un environnement qui ne fournit pas le conteneur principal
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
      <div className="bg-white p-10 w-full max-w-md rounded-xl shadow-2xl border border-gray-100">
        
        {/* En-tête avec Logo (Placeholder) */}
        
        <div className="text-center mb-8">
         
          <img 
                      src={SprayInfoLogo} 
                      alt="Spray Info Logo" 
                      // ⚠️ La bordure était indigo. Nous la changeons pour utiliser une classe bleue ou le style de couleur.
                      className="h-16 w-16 mx-auto mb-3 rounded-full border-2 border-blue-600 shadow-md" 
                    />

          
          <h2 className="text-4xl font-serif italic text-gray-900 mb-4">
           Create Your Account
          </h2>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap" rel="stylesheet"></link>
          <p className="text-gray-500 mt-1">Start learning from now</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          {/* Nom / Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              {...register('name', { 
                required: 'Your name is required',
                minLength: { value: 3, message: 'Must be at least 3 characters' }
              })}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
              style={{'--tw-ring-color': primaryColor}}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

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
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2`}
              style={{'--tw-ring-color': primaryColor}}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>
          
          {/* Mot de Passe */}
          <div className="mb-5">
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
                  minLength: { value: 8, message: 'Password must be at least 8 characters' }
                })}
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg pr-12 focus:outline-none focus:ring-2`}
                style={{'--tw-ring-color': primaryColor}}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-blue-700 transition"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>
          
          {/* Confirmer Mot de Passe (Amélioration Professionnelle) */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => 
                    value === password || 'Passwords do not match' // Validation personnalisée
                })}
                className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg pr-12 focus:outline-none focus:ring-2`}
                style={{'--tw-ring-color': primaryColor}}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500 hover:text-blue-700 transition"
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          {/* Bouton d'Inscription */}
          <button
            type="submit"
            disabled={isSubmitting} 
            style={{ backgroundColor: primaryColor }} // Bleu Vif de marque
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? 'Registering...' : 'Register'} 
          </button>
        </form>
        
        {/* Liens Utiles et Connexion */}
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
                Already have an account? 
                <a 
                    href="#" 
                    style={{ color: primaryColor }} // Bleu Vif
                    className="ml-1 font-semibold hover:text-blue-700 hover:underline transition duration-150"
                    onClick={(e) => { e.preventDefault(); console.log('Redirecting to login page'); }}
                >
                    Log in here
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
