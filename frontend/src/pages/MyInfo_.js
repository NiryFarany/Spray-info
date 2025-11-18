// src/pages/MyInfo.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UserIcon, PhoneIcon, MailIcon, LockClosedIcon, CalendarIcon, ShieldCheckIcon,EyeIcon, EyeSlashIcon } from '@heroicons/react/solid';
import { getProfile } from '../services/userService';
import { updateProfile } from '../services/userService';//changePassword
import { changePassword } from '../services/userService';
import Swal from 'sweetalert2';


export default function MyInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        Swal.fire("Erreur", "Impossible de charger vos informations", "error");
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

  /* const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      Swal.fire("Erreur", "Les deux mots de passe ne correspondent pas", "error");
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone || null
      };

      // Si mot de passe rempli → on le change (à implémenter plus tard si tu veux)
      if (formData.password) {
        // await changePassword({ old_password: ..., new_password: formData.password });
        Swal.fire("Bientôt disponible", "Changement de mot de passe en v2", "info");
      }

      const result = await updateProfile(updateData);
      setUser(result.user);
      setEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Mis à jour !',
        text: 'Vos informations ont été sauvegardées',
        timer: 2000
      });
    } catch (err) {
      Swal.fire("Erreur", err.message || "Échec de la mise à jour", "error");
    }
  };
 */
  /* const handleSubmit = async (e) => {
  e.preventDefault();

  // Vérification confirmation mot de passe
  if (formData.password) {
    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Erreur", "Les deux mots de passe ne correspondent pas", "error");
      return;
    }
    if (formData.password.length < 8) {
      Swal.fire("Erreur", "Le nouveau mot de passe doit faire 8 caractères minimum", "error");
      return;
    }
  }

  try {
    // 1. D’ABORD : changer le mot de passe si rempli
    if (formData.password) {
      await changePassword({
        currentPassword: prompt("Confirmez votre mot de passe actuel pour continuer"), // SÉCURITÉ
        newPassword: formData.password
      });

      if (!window.confirm("Mot de passe changé ! Voulez-vous continuer à sauvegarder nom/téléphone ?")) {
        Swal.fire("Succès", "Mot de passe mis à jour !", "success");
        setEditing(false);
        return;
      }
    }

    // 2. ENSUITE : mettre à jour nom + téléphone
    const updateData = {
      name: formData.name.trim(),
      phone: formData.phone.trim() || null
    };

    const result = await updateProfile(updateData);
    setUser(result.user);
    setEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Parfait !',
      text: 'Profil et mot de passe mis à jour avec succès',
      timer: 2500
    });

  } catch (err) {
    Swal.fire("Erreur", err.message || "Échec de la mise à jour", "error");
  }
};
 */
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Vérification mot de passe
  if (formData.password) {
    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Erreur", "Les deux mots de passe ne correspondent pas", "error");
      return;
    }
    if (formData.password.length < 8) {
      Swal.fire("Erreur", "Le nouveau mot de passe doit contenir au moins 8 caractères", "error");
      return;
    }
  }

  try {
    // 2. Si mot de passe rempli → on demande l’ancien avec une belle popup
    if (formData.password) {
      const { value: currentPass } = await Swal.fire({
        title: 'Confirmez votre identité',
        input: 'password',
        inputLabel: 'Mot de passe actuel',
        inputPlaceholder: 'Entrez votre mot de passe actuel',
        showCancelButton: true,
        confirmButtonText: 'Valider',
        cancelButtonText: 'Annuler',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        inputValidator: (value) => {
          if (!value) return 'Ce champ est obligatoire !';
        }
      });

      if (!currentPass) {
        Swal.fire("Annulé", "Changement de mot de passe annulé", "info");
        return;
      }

      // Envoi du changement de mot de passe
      await changePassword({
        currentPassword: currentPass,
        newPassword: formData.password
      });

      Swal.fire({
        icon: 'success',
        title: 'Mot de passe changé !',
        text: 'Votre mot de passe a été mis à jour avec succès',
        timer: 2000,
        showConfirmButton: false
      });
    }

    // 3. Mise à jour du nom + téléphone
    const updateData = {
      name: formData.name.trim(),
      phone: formData.phone.trim() || null
    };

    const result = await updateProfile(updateData);
    setUser(result.user);
    setEditing(false);

    // Message final
    Swal.fire({
      icon: 'success',
      title: 'Parfait !',
      text: formData.password 
        ? 'Profil et mot de passe mis à jour avec succès' 
        : 'Vos informations ont été mises à jour',
      timer: 2500,
      showConfirmButton: false
    });

  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Échec',
      text: err.message || "Une erreur est survenue lors de la sauvegarde",
    });
  }
};

  if (loading) return <div className="text-center py-32 text-2xl">Chargement de votre profil...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/clientData")}
          className="mb-10 bg-gray-700 hover:bg-gray-800 text-white py-3 px-8 rounded-xl flex items-center transition text-lg font-semibold shadow-lg"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-3" />
          Retour au tableau de bord
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-t-8 border-indigo-600">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <UserIcon className="h-20 w-20 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold">Mon Profil Complet</h1>
            <p className="text-xl mt-3 opacity-90">Toutes vos informations personnelles</p>
          </div>

          <div className="p-12">
            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-3">
                      <UserIcon className="h-7 w-7 mr-3 text-indigo-600" /> Nom complet
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg" />
                  </div>

                  {/* <div>
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-3">
                      <MailIcon className="h-7 w-7 mr-3 text-indigo-600" /> Email
                    </label>
                    <input type="email" value={formData.email} disabled
                      className="w-full px-6 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl text-gray-600 text-lg" />
                  </div> */}
                  <div>
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-3">
                      <MailIcon className="h-7 w-7 mr-3 text-indigo-600" /> Email
                    </label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      disabled 
                      className="w-full px-6 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl text-gray-600 text-lg" 
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      L’email ne peut pas être modifié pour des raisons de sécurité
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-3">
                      <PhoneIcon className="h-7 w-7 mr-3 text-indigo-600" /> Téléphone (Mvola)
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="034 12 345 67"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg" />
                  </div>

                  <div>
                    <label className="flex items-center text-lg font-bold text-gray-800 mb-3">
                      <LockClosedIcon className="h-7 w-7 mr-3 text-indigo-600" /> Nouveau mot de passe
                    </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                      placeholder="Laissez vide pour ne pas changer"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg" />
                  </div>

                  <div className="md:col-span-2">
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                      placeholder="Confirmez le nouveau mot de passe"
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none text-lg" />
                  </div>
                </div>

                <div className="flex justify-center gap-6 pt-8">
                  <button type="submit"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-xl transition transform hover:scale-105">
                    Sauvegarder toutes les modifications
                  </button>
                  <button type="button" onClick={() => setEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-5 px-12 rounded-xl text-xl shadow-xl transition">
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-4"><UserIcon className="h-8 w-8 text-indigo-600 mr-4" /><strong className="text-xl">Nom :</strong></div>
                    <p className="text-2xl font-bold text-indigo-800">{user.name}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-4"><MailIcon className="h-8 w-8 text-purple-600 mr-4" /><strong className="text-xl">Email :</strong></div>
                    <p className="text-2xl font-bold text-purple-800">{user.email}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-4"><PhoneIcon className="h-8 w-8 text-green-600 mr-4" /><strong className="text-xl">Téléphone :</strong></div>
                    <p className="text-2xl font-bold text-green-800">{user.phone || "Non renseigné"}</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-4"><ShieldCheckIcon className="h-8 w-8 text-orange-600 mr-4" /><strong className="text-xl">Statut :</strong></div>
                    <p className="text-2xl font-bold text-orange-800">
                      {user.is_admin ? "ADMINISTRATEUR" : "Utilisateur"}
                    </p>
                  </div>

                  <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-4"><CalendarIcon className="h-8 w-8 text-blue-600 mr-4" /><strong className="text-xl">Inscrit le :</strong></div>
                    <p className="text-2xl font-bold text-blue-800">{user.created_at}</p>
                  </div>
                </div>

                <div className="text-center pt-10">
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-6 px-16 rounded-xl text-2xl shadow-2xl transition transform hover:scale-105"
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