import React from 'react';
import { styled } from '@linaria/react';
import CircularMetric from '../molecules/CircularMetric';

interface LightingPoint {
  hour: number;
  natural_light_lux: number;
  optimal_artificial_light: number;
  occupancy: boolean;
}

interface MetricsSectionProps {
  lightingSchedule: LightingPoint[];
  loading: boolean;
}

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
  margin: 2rem 0;
`;

const MetricsSection: React.FC<MetricsSectionProps> = ({ lightingSchedule, loading }) => {
  const currentHour = new Date().getHours();
  const current = lightingSchedule.find(l => l.hour === currentHour);
  const maxArtificial = 300;

  const artificialPct = current
    ? Math.round((current.optimal_artificial_light / maxArtificial) * 100)
    : 0;

  const naturalPct = current
    ? Math.round((current.natural_light_lux / 100) * 100)
    : 0;

  const savingPct = current
    ? Math.round(((maxArtificial - current.optimal_artificial_light) / maxArtificial) * 100)
    : 0;

  return (
    <MetricsContainer>
      {loading ? (
        <LoadingText>Cargando optimización de IA...</LoadingText>
      ) : (
        <>
          <CircularMetric
            title="Luz artificial óptima"
            value={current ? Math.round(current.optimal_artificial_light) : 0}
            unit="lux"
            color="#00E5FF"
            percentage={artificialPct}
          />
          <CircularMetric
            title="Luz natural actual"
            value={current ? Math.round(current.natural_light_lux) : 0}
            unit="lux"
            color="#00FF09"
            percentage={naturalPct}
          />
          <CircularMetric
            title="Ahorro energético IA"
            value={savingPct}
            unit="%"
            color="#AE00A2"
            percentage={savingPct}
          />
        </>
      )}
    </MetricsContainer>
  );
};

export default MetricsSection;