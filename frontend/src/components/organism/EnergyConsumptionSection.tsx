import React from 'react';
import { styled } from '@linaria/react';
import EnergyLineChart from '../molecules/EnergyLineChart';
import ProgressBar from '../molecules/Progressbar';

interface ForecastPoint {
  hour: number;
  consumption_kwh: number;
}

interface EnergyConsumptionSectionProps {
  forecast: ForecastPoint[];
  loading: boolean;
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ProgressBarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #FFFFFF;
  margin: 0 0 1rem 0;
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #9ca3af;
  font-size: 0.9rem;
  margin: 0;
`;

const EnergyConsumptionSection: React.FC<EnergyConsumptionSectionProps> = ({ forecast, loading }) => {
  const maxConsumption = forecast.length > 0
    ? Math.max(...forecast.map(f => f.consumption_kwh))
    : 150;

  const currentHour = new Date().getHours();
  const currentConsumption = forecast.find(f => f.hour === currentHour)?.consumption_kwh || 0;
  const prevHourConsumption = forecast.find(f => f.hour === (currentHour - 1 + 24) % 24)?.consumption_kwh || 0;

  const currentPct = Math.round((currentConsumption / maxConsumption) * 100);
  const prevPct = Math.round((prevHourConsumption / maxConsumption) * 100);

  return (
    <SectionContainer>
      <EnergyLineChart forecast={forecast} loading={loading} />
      <ProgressBarsContainer>
        <SectionTitle>Consumo energético — IA</SectionTitle>
        {loading ? (
          <LoadingText>Cargando predicciones...</LoadingText>
        ) : (
          <>
            <ProgressBar
              label={`Hora actual (${currentHour}:00) — ${currentConsumption.toFixed(1)} kWh`}
              percentage={currentPct}
              color="#00FF09"
            />
            <ProgressBar
              label={`Hora anterior (${(currentHour - 1 + 24) % 24}:00) — ${prevHourConsumption.toFixed(1)} kWh`}
              percentage={prevPct}
              color="#AE00A2"
            />
          </>
        )}
      </ProgressBarsContainer>
    </SectionContainer>
  );
};

export default EnergyConsumptionSection;