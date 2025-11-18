import React, { useState, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';
import { getAllUsers, deleteUser, updateUserRole } from '../services/userService';

const AdminPersonnel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      Swal.fire("Accès refusé", err.message, "error");
      navigate("/"); // Redirige si pas admin
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); */
  const fetchUsers = useCallback(async () => {
  try {
    const data = await getAllUsers();
    setUsers(data);
  } catch (err) {
    Swal.fire("Accès refusé", err.message, "error");
    navigate("/");
  } finally {
    setLoading(false);
  }
}, [navigate]);

useEffect(() => {
  fetchUsers();
}, [fetchUsers]);


  /* const handleDelete = async (userId, userName) => {
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
        await deleteUser(userId);
        Swal.fire("Supprimé !", `${userName} a été retiré.`, "success");
        fetchUsers();
      } catch {
        Swal.fire("Erreur", "Impossible de supprimer", "error");
      }
    }
  }; */

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
      await deleteUser(userId);
      Swal.fire("Supprimé !", `${userName} a été retiré.`, "success");
      fetchUsers();
    } catch (err) {
      Swal.fire("Erreur", err.message, "error");
    }
  }
};

  /* const toggleAdmin = async (userId, currentStatus, userName) => {
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
 */
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
    try {
      await updateUserRole(userId, newStatus);
      Swal.fire("Succès", `${userName} est maintenant ${role}`, "success");
      fetchUsers(); // refresh
    } catch {
      Swal.fire("Erreur", "Impossible de changer le rôle", "error");
    }
  }
};
  

  if (loading) return <div className="text-center py-20 text-xl">Chargement des utilisateurs...</div>;

  return (
    <div className="container mx-auto py-12 px-6">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 bg-gray-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-gray-700 transition"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Retour au Dashboard Admin
      </button>

      <div className="bg-white shadow-2xl rounded-2xl p-8 border-t-4 border-green-600">
        <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
          Tous les utilisateurs
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="py-4 px-6 text-left">ID Client</th>
                <th className="py-4 px-6 text-left">Nom</th>
                 <th className="py-4 px-6 text-left">Phone</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-center">Rôle</th>
                <th className="py-4 px-6 text-center">Inscrit le</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-6 font-medium">{user.id}</td>
                  <td className="py-4 px-6 font-medium">{user.name}</td>
                  <td className="py-4 px-6 font-medium">{user.phone}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${user.is_admin ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                      {/* {user.is_admin ? 'ADMINISTRATEUR' : 'UTILISATEUR'} */}
                      {user.is_admin ? 'ADMIN' : 'Utilisateur'}
                    </span>
                    <button
                                          onClick={() => toggleAdmin(user.id, user.is_admin, user.name)}
                                          className="text-purple-600 hover:scale-110"
                                          title="Changer le rôle"
                                        >
                                          <PencilIcon className="h-6 w-6" />
                                        </button>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600">{user.created_at}</td>
                  <td className="py-4 px-6 text-center">
                    {/* <button
                                          onClick={() => toggleAdmin(user.id, user.is_admin, user.name)}
                                          className="text-purple-600 hover:scale-110"
                                          title="Changer le rôle"
                                        >
                                          <PencilIcon className="h-6 w-6" />
                                        </button> */}
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="text-red-600 hover:scale-125 transition ml-4"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-7 w-7" />
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
//tokony ho afaka ny modifier sy mi ajouter user ihany angamba ny admin, de tokony hisy champs description na note special admin @ champs n'ny user eo
//ok nanmpy champs phone n'ny user nataoko teo 
// de manaraka zany tokony mi afficher info n'ny spacial user zaho @ zay izy afaky mi modifier gn info-ny, juste voir de modifier zany gn ahiny @zay