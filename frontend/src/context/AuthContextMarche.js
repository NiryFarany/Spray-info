// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';
//import { getProfile, getCurrentUser, logout } from '../services/userService'; // NAMED IMPORTS
// src/context/AuthContext.js

import { getProfile, getCurrentUser, logout } from '../services/userService';
const USER_API = 'http://localhost:5001';



export const AuthContext = createContext();

/* export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getProfile()
        .then((profile) => {
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        });
    }
  }, []); */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      getProfile()
        .then((profile) => {
          setUser(profile);
          localStorage.setItem('user', JSON.stringify(profile));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        });
    }
  }, [user]); // Ajouté user

  const login = async (email, password) => {
    const data = await fetch(`${USER_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!data.ok) throw new Error((await data.json()).error);
    const result = await data.json();
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    setUser(result.user);
    return result;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };
  
  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    setUser(data.user);
    return data;
  };

  
  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);