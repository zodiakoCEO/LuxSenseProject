import React from 'react';
import { styled } from '@linaria/react';
import DashboardLayout from '../templates/DashboardLayout';
import InfoCardsGrid from '../organism/InfoCardsGrid';
import EnergyConsumptionSection from '../organism/EnergyConsumptionSection';
import MetricsSection from '../organism/MetricsSection';

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
  return (
    <DashboardLayout>
      <InfoCardsGrid />
      
      <DashboardContent>
        <LeftColumn>
          <EnergyConsumptionSection />
        </LeftColumn>
        
        <RightColumn>
          <MetricsSection />
        </RightColumn>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default DashboardPage;