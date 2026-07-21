import axios from 'axios';

const AUTH_BASE_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/products', '/auth')
  : 'http://localhost:5001/api/auth';

/**
 * Register a new user
 * @param {Object} data - { name, email, password }
 */
export const registerUser = async (data) => {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, data);
  return response.data;
};

/**
 * Login an existing user
 * @param {Object} data - { email, password }
 */
export const loginUser = async (data) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, data);
  return response.data;
};

/**
 * Get current logged-in user profile (requires token)
 * @param {string} token - Bearer JWT token
 */
export const getMe = async (token) => {
  const response = await axios.get(`${AUTH_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
