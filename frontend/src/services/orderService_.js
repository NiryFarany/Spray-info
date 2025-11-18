// src/services/userService.js
//a faire
const mockUsers = { 'test@example.com': { id: 1, role: 'user' } };

export const login = async (credentials) => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simuler un délai
  if (mockUsers[credentials.email] && credentials.password === 'password') {
    return { token: 'mock-token', user: mockUsers[credentials.email] };
  }
  throw new Error('Invalid credentials');
};

export const register = async (userData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  mockUsers[userData.email] = { id: Date.now(), role: 'user' };
  return { message: 'User registered' };
};