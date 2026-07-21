import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { registerUser, loginUser, getMe } from '../api/auth';

const AuthContext = createContext(null);

const TOKEN_KEY = 'shoppu_token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // On mount: verify stored token and load user
  useEffect(() => {
    const verifyToken = async () => {
      const stored = localStorage.getItem(TOKEN_KEY);
      if (!stored) {
        setLoading(false);
        return;
      }
      try {
        const data = await getMe(stored);
        setUser(data.user);
        setToken(stored);
      } catch {
        // Token invalid or expired — clear it
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const data = await loginUser({ email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const data = await registerUser({ name, email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
