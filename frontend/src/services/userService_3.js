// src/services/userService.js
const USER_API = 'http://localhost:5001';

export const register = async (data) => {
  const response = await fetch(`${USER_API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Erreur lors de l’inscription');
  return result;
};

export const login = async (email, password) => {
  const response = await fetch(`${USER_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Échec de connexion');

  localStorage.setItem('token', result.token);
  localStorage.setItem('user', JSON.stringify(result.user));
  return result;
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${USER_API}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Non authentifié');
  return result;
};
//non tsy solution ny ty