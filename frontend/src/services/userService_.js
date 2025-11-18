// src/services/userService.js

export const getProfile = async () => {
  const response = await fetch('/api/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du profil');
  }
  return await response.json();
};

export const login = async (credentials) => {
  const response = await fetch('/api/login', { // Remplacez '/api/login' par votre endpoint de connexion
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la connexion');
  }
  return await response.json();
};

export const logout = () => {
  localStorage.removeItem('token');
};

const userService = {
  getProfile,
  login,
  logout,
};

export default userService;