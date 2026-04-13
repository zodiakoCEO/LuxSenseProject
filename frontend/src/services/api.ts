// src/services/api.ts
import axios, { type AxiosInstance } from 'axios';
import type { DeviceReading } from '../../../backend/src/types/index';

// Ajusta esto si la forma real de UserProfile en el back es distinta
export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// Base URL del backend para las APIs REST
// En producción (Vercel) VITE_API_URL debe ser:
//   https://luxsenseproject-production.up.railway.app/api
// En desarrollo (.env local):
//   VITE_API_URL=http://localhost:5000/api
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Inyectar token JWT en cada request si existe
    this.axiosInstance.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });
  }

  // ── SENSORES ──────────────────────────────────────────────────────────────

  // Usa /sensors como prefijo (donde está registrado el router en el back)
  async getDeviceReadings(deviceId: string): Promise<DeviceReading[]> {
    try {
      const response = await this.axiosInstance.get(
        `/sensors/device/${deviceId}/readings`
      );
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching device readings:', error);
      throw error;
    }
  }

  async getDeviceStats(deviceId: string): Promise<DeviceReading[]> {
    try {
      const response = await this.axiosInstance.get(
        `/sensors/device/${deviceId}/stats`
      );
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching device stats:', error);
      throw error;
    }
  }

  async postDeviceReading(
    data: DeviceReading
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.axiosInstance.post(
        '/sensors/device/readings',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error posting device reading:', error);
      throw error;
    }
  }

  // ── AUTH ──────────────────────────────────────────────────────────────────

  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.axiosInstance.get('/auth/profile');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async register(data: { email: string; password: string; nombre: string }) {
    const response = await this.axiosInstance.post('/auth/register', data);
    return response.data;
  }

  async login(data: { email: string; password: string }) {
    const response = await this.axiosInstance.post('/auth/login', data);
    return response.data;
  }

  async updateProfile(data: {
    nombre?: string;
    email?: string;
    avatar_url?: string;
  }) {
    const response = await this.axiosInstance.put('/auth/profile', data);
    return response.data;
  }

  // ── IA — ENERGÍA ──────────────────────────

  async getEnergyForecast() {
    const response = await this.axiosInstance.get('/ai/energy/forecast');
    return response.data;
  }

  // ── IA — ANOMALÍAS ─────────────────────────

  async getAnomalySummary() {
    const response = await this.axiosInstance.get('/ai/anomalies/summary');
    return response.data;
  }

  // ── IA — ILUMINACIÓN ───────────────────────

  async getLightingSchedule() {
    const response = await this.axiosInstance.get('/ai/lighting/schedule');
    return response.data;
  }

  // ── IA — AMBIENTES (mock) ──────────────────

  async getAmbientes() {
    const response = await this.axiosInstance.get('/ai/ambientes');
    return response.data;
  }

  async getAmbienteDetail(id: string) {
    const response = await this.axiosInstance.get(`/ai/ambientes/${id}`);
    return response.data;
  }

  // ── AMBIENTES (MongoDB reales) ─────────────

  async crearAmbiente(data: { nombre: string; icono: string; sensor_id?: string }) {
    const response = await this.axiosInstance.post('/ambientes', data);
    return response.data;
  }

  async getMisAmbientes() {
    const response = await this.axiosInstance.get('/ambientes');
    return response.data;
  }

  async eliminarAmbiente(id: string) {
    const response = await this.axiosInstance.delete(`/ambientes/${id}`);
    return response.data;
  }
}

export default new ApiService();