import React, { useState } from 'react';
import { styled } from '@linaria/react';
import DashboardLayout from '../templates/DashboardLayout';
import { useAmbientes, useAmbienteDetail } from '../../hooks/useAmbientes';
import type { Ambiente } from '../../hooks/useAmbientes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiService from '../../services/api';

// ==================== ESTILOS ====================

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
`;

const PageSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px)  { grid-template-columns: 1fr; }
`;

const Card = styled.div<{ estado?: string; activo?: boolean }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ estado, activo }) =>
    !activo ? 'rgba(255,255,255,0.06)' :
    estado === 'elevado' ? 'rgba(255,59,59,0.3)' :
    estado === 'moderado' ? 'rgba(255,190,0,0.3)' :
    'rgba(0,255,9,0.2)'};
  border-radius: 20px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${({ estado, activo }) =>
      !activo ? 'transparent' :
      estado === 'elevado' ? 'linear-gradient(90deg, #ff3b3b, transparent)' :
      estado === 'moderado' ? 'linear-gradient(90deg, #ffbe00, transparent)' :
      'linear-gradient(90deg, #00ff09, transparent)'};
  }

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.div<{ activo?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ activo }) => activo
    ? 'linear-gradient(135deg, #00ff09, #00e5ff)'
    : 'rgba(255,255,255,0.06)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const StatusBadge = styled.span<{ activo?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: ${({ activo }) => activo ? 'rgba(0,255,9,0.1)' : 'rgba(255,255,255,0.06)'};
  color: ${({ activo }) => activo ? '#00ff09' : '#475569'};
  border: 1px solid ${({ activo }) => activo ? 'rgba(0,255,9,0.2)' : 'rgba(255,255,255,0.08)'};
`;

const ConsumoRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ConsumoValue = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

const ConsumoUnit = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #64748b;
`;

const TendenciaRow = styled.div<{ tendencia?: string }>`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: ${({ tendencia }) => tendencia === 'subiendo' ? '#ff6b6b' : '#00ff09'};
  margin-bottom: 1rem;
`;

const EficienciaBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  margin-bottom: 0.4rem;
  overflow: hidden;
`;

const EficienciaFill = styled.div<{ pct: number; estado?: string }>`
  height: 100%;
  width: ${({ pct }) => Math.max(0, Math.min(100, pct))}%;
  border-radius: 999px;
  background: ${({ estado }) =>
    estado === 'elevado' ? '#ff3b3b' :
    estado === 'moderado' ? '#ffbe00' :
    '#00ff09'};
  transition: width 0.5s ease;
`;

const EficienciaLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #475569;
`;

const MiniChart = styled.div`
  margin-top: 1rem;
  height: 60px;
`;

const PrediccionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const PrediccionLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #475569;
`;

const PrediccionValue = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #00e5ff;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Modal = styled.div`
  background: #0f172a;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 2rem;
  width: 100%;
  max-width: 720px;
  max-height: 85vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
`;

const CloseBtn = styled.button`
  background: rgba(255,255,255,0.06);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover { background: rgba(255,255,255,0.12); }
`;

const SectionLabel = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 1.5rem 0 1rem 0;
`;

const RecomendacionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(0,255,9,0.04);
  border: 1px solid rgba(0,255,9,0.1);
  border-radius: 10px;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #94a3b8;
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #64748b;
  text-align: center;
  padding: 4rem 0;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  border: none;
  color: #000;
  font-size: 1.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(0,255,9,0.4);
  transition: all 0.25s ease;
  z-index: 50;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(0,255,9,0.6);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const FormLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #94a3b8;
`;

const FormInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgba(0,255,9,0.4);
  }
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
`;

