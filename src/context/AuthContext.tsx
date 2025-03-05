// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (credentials: { name: string; email: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verify auth by making a simple authenticated request
        await api.getBreeds();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { name: string; email: string }) => {
    try {
      const success = await api.login(credentials);
      if (!success) throw new Error('Login failed');
      setIsLoggedIn(true);
      navigate('/search');
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);