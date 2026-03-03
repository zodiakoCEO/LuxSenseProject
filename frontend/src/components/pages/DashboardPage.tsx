import React from 'react';
import { styled } from '@linaria/react';
import DashboardLayout from '../templates/DashboardLayout';
import InfoCardsGrid from '../organism/InfoCardsGrid';
import EnergyConsumptionSection from '../organism/EnergyConsumptionSection';
import MetricsSection from '../organism/MetricsSection';
import { useAIData } from '../../hooks/useAIData';

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

const DashboardPage: React.FC = () => {
  const { energyForecast, anomalySummary, lightingSchedule, loading } = useAIData();

  return (
    <DashboardLayout>
      <InfoCardsGrid anomalySummary={anomalySummary} loading={loading} />
      <DashboardContent>
        <LeftColumn>
          <EnergyConsumptionSection forecast={energyForecast} loading={loading} />
        </LeftColumn>
        <RightColumn>
          <MetricsSection lightingSchedule={lightingSchedule} loading={loading} />
        </RightColumn>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default DashboardPage;