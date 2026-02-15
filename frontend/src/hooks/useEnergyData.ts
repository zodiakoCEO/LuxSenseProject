// src/hooks/useEnergyData.ts
import { useState, useEffect } from 'react';
import type { DeviceReading, EnergyData } from '../types/shared';
import ApiService from '../services/api';

interface UseEnergyDataReturn {
  data: EnergyData[] | null;
  loading: boolean;
  error: Error | null;
}

export const useEnergyData = (deviceId: string): UseEnergyDataReturn => {
  const [data, setData] = useState<EnergyData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!deviceId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // ApiService.getDeviceReadings devuelve DeviceReading[]
        const response = await ApiService.getDeviceReadings(deviceId);
        
        // Transforma al formato que Recharts espera
        const transformedData = transformReadingsToChartData(response);
        setData(transformedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar lecturas'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  return { data, loading, error };
};

// ✅ Función auxiliar tipada correctamente
function transformReadingsToChartData(readings: DeviceReading[]): EnergyData[] {
  return readings.map((reading) => ({
    day: reading.timestamp 
      ? new Date(reading.timestamp).getDate().toString() 
      : '',
    currentMonth: reading.consumoMesActual ?? 0,
    lastMonth: reading.consumoMesPasado ?? reading.lastMonthValue ?? 0,
  }));
}
