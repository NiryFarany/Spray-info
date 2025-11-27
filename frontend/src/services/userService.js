// src/services/userService.js
//const USER_API = 'http://localhost:5001';//miala le localhost pour docker
const USER_API = 'http://user-service:5000';
// src/services/userService.js

export const register = async (data) => {
  const response = await fetch(`${USER_API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error((await response.json()).error);
  return response.json();
};

/* export const login = async (email, password) => {
  const response = await fetch(`${USER_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error((await response.json()).error);
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
};
 */
// src/services/userService.js → MODIFIE UNIQUEMENT CETTE FONCTION

export const login = async (email, password) => {
  const response = await fetch(`${USER_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Email ou mot de passe incorrect');
  }

  const data = await response.json();

  // SAUVEGARDE DANS LOCALSTORAGE
  localStorage.setItem('token', data.token);
  
  // ON GARDE UNE VERSION PROPRE DE L'USER (pas tout le payload)
  const cleanUser = {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    phone: data.user.phone || '',
    is_admin: data.user.is_admin || false
  };

  localStorage.setItem('user', JSON.stringify(cleanUser));

  // ON RETOURNE L'USER PROPRE → AuthContext va l'utiliser
  return cleanUser;
};
//
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Non authentifié');
  return response.json();
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};


//////////fonction user 
// === FONCTIONS ADMIN (NOUVELLES) ===
export const getAllUsers = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Accès refusé ou erreur serveur");
  }
  return response.json();
};
/* export const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/admin/user/${userId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error("Impossible de supprimer l'utilisateur");
  }
  return response.json();
}; */
//pour plus de clarté de Message
export const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/admin/user/${userId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Impossible de supprimer l'utilisateur");
  }

  return response.json();
};

// Bonus futur : update rôle
export const updateUserRole = async (userId, isAdmin) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/admin/user/${userId}/role`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ is_admin: isAdmin })
  });
  
  if (!response.ok) throw new Error("Impossible de modifier le rôle");
  return response.json();
};

//user voir et modifier
// === MODIFIER SON PROFIL ===
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${USER_API}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData) // { name: "Nouveau Nom", phone: "0341234567" }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Impossible de mettre à jour le profil");
  }

  const result = await response.json();

  // MET À JOUR LE LOCALSTORAGE POUR QUE TOUT SOIT SYNCHRO
  localStorage.setItem('user', JSON.stringify(result.user));

  return result; // contient { message, user }
};
//changer mot de passe
export const changePassword = async (passwords) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/change-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(passwords)
  });

  if (!response.ok) throw new Error("Échec du changement de mot de passe");
  return response.json();
};