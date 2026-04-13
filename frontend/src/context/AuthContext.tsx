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

// Vite expone las variables que empiezan por VITE_* en import.meta.env.[web:16]
const API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:5000';

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
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // Si el token es inválido/expirado, limpiamos sesión
        logout();
        return;
      }

      const json = await res.json();
      // Ajusta según el shape exacto de tu backend:
      // { success: true, data: { ...usuario } }
      const profile: AuthUser = json.data || json.user;

      setUser(profile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(profile));
      }
    } catch (error) {
      // En caso de error de red, no rompemos la app; solo no actualizamos.
      console.error('Error al refrescar perfil:', error);
    }
  };

  // Al montar el contexto, si hay token pero no user, intentamos recuperar el perfil
  useEffect(() => {
    if (token && !user) {
      void refreshProfile();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        saveSession,
        logout,
        isAuthenticated,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};