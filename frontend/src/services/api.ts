// src/services/api.ts
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { DeviceReading } from '../../../backend/src/types/sensor';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // ✅ Usa /sensors como prefijo (donde está registrado el router)
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

  // ✅ Usa /sensors como prefijo
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

  // ✅ Usa /sensors como prefijo
  async postDeviceReading(data: DeviceReading): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.axiosInstance.post('/sensors/device/readings', data);
      return response.data;
    } catch (error) {
      console.error('Error posting device reading:', error);
      throw error;
    }
  }

  // ✅ Usa /auth como prefijo (donde está registrado)
  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.axiosInstance.get('/auth/profile');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}

export default new ApiService();
