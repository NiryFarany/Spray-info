import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { getFormations, addFormation, updateFormation, deleteFormation, viewFormation } from '../services/formationService';
import Swal from 'sweetalert2';
// Importation des icônes nécessaires, y compris ArrowLeftIcon pour le retour
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon, ArrowLeftIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/solid';
//efa mety io vu io fa le champs à ecrire anontanina an'i grok miandalana eo avao, tsy maninona io 


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
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prix (Ar)</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input type="text" name="dates" value={formData.dates} onChange={handleChange}
          placeholder="ex. 2025-11-01"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
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
const [activeTab, setActiveTab] = useState(null);

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
          <p><strong>Prix :</strong> ${data.price} Ar</p>
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
    <div className="container mx-auto py-12 px-6">
      <button onClick={() => navigate("/admin")}
                                className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md">
                                {/* //⬅ Retour */}
                                 <ArrowLeftIcon className="h-5 w-5 mr-2" /> 
                              </button>
        {/* Carte Formations */}
                    {/* <div
                      onClick={() => setActiveTab("formations")}
                      className="cursor-pointer bg-white shadow-xl rounded-2xl p-6 text-center border-t-4 border-blue-600 hover:shadow-2xl transition max-w-full" // max-w-full pour prendre l'espace dans la grille
                    >
                      <BookOpenIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" /> {/* Nouvelle icône * /}
                       <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Gestion des Formations</h3> 
                      {/* <p className="text-gray-500 text-sm md:text-base">Ajouter, modifier et supprimer des formations</p> * / }
                      <p className="text-gray-500 text-sm md:text-base"></p>
                    </div>  
                    <div
                      onClick={() => setActiveTab("formations")}
                      className="cursor-pointer bg-white shadow-xl rounded-2xl p-6 border-t-4 border-blue-600 hover:shadow-2xl transition max-w-full flex items-center space-x-4"
                    >
                      <BookOpenIcon className="h-12 w-12 text-blue-600" /> {/* Icône à gauche * /}
                      <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-0">Gestion des Formations</h3>
                    </div> */}
                    <div
                      onClick={() => setActiveTab("formations")}
                      className="cursor-pointer bg-white shadow-xl rounded-2xl p-6 border-t-4 border-blue-600 hover:shadow-2xl transition max-w-full flex items-center justify-center space-x-4"
                    >
                      <BookOpenIcon className="h-12 w-12 text-blue-600" /> {/* Icône à gauche */}
                      <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-0">
                        Gestion des Formations
                      </h3>
                    </div>


                              
                    
                              <div className="flex justify-end mb-4 mt-2">
                                <button
                                  onClick={openAddForm}
                                  className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                  <PlusIcon className="h-5 w-5 mr-1" /> Ajouter une Formation
                                </button>
                              </div>
                    
                              {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
                    
                              {showAddForm && (
                                <FormationForm
                                  formData={formData}
                                  handleChange={handleChange}
                                  onSubmit={handleAddSubmit}
                                  buttonText="Ajouter"
                                  title="Ajouter une Formation"
                                  onCancel={closeForms}
                                />
                              )}
                    
                              {showUpdateForm && (
                                <FormationForm
                                  formData={formData}
                                  handleChange={handleChange}
                                  onSubmit={handleUpdateSubmit}
                                  buttonText="Mettre à jour"
                                  title="Modifier la Formation"
                                  onCancel={closeForms}
                                />
                              )}
                    
                              {/* ✅ TABLEAU DES FORMATIONS */}
                              <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                                <thead className="bg-gray-100 text-left">
                                  <tr>
                                    <th className="py-3 px-6 border">Nom</th>
                                    <th className="py-3 px-6 border">Prix (Ar)</th>
                                    <th className="py-3 px-6 border">Lieu</th>
                                    <th className="py-3 px-6 border">Date</th>
                                    <th className="py-3 px-6 border text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formations.map((formation) => (
                                    <tr key={formation.id} className="border-b hover:bg-gray-50">
                                      <td className="py-3 px-6">{formation.name}</td>
                                      <td className="py-3 px-6">{formation.price}</td>
                                      <td className="py-3 px-6">{formation.location}</td>
                                      <td className="py-3 px-6">{formation.dates}</td>
                                      <td className="py-3 px-6 flex justify-center gap-3">
                    
                                        <EyeIcon className="h-6 w-6 cursor-pointer text-blue-600 hover:scale-110"
                                          onClick={() => handleView(formation)} />
                    
                                        <PencilIcon className="h-6 w-6 cursor-pointer text-green-600 hover:scale-110"
                                          onClick={() => handleEdit(formation)} />
                    
                                        <TrashIcon className="h-6 w-6 cursor-pointer text-red-600 hover:scale-110"
                                          onClick={() => handleDeleteClick(formation.id)} />
                    
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table> 
                              {/* <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
  <thead className="bg-blue-600 text-white text-left">
    <tr>
      <th className="py-3 px-6">Nom</th>
      <th className="py-3 px-6">Prix (Ar)</th>
      <th className="py-3 px-6">Lieu</th>
      <th className="py-3 px-6">Date</th>
      <th className="py-3 px-6 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {formations.map((formation) => (
      <tr key={formation.id} className="border-b hover:bg-gray-100 transition">
        <td className="py-3 px-6">{formation.name}</td>
        <td className="py-3 px-6 font-semibold text-blue-700">{formation.price.toLocaleString()}</td>
        <td className="py-3 px-6">{formation.location}</td>
        <td className="py-3 px-6">{formation.dates}</td>
        <td className="py-3 px-6 flex justify-center gap-3">
          ...
        </td>
      </tr>
    ))}
  </tbody>
</table>
ok @zao ihany koa
 */}
                            {/* </>
                          )}
                     */}
                    

    </div>
);


};

export default AdminFormation;
