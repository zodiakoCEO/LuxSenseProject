import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

/* ── Tipos ─────────────────────────────────────────────────────── */
interface ForecastEntry { hour: number; consumption_kwh: number }
interface AnomalyEntry  { timestamp: string; sensor_value: number; hour: number }
interface ScheduleEntry {
  hour: number;
  natural_light_lux: number;
  optimal_artificial_light: number;
  occupancy: boolean;
}
interface HistorialData {
  forecast:    ForecastEntry[];
  anomalies:   AnomalyEntry[];
  schedule:    ScheduleEntry[];
  generatedAt: string;
}
interface AutoConfig {
  enabled:      boolean;
  intervalDays: number;
  lastDownload: string | null;
}

const DEFAULT_AUTO: AutoConfig = { enabled: false, intervalDays: 30, lastDownload: null };

/* ── CSV ────────────────────────────────────────────────────────── */
function buildCSV(data: HistorialData): string {
  const rows: string[] = [];
  rows.push('=== FORECAST DE ENERGÍA ===');
  rows.push('Hora,Consumo (kWh)');
  data.forecast.forEach(r => rows.push(`${r.hour}:00,${r.consumption_kwh}`));
  rows.push('');
  rows.push('=== ANOMALÍAS DETECTADAS ===');
  rows.push('Timestamp,Valor Sensor,Hora');
  data.anomalies.forEach(r => rows.push(`${r.timestamp},${r.sensor_value},${r.hour}`));
  rows.push('');
  rows.push('=== PROGRAMACIÓN DE ILUMINACIÓN ===');
  rows.push('Hora,Luz Natural (lux),Luz Artificial Óptima,Ocupación');
  data.schedule.forEach(r =>
    rows.push(`${r.hour}:00,${r.natural_light_lux},${r.optimal_artificial_light},${r.occupancy ? 'Sí' : 'No'}`)
  );
  rows.push('');
  rows.push(`Generado: ${data.generatedAt}`);
  return rows.join('\n');
}

