import { getFormations } from "../services/formationService";
import { useEffect, useState } from "react";

export default function Home() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormations();
      setFormations(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {formations.map((f) => (
        <div key={f.id}>{f.name} - {f.price} Ar</div>
      ))}
    </div>
  );
} 

/* 
{/* <div className="absolute inset-0 bg-[u r l('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
            < div className="absolute inset-0 bg-[u r l('/images/hero.jpg')] bg-cover bg-center opacity-20"></div>
   * /}
         {/* < div className="absolute inset-0 bg-[u r l('../src/assets/images/sprayinfo.jpeg')] bg-cover bg-center opacity-20"></div> * /}
    */       


/* import React from "react";
const Home = () => {
     return (
    <div>
      <h1>allo erreur Admin</h1>
       mandeha tsara 
    </div>
  );


}
export default Home; */

/* import React, { useState, useEffect } from 'react';
import { getFormations, addFormation, updateFormation, deleteFormation, viewFormation } from '../services/formationService';
import Swal from 'sweetalert2';
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/solid'; // Ajout de PencilIcon, TrashIcon et PlusIcon

const Admin = () => {
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
  const [showAddForm, setShowAddForm] = useState(false); // État pour afficher/masquer le formulaire d'ajout
  const [showUpdateForm, setShowUpdateForm] = useState(false); // État pour afficher/masquer le formulaire de modification
  const [selectedFormation, setSelectedFormation] = useState(null); // Pour stocker la formation en cours de modification

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const data = await getFormations();
      setFormations(data);
    } catch (error) {
      setMessage('Erreur lors du chargement des formations');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de l'ajout
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFormation({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        dates: formData.dates,
      });
      setMessage('Formation ajoutée avec succès');
      setShowAddForm(false); // Masquer le formulaire après l'ajout
      setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' }); // Réinitialiser le formulaire
      fetchFormations(); // Rafraîchir la liste
    } catch (error) {
      setMessage("Erreur lors de l'ajout");
    }
  };
  
  // Gestion de la modification
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFormation(formData.id, {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        dates: formData.dates,
      });
      setMessage('Formation modifiée avec succès');
      setShowUpdateForm(false); // Masquer le formulaire après la modification
      setSelectedFormation(null); // Réinitialiser la sélection
      setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' }); // Réinitialiser le formulaire
      fetchFormations(); // Rafraîchir la liste
    } catch (error) {
      setMessage('Erreur lors de la modification');
    }
  };
  
  // Ouvre le formulaire d'ajout et masque les autres
  const openAddForm = () => {
    setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' }); // Assurez-vous que le formulaire est vide
    setShowUpdateForm(false);
    setShowAddForm(true);
    setMessage('');
  };

  // Ouvre le formulaire de modification pour la formation sélectionnée
  const handleEdit = (formation) => {
    setFormData(formation);
    setSelectedFormation(formation);
    setShowAddForm(false);
    setShowUpdateForm(true);
    setMessage('');
  };

  // Ferme les deux formulaires et réinitialise les données
  const closeForms = () => {
    setShowAddForm(false);
    setShowUpdateForm(false);
    setSelectedFormation(null);
    setFormData({ id: null, name: '', description: '', price: '', location: '', dates: '' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteFormation(id);
      fetchFormations(); // Rafraîchir la liste
      setMessage('Formation supprimée avec succès');
    } catch (error) {
      setMessage('Erreur lors de la suppression');
    }
  }; 

  const handleDeleteClick = (id) => {
      Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "Vous ne pourrez pas annuler cette suppression!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Oui, supprimer!',
          cancelButtonText: 'Annuler'
      }).then((result) => {
          if (result.isConfirmed) {
              handleDelete(id);
              Swal.fire(
                  'Supprimé!',
                  'La formation a été supprimée.',
                  'success'
              );
          }
      });
  };

  const handleView = async (formation) => {
    // Utiliser SweetAlert2 pour afficher les détails complets
     Swal.fire({
      title: `Détails de la Formation: ${formation.name}`,
      html: `
        <p><strong>Description:</strong> ${formation.description}</p>
        <p><strong>Prix (Ar):</strong> ${formation.price}</p>
        <p><strong>Lieu:</strong> ${formation.location}</p>
        <p><strong>Date:</strong> ${formation.dates}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Fermer'
    }); 

    /* Swal.fire({
    html: `<h2><b>Détails de la Formation: ${formation.name}</b></h2>
            <p><strong>Description:</strong> ${formation.description}</p>
            <p><strong>Prix (Ar):</strong> ${formation.price}</p>
            <p><strong>Lieu:</strong> ${formation.location}</p>
            <p><strong>Date:</strong> ${formation.dates}</p>`,
    icon: 'info',
    confirmButtonText: 'Fermer'
    });
 */

    // Optionnel: Si vous avez besoin de récupérer les données complètes via l'API avant l'affichage
    /* try {
      const data = await viewFormation(id);
      // Afficher les données `data` dans Swal.fire
    } catch (error) {
      setMessage('Erreur de chargement des détails');
    } * /
  };

  // Composant Formulaire (Ajout ou Modification)
  const FormationForm = ({ onSubmit, buttonText, title, onCancel }) => (
    <div className="bg-white p-6 rounded-lg shadow-xl mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="hidden"
          name="id"
          value={formData.id || ''}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom de la Formation</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix (Ar)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Lieu</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="text"
            name="dates"
            value={formData.dates}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="ex. 2025-11-01"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">✨ Admin Panel - Gérer les Formations</h1>
      {message && (
        <p className={`mb-4 p-3 rounded ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      {/* Bouton d'ajout * /}
      <div className="mb-6 flex justify-end">
        <button
          onClick={openAddForm}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center transition shadow-lg"
        >
          <PlusIcon className="h-5 w-5 mr-2" /> Ajouter une Formation
        </button>
      </div>

      {/* Affichage conditionnel des formulaires * /}
      {showAddForm && (
        <FormationForm
          onSubmit={handleAddSubmit}
          buttonText="Ajouter la Formation"
          title="Ajouter une Nouvelle Formation"
          onCancel={closeForms}
        />
      )}

      {showUpdateForm && selectedFormation && (
        <FormationForm
          onSubmit={handleUpdateSubmit}
          buttonText="Modifier la Formation"
          title={`Modifier: ${selectedFormation.name}`}
          onCancel={closeForms}
        />
      )}

      {/* Liste des Formations * /}
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Liste des Formations</h2>
      <div className="space-y-3">
        {formations.length > 0 ? (
          formations.map((formation) => (
            <div key={formation.id} className="border p-4 rounded-lg flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
              <span className="font-semibold text-lg text-gray-800">{formation.name}</span>
              <div className="flex space-x-2">
                {/* Bouton Voir (Œil) * /}
                <button
                  onClick={() => handleView(formation)}
                  title="Voir les détails"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                {/* Bouton Modifier * /}
                <button
                  onClick={() => handleEdit(formation)}
                  title="Modifier"
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition flex items-center justify-center"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                {/* Bouton Supprimer * /}
                <button
                  onClick={() => handleDeleteClick(formation.id)}
                  title="Supprimer"
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition flex items-center justify-center"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-4 border rounded-lg bg-gray-50">Aucune formation disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
// erreur nefa nety ty sady da tena nety soa
//le probleme saisie non fluide  mbola tsy reglé
//gn relation backend @ nio ndre ko tadidiko sasy */