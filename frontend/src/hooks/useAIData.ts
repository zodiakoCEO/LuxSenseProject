import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useAIData = () => {
  const [energyForecast, setEnergyForecast] = useState<any[]>([]);
  const [anomalySummary, setAnomalySummary] = useState<any>(null);
  const [lightingSchedule, setLightingSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [energy, anomalies, lighting] = await Promise.all([
          apiService.getEnergyForecast(),
          apiService.getAnomalySummary(),
          apiService.getLightingSchedule(),
        ]);

        setEnergyForecast(energy.forecast || []);
        setAnomalySummary(anomalies.summary || null);
        setLightingSchedule(lighting.daily_schedule || []);
      } catch {
        setError('Error cargando datos de IA');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    energyForecast,
    anomalySummary,
    lightingSchedule,
    loading,
    error
  };
};