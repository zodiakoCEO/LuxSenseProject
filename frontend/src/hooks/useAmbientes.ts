import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';
import { socketService } from '../services/socket';
import { useAuth } from '../context/AuthContext';

// ── Tipos públicos ─────────────────────────────────────────────────────────
export interface Ambiente {
  id: string;
  nombre: string;
  icono: string;
  activo: boolean;
  sensor_id: string | null;
  ultima_actividad: string | null;
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

export interface AmbienteEvent {
  nombre: string;
  icono: string;
  activo: boolean;
}

// ── Interfaces internas para las respuestas de la API ──────────────────────
interface RealAmbiente {
  _id?: { toString(): string };
  id?: string;
  nombre: string;
  icono?: string;
  activo?: boolean;
  sensor_id?: string;
  ultima_actividad?: string;
}

interface AiAmbiente {
  nombre: string;
  consumo_actual?: number;
  prediccion_kwh?: number;
  tendencia?: 'subiendo' | 'bajando';
  estado?: 'optimo' | 'moderado' | 'elevado';
  historial?: { hora: string; kwh: number }[];
  eficiencia?: number;
}

// ── Hook principal ─────────────────────────────────────────────────────────
export const useAmbientes = () => {
  const { user } = useAuth();
  const [ambientes, setAmbientes]   = useState<Ambiente[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [lastEvent, setLastEvent]   = useState<AmbienteEvent | null>(null);

  const fetchAmbientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Ambientes reales de MongoDB
      const realRes  = await apiService.getMisAmbientes();
      const realList = (realRes.data || []) as RealAmbiente[];

      // 2. Datos IA (opcional, falla silenciosamente)
      const aiMap: Record<string, AiAmbiente> = {};
      try {
        const aiRes = await apiService.getAmbientes();
        const aiList = (aiRes.ambientes || []) as AiAmbiente[];
        aiList.forEach((a) => { aiMap[a.nombre] = a; });
      } catch { /* sin datos IA */ }

      // 3. Fusión
      const merged: Ambiente[] = realList.map((real) => {
        const ai = aiMap[real.nombre] ?? {};
        return {
          id:               real._id?.toString() ?? real.id ?? '',
          nombre:           real.nombre,
          icono:            real.icono ?? '💡',
          activo:           real.activo ?? false,
          sensor_id:        real.sensor_id ?? null,
          ultima_actividad: real.ultima_actividad ?? null,
          consumo_actual:   ai.consumo_actual  ?? 0,
          prediccion_kwh:   ai.prediccion_kwh  ?? 0,
          tendencia:        ai.tendencia       ?? 'bajando',
          estado:           ai.estado          ?? 'optimo',
          historial:        ai.historial       ?? [],
          eficiencia:       ai.eficiencia      ?? 100,
        };
      });

      setAmbientes(merged);
    } catch {
      setError('Error cargando ambientes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAmbientes(); }, [fetchAmbientes]);

  // ── WebSocket ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!user?.id_usuario) return;

    const socket = socketService.connect();
    socket.emit('subscribe:ambientes', user.id_usuario);

    const handleEstadoChanged = (data: {
      ambiente_id: string;
      nombre: string;
      icono: string;
      activo: boolean;
      ultima_actividad: string;
    }) => {
      setAmbientes(prev =>
        prev.map(amb =>
          amb.id === data.ambiente_id
            ? { ...amb, activo: data.activo, ultima_actividad: data.ultima_actividad }
            : amb
        )
      );
      setLastEvent({ nombre: data.nombre, icono: data.icono, activo: data.activo });
      setTimeout(() => setLastEvent(null), 4000);
    };

    socket.on('ambiente:estado_changed', handleEstadoChanged);
    return () => {
      socket.emit('unsubscribe:ambientes', user.id_usuario);
      socket.off('ambiente:estado_changed', handleEstadoChanged);
    };
  }, [user?.id_usuario]);

  const eliminarAmbiente = useCallback(async (id: string) => {
    await apiService.eliminarAmbiente(id);
    setAmbientes(prev => prev.filter(a => a.id !== id));
  }, []);

  return { ambientes, loading, error, lastEvent, refreshAmbientes: fetchAmbientes, eliminarAmbiente };
};

// ── Hook de detalle ────────────────────────────────────────────────────────
export const useAmbienteDetail = (id: string | null) => {
  const [detail, setDetail]   = useState<AmbienteDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiService
      .getAmbienteDetail(id)
      .then(res => setDetail(res as AmbienteDetail))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { detail, loading };
};