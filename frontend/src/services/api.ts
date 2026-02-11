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

const SENSORS_PREFIX = '/sensors';
const AUTH_PREFIX = '/auth';

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

  async getDeviceReadings(deviceId: string): Promise<DeviceReading[]> {
    try {
      const response = await this.axiosInstance.get(
        `${SENSORS_PREFIX}/device/${deviceId}/readings`
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
        `${SENSORS_PREFIX}/device/${deviceId}/stats`
      );
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching device stats:', error);
      throw error;
    }
  }

  async postDeviceReading(data: DeviceReading): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.axiosInstance.post(
        `${SENSORS_PREFIX}/device/readings`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error posting device reading:', error);
      throw error;
    }
  }

  async getUserProfile(): Promise<UserProfile> {
    try {
      const response = await this.axiosInstance.get(`${AUTH_PREFIX}/profile`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}

export default new ApiService();