const IconOption = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => selected ? 'rgba(0,255,9,0.15)' : 'rgba(255,255,255,0.04)'};
  border: 1px solid ${({ selected }) => selected ? 'rgba(0,255,9,0.4)' : 'rgba(255,255,255,0.08)'};
  border-radius: 10px;
  padding: 0.6rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(0,255,9,0.1);
    border-color: rgba(0,255,9,0.3);
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  border: none;
  border-radius: 12px;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.25s;

  &:hover {
    box-shadow: 0 0 25px rgba(0,255,9,0.4);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// ==================== CARD ====================

const AmbienteCard: React.FC<{ ambiente: Ambiente; onClick: () => void }> = ({ ambiente, onClick }) => (
  <Card estado={ambiente.estado} activo={ambiente.activo} onClick={onClick}>
    <CardHeader>
      <CardLeft>
        <IconWrapper activo={ambiente.activo}>{ambiente.icono}</IconWrapper>
        <CardTitle>{ambiente.nombre}</CardTitle>
      </CardLeft>
      <StatusBadge activo={ambiente.activo}>
        {ambiente.activo ? '● Activo' : '○ Inactivo'}
      </StatusBadge>
    </CardHeader>

    <ConsumoRow>
      <ConsumoValue>{ambiente.consumo_actual.toFixed(1)}</ConsumoValue>
      <ConsumoUnit>kWh actuales</ConsumoUnit>
    </ConsumoRow>

    <TendenciaRow tendencia={ambiente.tendencia}>
      {ambiente.tendencia === 'subiendo' ? '↑' : '↓'}
      Consumo {ambiente.tendencia}
    </TendenciaRow>

    <EficienciaBar>
      <EficienciaFill pct={Math.max(0, ambiente.eficiencia)} estado={ambiente.estado} />
    </EficienciaBar>
    <EficienciaLabel>
      <span>Eficiencia</span>
      <span>{Math.max(0, Number(ambiente.eficiencia.toFixed(1)))}%</span>
    </EficienciaLabel>

    <MiniChart>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={ambiente.historial}>
          <Line
            type="monotone"
            dataKey="kwh"
            stroke={ambiente.estado === 'elevado' ? '#ff3b3b' : ambiente.estado === 'moderado' ? '#ffbe00' : '#00ff09'}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </MiniChart>

    <PrediccionRow>
      <PrediccionLabel>Predicción IA próxima hora</PrediccionLabel>
      <PrediccionValue>{ambiente.prediccion_kwh} kWh</PrediccionValue>
    </PrediccionRow>
  </Card>
);

// ==================== MODAL DETALLE ====================

const AmbienteDetailModal: React.FC<{ ambiente: Ambiente; onClose: () => void }> = ({ ambiente, onClose }) => {
  const { detail, loading } = useAmbienteDetail(ambiente.id);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{ambiente.icono} {ambiente.nombre}</ModalTitle>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </ModalHeader>

        {loading ? <LoadingText>Cargando detalle...</LoadingText> : (
          <>
            <SectionLabel>Consumo últimas 24 horas</SectionLabel>
            <div style={{ height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detail?.historial_24h || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="hora" tick={{ fill: '#475569', fontSize: 11 }} interval={3} />
                  <YAxis tick={{ fill: '#475569', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(v: unknown) => [`${v} kWh`, 'Consumo']}
                  />
                  <Line type="monotone" dataKey="kwh" stroke="#00ff09" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <SectionLabel>Recomendaciones IA</SectionLabel>
            {detail?.recomendaciones.map((rec, i) => (
              <RecomendacionItem key={i}>
                <span>💡</span>
                {rec}
              </RecomendacionItem>
            ))}

            <SectionLabel>Precisión del modelo</SectionLabel>
            <RecomendacionItem>
              <span>🎯</span>
              Modelo entrenado con precisión del {detail?.model_accuracy}%
            </RecomendacionItem>
          </>
        )}
      </Modal>
    </Overlay>
  );
};

// ==================== PÁGINA PRINCIPAL ====================

const ICONOS = ['💡', '🛏️', '🍳', '🛋️', '🚿', '💼', '🚗', '🏠', '📺', '🖥️', '🎮', '🌿'];

const AmbientesPage: React.FC = () => {
  const { ambientes, loading, error } = useAmbientes();
  const [selectedAmbiente, setSelectedAmbiente] = useState<Ambiente | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [icono, setIcono] = useState('💡');
  const [sensorId, setSensorId] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleCrear = async () => {
    if (!nombre.trim()) return;
    setSaving(true);
    try {
      await apiService.crearAmbiente({ nombre, icono, sensor_id: sensorId || undefined });
      setSuccessMsg(`✅ Ambiente "${nombre}" creado correctamente`);
      setShowAddModal(false);
      setNombre('');
      setIcono('💡');
      setSensorId('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch {
      // error silencioso
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader>
        <PageTitle>Ambientes</PageTitle>
        <PageSubtitle>Monitoreo energético por espacio — datos en tiempo real con IA</PageSubtitle>
      </PageHeader>

      {successMsg && (
        <div style={{
          background: 'rgba(0,255,9,0.1)',
          border: '1px solid rgba(0,255,9,0.3)',
          borderRadius: '10px',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          color: '#00ff09',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem'
        }}>
          {successMsg}
        </div>
      )}

      {loading && <LoadingText>Cargando ambientes...</LoadingText>}
      {error && <LoadingText>{error}</LoadingText>}

      {!loading && !error && (
        <Grid>
          {ambientes.map(amb => (
            <AmbienteCard
              key={amb.id}
              ambiente={amb}
              onClick={() => setSelectedAmbiente(amb)}
            />
          ))}
        </Grid>
      )}

      {/* Botón flotante + */}
      <AddButton onClick={() => setShowAddModal(true)}>+</AddButton>

      {/* Modal agregar ambiente */}
      {showAddModal && (
        <Overlay onClick={() => setShowAddModal(false)}>
          <Modal onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>➕ Agregar Ambiente</ModalTitle>
              <CloseBtn onClick={() => setShowAddModal(false)}>✕</CloseBtn>
            </ModalHeader>

            <FormGroup>
              <FormLabel>Nombre del ambiente *</FormLabel>
              <FormInput
                placeholder="Ej: Sótano, Terraza, Oficina..."
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Ícono</FormLabel>
              <IconGrid>
                {ICONOS.map(ic => (
                  <IconOption
                    key={ic}
                    selected={icono === ic}
                    onClick={() => setIcono(ic)}
                  >
                    {ic}
                  </IconOption>
                ))}
              </IconGrid>
            </FormGroup>

            <FormGroup>
              <FormLabel>ID del sensor (opcional)</FormLabel>
              <FormInput
                placeholder="Ej: amb_001, sensor-esp32-01..."
                value={sensorId}
                onChange={e => setSensorId(e.target.value)}
              />
            </FormGroup>

            <SaveButton onClick={handleCrear} disabled={saving || !nombre.trim()}>
              {saving ? 'Guardando...' : `Crear ambiente ${icono}`}
            </SaveButton>
          </Modal>
        </Overlay>
      )}

      {selectedAmbiente && (
        <AmbienteDetailModal
          ambiente={selectedAmbiente}
          onClose={() => setSelectedAmbiente(null)}
        />
      )}
    </DashboardLayout>
  );
};

export default AmbientesPage;