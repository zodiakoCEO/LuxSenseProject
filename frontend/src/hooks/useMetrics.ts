// src/hooks/useMetrics.ts
import { useState, useEffect } from 'react';
import type { DeviceReading, Metric } from '../types/shared';
import ApiService from '../services/api';

interface UseMetricsReturn {
  data: Metric[] | null;
  loading: boolean;
  error: Error | null;
}

export const useMetrics = (deviceId: string): UseMetricsReturn => {
  const [data, setData] = useState<Metric[] | null>(null);
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
        // Usa la ruta: GET /device/:id_dispositivo/stats
        const response = await ApiService.getDeviceStats(deviceId);
        
        // Transforma los datos al formato de métricas
        const transformedData = transformStatsToMetrics(response);
        setData(transformedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar métricas'));
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
// Convierte DeviceReading[] al formato Metric[] que los componentes esperan
function transformStatsToMetrics(stats: DeviceReading[]): Metric[] {
  // Si stats es un array, toma el último valor (más reciente)
  const latestReading = stats[stats.length - 1];

  if (!latestReading) {
    return [];
  }

  return [
    {
      title: 'Voltaje',
      value: latestReading.voltaje,
      unit: 'V',
      percentage: calculatePercentage(latestReading.voltaje, 250), // 250V es típico como máximo
      color: '#00E5FF',
    },
    {
      title: 'Corriente',
      value: latestReading.corriente,
      unit: 'A',
      percentage: calculatePercentage(latestReading.corriente, 100), // 100A como máximo
      color: '#00FF09',
    },
    {
      title: 'Potencia activa',
      value: latestReading.potenciaActiva,
      unit: 'KW',
      percentage: calculatePercentage(latestReading.potenciaActiva, 60), // 60KW como máximo
      color: '#FF00FF',
    },
  ];
}

// Función auxiliar para calcular porcentaje (clamped entre 0-100)
function calculatePercentage(value: number, max: number): number {
  return Math.min(Math.max(Math.round((value / max) * 100), 0), 100);
}
