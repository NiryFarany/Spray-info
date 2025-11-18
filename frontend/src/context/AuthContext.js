// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, getCurrentUser } from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  /* const loginUser = async (email, password) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }; */
  // src/context/AuthContext.js → MODIFIE UNIQUEMENT LA FONCTION loginUser

const loginUser = async (email, password) => {
  try {
    const loggedInUser = await login(email, password); // ← maintenant retourne cleanUser
    setUser(loggedInUser); // ← MIS À JOUR IMMÉDIATE DU STATE
    return loggedInUser;
  } catch (error) {
    throw error; // pour que Login.js puisse catch
  }
};

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};