import React from 'react';
import { styled } from '@linaria/react';
import EnergyLineChart from '../molecules/EnergyLineChart';
import ProgressBar from '../molecules/Progressbar';

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

const EnergyConsumptionSection: React.FC = () => {
  return (
    <SectionContainer>
      <EnergyLineChart />
      
      <ProgressBarsContainer>
        <SectionTitle>Ahorro de energía</SectionTitle>
        <ProgressBar label="Mes actual" percentage={75} color="#00FF09" />
        <ProgressBar label="Mes pasado" percentage={25} color="#AE00A2" />
      </ProgressBarsContainer>
    </SectionContainer>
  );
};

export default EnergyConsumptionSection;