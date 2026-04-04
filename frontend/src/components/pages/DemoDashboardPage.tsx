// src/components/pages/DemoDashboardPage.tsx
import React from 'react';
import { styled } from '@linaria/react';
import DashboardLayout from '../templates/DashboardLayout';
import InfoCardsGrid from '../organism/InfoCardsGrid';
import EnergyConsumptionSection from '../organism/EnergyConsumptionSection';
import MetricsSection from '../organism/MetricsSection';

const DemoBanner = styled.div`
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #e5e7eb;

  span {
    color: #22c55e;
    font-weight: 600;
  }
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DemoDashboardPage: React.FC = () => {
  const loading = false;

  // === Mock para InfoCardsGrid (AnomalySummary) ===
  const anomalySummary = {
    total_readings: 12450,
    anomalies_detected: 32,
    anomaly_rate: 2.6, // se mostrará como "2.6% de tasa"
    recent_anomalies: [
      { id: 1, area: 'Oficinas', message: 'Pico de consumo inusual' },
      { id: 2, area: 'Bodega 2', message: 'Luz encendida fuera de horario' },
    ],
  };

  // === Mock para EnergyConsumptionSection (ForecastPoint[]) ===
  // Horas clave del día con consumo simulado (kWh)
  const energyForecast = [
    { hour: 8, consumption_kwh: 90 },
    { hour: 10, consumption_kwh: 120 },
    { hour: 12, consumption_kwh: 140 },
    { hour: 14, consumption_kwh: 135 },
    { hour: 16, consumption_kwh: 110 },
    { hour: 18, consumption_kwh: 95 },
    { hour: 20, consumption_kwh: 80 },
  ];

  // === Mock para MetricsSection (LightingPoint[]) ===
  const currentHour = new Date().getHours();

  const lightingSchedule = [
    {
      hour: currentHour,
      natural_light_lux: 65,          // luz natural actual
      optimal_artificial_light: 180,  // lo que LuxSense recomienda
      occupancy: true,
    },
    {
      hour: (currentHour - 1 + 24) % 24,
      natural_light_lux: 40,
      optimal_artificial_light: 220,
      occupancy: true,
    },
    {
      hour: (currentHour + 1) % 24,
      natural_light_lux: 80,
      optimal_artificial_light: 150,
      occupancy: false,
    },
  ];

  return (
    <DashboardLayout>
      <DemoBanner>
        <span>Demo:</span> estás viendo datos simulados de ejemplo. No es
        necesario iniciar sesión y no se guardará ninguna acción.
      </DemoBanner>

      {/* Anomalías / info cards */}
      <InfoCardsGrid anomalySummary={anomalySummary} loading={loading} />

      <DashboardContent>
        <LeftColumn>
          <EnergyConsumptionSection
            forecast={energyForecast}
            loading={loading}
          />
        </LeftColumn>

        <RightColumn>
          <MetricsSection
            lightingSchedule={lightingSchedule}
            loading={loading}
          />
        </RightColumn>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default DemoDashboardPage;