function triggerDownload(data: HistorialData) {
  const blob = new Blob([buildCSV(data)], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `luxsense-historial-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Estilos ────────────────────────────────────────────────────── */
const card: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
};

const thStyle: React.CSSProperties = {
  padding: '8px 12px',
  textAlign: 'left',
  color: '#64748b',
  fontSize: '12px',
};

const tdStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid #1a2234',
  fontSize: '13px',
};

/* ── Componente ─────────────────────────────────────────────────── */
const HistorialPage: React.FC = () => {
  const { token } = useAuth();
  const [data,    setData]    = useState<HistorialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [saved,   setSaved]   = useState(false);
  const [auto, setAuto] = useState<AutoConfig>(() => {
    const s = localStorage.getItem('lx_auto');
    return s ? JSON.parse(s) : DEFAULT_AUTO;
  });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const h = { Authorization: `Bearer ${token}` };
      const [fRes, aRes, sRes] = await Promise.all([
        fetch(`${API_BASE_URL}/ai/energy/forecast`,   { headers: h }),
        fetch(`${API_BASE_URL}/ai/anomalies/summary`, { headers: h }),
        fetch(`${API_BASE_URL}/ai/lighting/schedule`, { headers: h }),
      ]);
      const [fJ, aJ, sJ] = await Promise.all([fRes.json(), aRes.json(), sRes.json()]);
      setData({
        forecast:    fJ.forecast                  ?? [],
        anomalies:   aJ.summary?.recent_anomalies ?? [],
        schedule:    sJ.daily_schedule            ?? [],
        generatedAt: new Date().toLocaleString('es-CO'),
      });
    } catch {
      setError('Error cargando datos. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { void fetchAll(); }, [fetchAll]);

  /* auto-descarga */
  useEffect(() => {
    if (!auto.enabled || !data) return;
    const last     = auto.lastDownload ? new Date(auto.lastDownload).getTime() : 0;
    const diffDays = (Date.now() - last) / 86_400_000;
    if (diffDays >= auto.intervalDays) {
      triggerDownload(data);
      const updated = { ...auto, lastDownload: new Date().toISOString() };
      setAuto(updated);
      localStorage.setItem('lx_auto', JSON.stringify(updated));
    }
  }, [data, auto]);

  const handleDownload = () => {
    if (!data) return;
    triggerDownload(data);
    const updated = { ...auto, lastDownload: new Date().toISOString() };
    setAuto(updated);
    localStorage.setItem('lx_auto', JSON.stringify(updated));
  };

  const saveConfig = () => {
    localStorage.setItem('lx_auto', JSON.stringify(auto));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const levelBadge = (kwh: number) => {
    const high = kwh > 130;
    const mid  = kwh > 110;
    return (
      <span style={{
        padding: '2px 8px', borderRadius: '20px', fontSize: '11px',
        background: high ? '#450a0a' : mid ? '#422006' : '#14532d',
        color:      high ? '#fca5a5' : mid ? '#fcd34d' : '#86efac',
      }}>
        {high ? 'Elevado' : mid ? 'Moderado' : 'Óptimo'}
      </span>
    );
  };

  const nextDownload = auto.lastDownload
    ? new Date(
        new Date(auto.lastDownload).getTime() + auto.intervalDays * 86_400_000
      ).toLocaleDateString('es-CO')
    : null;

  return (
    <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', color: '#f1f5f9' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0 }}>Historial de Consumo</h1>
          <p style={{ color: '#94a3b8', marginTop: '6px', fontSize: '14px' }}>
            Exporta y programa descargas automáticas de tus datos energéticos
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={fetchAll}
            style={{ padding: '10px 16px', background: '#1e293b', border: '1px solid #334155',
              borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>
            ↻ Actualizar
          </button>
          <button
            onClick={handleDownload}
            disabled={!data || loading}
            style={{ padding: '10px 20px', background: !data || loading ? '#334155' : '#7c3aed',
              border: 'none', borderRadius: '8px', color: '#fff',
              cursor: !data || loading ? 'not-allowed' : 'pointer',
              fontSize: '14px', fontWeight: 600, opacity: !data || loading ? 0.6 : 1 }}>
            ⬇ Descargar CSV
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: '#450a0a', border: '1px solid #ef4444', borderRadius: '8px',
          padding: '16px', marginBottom: '24px', color: '#fca5a5' }}>
          ⚠ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          Cargando datos...
        </div>
      )}

      {/* Contenido */}
      {!loading && data && (
        <>
          {/* Resumen */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Registros Forecast',  value: `${data.forecast.length} horas`,       color: '#7c3aed' },
              { label: 'Anomalías Recientes', value: `${data.anomalies.length} detectadas`,  color: '#ef4444' },
              { label: 'Franjas Iluminación', value: `${data.schedule.length} franjas`,      color: '#22c55e' },
            ].map(c => (
              <div key={c.label} style={{ ...card, marginBottom: 0 }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{c.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: c.color }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Forecast */}
          <div style={card}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#c4b5fd', marginTop: 0, marginBottom: '16px' }}>
              ⚡ Forecast de Energía — 24h
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <th style={thStyle}>Hora</th>
                    <th style={thStyle}>Consumo (kWh)</th>
                    <th style={thStyle}>Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {data.forecast.map(r => (
                    <tr key={r.hour}>
                      <td style={tdStyle}>{r.hour}:00</td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{r.consumption_kwh}</td>
                      <td style={tdStyle}>{levelBadge(r.consumption_kwh)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Anomalías */}
          <div style={card}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fca5a5', marginTop: 0, marginBottom: '16px' }}>
              ⚠️ Anomalías Recientes
            </h2>
            {data.anomalies.length === 0 ? (
              <p style={{ color: '#64748b', margin: 0 }}>No hay anomalías recientes.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <th style={thStyle}>Timestamp</th>
                    <th style={thStyle}>Valor Sensor</th>
                    <th style={thStyle}>Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {data.anomalies.map((r, i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, color: '#94a3b8' }}>{r.timestamp}</td>
                      <td style={{ ...tdStyle, color: '#ef4444', fontWeight: 600 }}>{r.sensor_value}</td>
                      <td style={tdStyle}>{r.hour}:00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Iluminación */}
          <div style={card}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#86efac', marginTop: 0, marginBottom: '16px' }}>
              💡 Programación de Iluminación — 24h
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155' }}>
                    <th style={thStyle}>Hora</th>
                    <th style={thStyle}>Luz Natural (lux)</th>
                    <th style={thStyle}>Luz Artificial Óptima</th>
                    <th style={thStyle}>Ocupación</th>
                  </tr>
                </thead>
                <tbody>
                  {data.schedule.map(r => (
                    <tr key={r.hour}>
                      <td style={tdStyle}>{r.hour}:00</td>
                      <td style={tdStyle}>{r.natural_light_lux}</td>
                      <td style={tdStyle}>{r.optimal_artificial_light}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '2px 8px', borderRadius: '20px', fontSize: '11px',
                          background: r.occupancy ? '#14532d' : '#1e293b',
                          color: r.occupancy ? '#86efac' : '#64748b',
                        }}>
                          {r.occupancy ? 'Ocupado' : 'Vacío'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Auto-descarga */}
      <div style={card}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginTop: 0, marginBottom: '20px' }}>
          🕐 Descarga Automática
        </h2>

        {/* Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div
            onClick={() => setAuto(p => ({ ...p, enabled: !p.enabled }))}
            style={{ width: '48px', height: '26px', borderRadius: '26px', cursor: 'pointer',
              background: auto.enabled ? '#7c3aed' : '#334155', position: 'relative', transition: '0.3s' }}>
            <div style={{
              position: 'absolute', top: '3px',
              left: auto.enabled ? '25px' : '3px',
              width: '20px', height: '20px', borderRadius: '50%',
              background: '#fff', transition: '0.3s',
            }} />
          </div>
          <span style={{ fontSize: '14px', color: auto.enabled ? '#c4b5fd' : '#64748b' }}>
            {auto.enabled ? 'Activada' : 'Desactivada'}
          </span>
        </div>

        {auto.enabled && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                Frecuencia de descarga
              </label>
              <select
                value={auto.intervalDays}
                onChange={e => setAuto(p => ({ ...p, intervalDays: Number(e.target.value) }))}
                style={{ width: '100%', padding: '10px', background: '#0f172a',
                  border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', fontSize: '14px' }}>
                {[7, 14, 30, 60, 90].map(d => (
                  <option key={d} value={d}>Cada {d} días</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                Última descarga automática
              </label>
              <div style={{ padding: '10px', background: '#0f172a', border: '1px solid #334155',
                borderRadius: '8px', fontSize: '14px', color: '#94a3b8' }}>
                {auto.lastDownload
                  ? new Date(auto.lastDownload).toLocaleDateString('es-CO')
                  : 'Nunca'}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={saveConfig}
            style={{ padding: '10px 20px', background: '#7c3aed', border: 'none',
              borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
            Guardar configuración
          </button>
          {saved && <span style={{ color: '#22c55e', fontSize: '13px' }}>✓ Guardado</span>}
        </div>

        {auto.enabled && nextDownload && (
          <p style={{ marginTop: '16px', fontSize: '12px', color: '#475569' }}>
            Próxima descarga automática:{' '}
            <strong style={{ color: '#94a3b8' }}>{nextDownload}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default HistorialPage;