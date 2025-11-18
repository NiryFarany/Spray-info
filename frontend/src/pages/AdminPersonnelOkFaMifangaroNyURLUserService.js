import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';

const AdminPersonnel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Accès refusé ou erreur serveur");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      Swal.fire("Erreur", err.message || "Impossible de charger les utilisateurs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, userName) => {
    const result = await Swal.fire({
      title: "Supprimer cet utilisateur ?",
      text: `${userName} sera supprimé définitivement`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#d33"
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5001/admin/user/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          Swal.fire("Supprimé !", `${userName} a été supprimé.`, "success");
          fetchUsers();
        }
      } catch {
        Swal.fire("Erreur", "Impossible de supprimer", "error");
      }
    }
  };

  const toggleAdmin = async (userId, currentStatus, userName) => {
    const newStatus = !currentStatus;
    const role = newStatus ? "administrateur" : "utilisateur";

    const result = await Swal.fire({
      title: `Rendre ${userName} ${role} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non"
    });

    if (result.isConfirmed) {
      // À implémenter plus tard si tu veux
      Swal.fire("Fonctionnalité future", "Bientôt disponible !", "info");
    }
  };

  if (loading) return <div className="text-center py-10">Chargement des utilisateurs...</div>;

  return (
    <div className="container mx-auto py-12 px-6">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-gray-700 transition"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Retour au Dashboard Admin
      </button>

      <div className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-600">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Gestion du Personnel & Utilisateurs
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="py-3 px-6 text-left">Nom</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Rôle</th>
                <th className="py-3 px-6 text-center">Inscrit le</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${user.is_admin ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>
                      {user.is_admin ? 'ADMIN' : 'Utilisateur'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">{user.created_at}</td>
                  <td className="py-4 px-6 text-center space-x-3">
                    <button
                      onClick={() => toggleAdmin(user.id, user.is_admin, user.name)}
                      className="text-purple-600 hover:scale-110"
                      title="Changer le rôle"
                    >
                      <PencilIcon className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="text-red-600 hover:scale-110"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPersonnel;