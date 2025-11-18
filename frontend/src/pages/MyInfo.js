// src/pages/MyInfo.js → VERSION FINALE SPRAY INFO BLEU & BLANC
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  MailIcon,
  LockClosedIcon,
  CalendarIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeOffIcon
}from '@heroicons/react/outline';//} from '@heroicons/react/24/outline';
import { getProfile, updateProfile, changePassword } from '../services/userService';
import Swal from 'sweetalert2';

export default function MyInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        Swal.fire("Erreur", "Impossible de charger le profil", "error");
        navigate('/clientData');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        Swal.fire("Erreur", "Les mots de passe ne correspondent pas", "error");
        return;
      }
      if (formData.password.length < 8) {
        Swal.fire("Erreur", "Le mot de passe doit contenir au moins 8 caractères", "error");
        return;
      }
    }

    try {
      if (formData.password) {
        const result = await Swal.fire({
          title: 'Changement de mot de passe',
          html: '<p>Vous souvenez-vous de votre mot de passe actuel ?</p>',
          showCancelButton: true,
          confirmButtonText: 'Oui, je le connais',
          cancelButtonText: 'Non, je l\'ai oublié',
          reverseButtons: true,
          confirmButtonColor: '#1d4ed8',
          cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
          const { value: currentPass } = await Swal.fire({
            title: 'Mot de passe actuel',
            input: 'password',
            inputLabel: 'Entrez votre mot de passe actuel',
            showCancelButton: true,
            confirmButtonColor: '#1d4ed8',
            inputValidator: (value) => !value && 'Champ obligatoire'
          });
          if (!currentPass) return;

          await changePassword({ currentPassword: currentPass, newPassword: formData.password });
          Swal.fire("Succès", "Mot de passe mis à jour !", "success");
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Mot de passe oublié ?',
            text: 'Redirection vers la réinitialisation par email...',
            confirmButtonColor: '#1d4ed8'
          }).then(() => navigate('/forgot-password'));
          return;
        }
      }

      const updateData = { name: formData.name.trim(), phone: formData.phone.trim() || null };
      const result = await updateProfile(updateData);
      setUser(result.user);
      setEditing(false);

      Swal.fire({
        icon: 'success',
        title: 'Parfait !',
        text: formData.password ? 'Profil et mot de passe mis à jour' : 'Profil mis à jour',
        timer: 2500,
        showConfirmButton: false
      });

    } catch (err) {
      Swal.fire("Erreur", err.message || "Échec de la sauvegarde", "error");
    }
  };

  if (loading) return <div className="text-center py-32 text-2xl text-blue-700">Chargement du profil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton Retour */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-700 hover:text-blue-900 font-semibold transition"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Retour
        </button>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-blue-700">
          {/* En-tête bleu Spray Info */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-10 text-center">
            <div className="w-28 h-28 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <UserIcon className="h-16 w-16 text-blue-700" />
            </div>
            <h1 className="text-4xl font-bold">Mon Profil</h1>
            <p className="text-lg opacity-90 mt-2">Vos informations personnelles</p>
          </div>

          <div className="p-8 lg:p-12">
            {editing ? (
              /* FORMULAIRE D'ÉDITION */
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nom */}
                  <div>
                    <label className="flex items-center text-blue-800 font-bold mb-2">
                      <UserIcon className="h-6 w-6 mr-2" /> Nom complet
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" />
                  </div>

                  {/* Email (désactivé) */}
                  <div>
                    <label className="flex items-center text-blue-800 font-bold mb-2">
                      <MailIcon className="h-6 w-6 mr-2" /> Email
                    </label>
                    <input type="email" value={formData.email} disabled
                      className="w-full px-5 py-3 bg-gray-100 border-2 border-gray-300 rounded-lg text-gray-600" />
                    <p className="text-xs text-gray-500 mt-1">Non modifiable pour la sécurité</p>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="flex items-center text-blue-800 font-bold mb-2">
                      <PhoneIcon className="h-6 w-6 mr-2" /> Téléphone (Mvola)
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="034 12 345 67"
                      className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" />
                  </div>

                  {/* Nouveau mot de passe */}
                  <div className="relative">
                    <label className="flex items-center text-blue-800 font-bold mb-2">
                      <LockClosedIcon className="h-6 w-6 mr-2" /> Nouveau mot de passe
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Laissez vide pour ne pas changer"
                      className="w-full px-5 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-11 text-gray-500 hover:text-blue-700">
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Confirmation */}
                  <div className="md:col-span-2 relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmez le nouveau mot de passe"
                      className="w-full px-5 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-4 text-gray-500 hover:text-blue-700">
                      {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-6">
                  <button type="submit"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition transform hover:scale-105">
                    Sauvegarder
                  </button>
                  <button type="button" onClick={() => setEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-lg transition">
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              /* AFFICHAGE DES INFOS */
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center text-blue-800 font-bold mb-2">
                      <UserIcon className="h-6 w-6 mr-2" /> Nom
                    </div>
                    <p className="text-xl font-semibold text-blue-900">{user.name}</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center text-blue-800 font-bold mb-2">
                      <MailIcon className="h-6 w-6 mr-2" /> Email
                    </div>
                    <p className="text-xl font-semibold text-blue-900">{user.email}</p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center text-blue-800 font-bold mb-2">
                      <PhoneIcon className="h-6 w-6 mr-2" /> Téléphone
                    </div>
                    <p className="text-xl font-semibold text-blue-900">{user.phone || "Non renseigné"}</p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="flex items-center text-red-800 font-bold mb-2">
                      <LockClosedIcon className="h-6 w-6 mr-2" /> Mot de passe
                    </div>
                    <p className="text-xl font-bold text-red-700">••••••••••</p>
                    <p className="text-sm text-gray-600">Masqué pour votre sécurité</p>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <div className="flex items-center text-yellow-800 font-bold mb-2">
                      <ShieldCheckIcon className="h-6 w-6 mr-2" /> Statut
                    </div>
                    <p className="text-xl font-bold text-yellow-900">
                      {user.is_admin ? "Administrateur" : "Utilisateur"}
                    </p>
                  </div>

                  <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200 md:col-span-2">
                    <div className="flex items-center text-cyan-800 font-bold mb-2">
                      <CalendarIcon className="h-6 w-6 mr-2" /> Inscrit le
                    </div>
                    <p className="text-xl font-bold text-cyan-900">{user.created_at}</p>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-16 rounded-lg text-xl shadow-xl transition transform hover:scale-105"
                  >
                    Modifier mes informations
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}