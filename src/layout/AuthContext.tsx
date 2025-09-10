"use client";

import apiClient from '@/lib/apiClient';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = { id: string; name: string; email: string; role: string; };
type JwtPayload = { userId: string; };

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const loadUserFromToken = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const userId = decoded.userId;

          const response = await apiClient.get(`/users/${userId}`);

          setUser(response.data.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token tidak valid atau gagal fetch user", error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    window.location.href = '/auth/signin';
  };
  // -------------------------

  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};