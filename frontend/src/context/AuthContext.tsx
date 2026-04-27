// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';

interface AuthUser {
  id_usuario: number;
  email: string;
  nombre: string;
  id_rol: number;
  avatar_url?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  saveSession: (user: AuthUser, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) as AuthUser : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  });

  const isAuthenticated = !!token;

  const saveSession = (userData: AuthUser, jwt: string) => {
    setUser(userData);
    setToken(jwt);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) { logout(); return; }
      const json = await res.json();
      const profile: AuthUser = json.data || json.user;
      setUser(profile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(profile));
      }
    } catch (error) {
      console.error('Error al refrescar perfil:', error);
    }
  };

  useEffect(() => {
    if (token && !user) void refreshProfile();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ user, token, saveSession, logout, isAuthenticated, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};