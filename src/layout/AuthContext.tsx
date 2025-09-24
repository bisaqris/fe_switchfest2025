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

  const fetchAndSetUser = async (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const response = await apiClient.get(`/users/${decoded.userId}`);
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Token tidak valid, menghapus token.", error);
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
    }
  };


  useEffect(() => {
    console.log("AuthContext: useEffect dimulai.");

    const initializeAuth = async () => {
      console.log("AuthContext: initializeAuth dijalankan.");
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.log("AuthContext: Tidak ada token, loading selesai.");
          setLoading(false);
          return;
        }

        console.log("AuthContext: Token ditemukan, mencoba fetch user...");
        const decoded = jwtDecode<JwtPayload>(token);
        const response = await apiClient.get(`/users/${decoded.userId}`);

        setUser(response.data.data);
        setIsAuthenticated(true);
        console.log("AuthContext: Fetch user berhasil.");

      } catch (error) {
        console.error("AuthContext: Terjadi error:", error);
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        console.log("AuthContext: Blok finally, loading selesai.");
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (token: string) => {
    setLoading(true);
    localStorage.setItem('authToken', token);
    await fetchAndSetUser(token);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/auth/signin';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};