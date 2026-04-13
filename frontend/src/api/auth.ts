// src/api/auth.ts
import { API_BASE_URL } from './client';

export interface LoginResponse {
  token: string;
  user: {
    id_usuario: number;
    email: string;
    nombre: string;
    id_rol: number;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Error al iniciar sesión');
  }

  return res.json();
}

export async function register(email: string, password: string, nombre: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, nombre }),
  });

  if (!res.ok) {
    throw new Error('Error al registrar usuario');
  }

  return res.json();
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('No se pudo obtener el perfil');
  }

  return res.json();
}