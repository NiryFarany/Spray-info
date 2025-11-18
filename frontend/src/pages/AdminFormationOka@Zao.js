// src/pages/AdminFormation.js
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { getFormations, addFormation, updateFormation, deleteFormation, viewFormation } from '../services/formationService';
import Swal from 'sweetalert2';
// Importation des icônes nécessaires
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon, ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/solid';


const AdminFormation = () => {
  const navigate = useNavigate();

  // ✅ FORMULAIRE DE FORMATION (inchangé)
const FormationForm = ({ formData, handleChange, onSubmit, buttonText, title, onCancel }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl mb-6 border border-gray-200">
    <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>

    <form onSubmit={onSubmit} className="space-y-4">

      <input type="hidden" name="id" value={formData.id || ''} onChange={handleChange} />

      <div>
        <label className="block text-sm font-medium text-gray-700">Nom de la Formation</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prix (Ar)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input type="text" name="dates" value={formData.dates} onChange={handleChange}
          placeholder="ex. 2025-11-01"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition">
          Annuler
        </button>
        <button type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
          {buttonText}
        </button>
      </div>

    </form>
  </div>
);

// --- États et Fonctions (inchangés sauf l'icône BookOpenIcon) ---

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    location: '',
    dates: '',
  });

  const [formations, setFormations] = useState([]);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const data = await getFormations();
      setFormations(data);
    } catch (error) {
      setMessage("Erreur lors du chargement des formations ❌");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // ✅ AJOUT
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFormation(formData);
      setMessage("Formation ajoutée avec succès ✅");
      setShowAddForm(false);
      setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' });
      fetchFormations();
    } catch {
      setMessage("Erreur lors de l'ajout ❌");
    }
  };


  // ✅ UPDATE
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFormation(formData.id, formData);
      setMessage("Formation modifiée ✅");
      setShowUpdateForm(false);
      setSelectedFormation(null);
      setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' });
      fetchFormations();
    } catch {
      setMessage("Erreur lors de la modification ❌");
    }
  };


  const openAddForm = () => {
    setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' });
    setShowUpdateForm(false);
    setShowAddForm(true);
    setMessage('');
  };

  const handleEdit = (formation) => {
    setFormData(formation);
    setSelectedFormation(formation);
    setShowAddForm(false);
    setShowUpdateForm(true);
  };


  const closeForms = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setSelectedFormation(null);
  };


  const handleDelete = async (id) => {
    try {
      await deleteFormation(id);
      setMessage("Formation supprimée ✅");
      fetchFormations();
    } catch {
      setMessage("Erreur lors de la suppression ❌");
    }
  };


  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };


  const handleView = async (formation) => {
    try {
      const data = await viewFormation(formation.id);
      Swal.fire({
        title: `Formation : ${data.name}`,
        html: `
          <p><strong>Description :</strong> ${data.description}</p>
          <p><strong>Prix :</strong> ${data.price.toLocaleString()} Ar</p>
          <p><strong>Lieu :</strong> ${data.location}</p>
          <p><strong>Date :</strong> ${data.dates}</p>
        `,
        icon: "info",
        confirmButtonText: "Fermer",
      });
    } catch {
      Swal.fire("Erreur", "Impossible de récupérer la formation", "error");
    }
  };

return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Bouton Retour : positionné haut et à gauche */}
      <div className="mb-8">
        <button 
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white py-2 px-4 rounded-lg transition"
        >
          <ArrowLeftIcon className="h-5 w-5" /> **Retour Admin**
        </button>
      </div>

      {/* 2. Carte Titre principal centré */}
      <div className="bg-white shadow-xl rounded-xl p-8 mb-8 text-center border-t-4 border-blue-600">
        <BookOpenIcon className="h-10 w-10 mx-auto text-blue-600 mb-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des Formations</h1>
      </div>

      {/* 3. Bouton Ajouter et Message */}
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={openAddForm}
          className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> **Ajouter une Formation**
        </button>
      </div>

      {message && (
        <p className={`text-center font-semibold mb-4 ${
          message.includes('succès') ? 'text-green-600' : 'text-red-600'
        }`}>
          {message}
        </p>
      )}

      {/* 4. Affichage des formulaires d'ajout/modification */}
      {(showAddForm || showUpdateForm) && (
        <div className="mb-8">
          {showAddForm && (
            <FormationForm
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleAddSubmit}
              buttonText="Ajouter"
              title="Ajouter une Nouvelle Formation"
              onCancel={closeForms}
            />
          )}
          
          {showUpdateForm && (
            <FormationForm
              formData={formData}
              handleChange={handleChange}
              onSubmit={handleUpdateSubmit}
              buttonText="Mettre à jour"
              title={`Modifier la Formation : ${selectedFormation?.name}`}
              onCancel={closeForms}
            />
          )}
        </div>
      )}

      {/* 5. Tableau des Formations (Stylé) */}
      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="py-3 px-6 rounded-tl-xl">Nom</th>
              <th className="py-3 px-6">Prix (Ar)</th>
              <th className="py-3 px-6">Lieu</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6 text-center rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((formation, index) => (
              <tr 
                key={formation.id} 
                className={`border-b hover:bg-blue-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="py-4 px-6 font-medium text-gray-800">{formation.name}</td>
                <td className="py-4 px-6 font-semibold text-green-700">
                  {formation.price.toLocaleString()} Ar
                </td>
                <td className="py-4 px-6">{formation.location}</td>
                <td className="py-4 px-6">{formation.dates}</td>
                <td className="py-4 px-6 flex justify-center gap-3">
                  {/* Vue */}
                  <EyeIcon 
                    className="h-6 w-6 cursor-pointer text-blue-600 hover:text-blue-800 transition"
                    onClick={() => handleView(formation)} 
                    title="Voir les détails"
                  />
                  {/* Modifier */}
                  <PencilIcon 
                    className="h-6 w-6 cursor-pointer text-yellow-600 hover:text-yellow-800 transition"
                    onClick={() => handleEdit(formation)} 
                    title="Modifier"
                  />
                  {/* Supprimer */}
                  <TrashIcon 
                    className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDeleteClick(formation.id)} 
                    title="Supprimer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
);


};

export default AdminFormation;