import { useState, useEffect } from 'react';
import apiService from '../services/api';

export interface Ambiente {
  id: string;
  nombre: string;
  icono: string;
  activo: boolean;
  consumo_actual: number;
  prediccion_kwh: number;
  tendencia: 'subiendo' | 'bajando';
  estado: 'optimo' | 'moderado' | 'elevado';
  historial: { hora: string; kwh: number }[];
  eficiencia: number;
}

export interface AmbienteDetail {
  ambiente_id: string;
  historial_24h: { hora: string; kwh: number; ocupado: boolean }[];
  recomendaciones: string[];
  model_accuracy: number;
}

export const useAmbientes = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmbientes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiService.getAmbientes();
        setAmbientes(res.ambientes || []);
      } catch {
        setError('Error cargando ambientes');
      } finally {
        setLoading(false);
      }
    };
    fetchAmbientes();
  }, []);

  return { ambientes, loading, error };
};

export const useAmbienteDetail = (id: string | null) => {
  const [detail, setDetail] = useState<AmbienteDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiService.getAmbienteDetail(id)
      .then(res => setDetail(res))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { detail, loading };
};