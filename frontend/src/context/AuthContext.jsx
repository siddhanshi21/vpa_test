import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshUser(); }, []);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    localStorage.setItem('vpw_token', data.token);
    setUser(data.user);
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('vpw_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('vpw_token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>;
}
