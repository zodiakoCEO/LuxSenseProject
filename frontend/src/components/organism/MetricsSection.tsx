import React from 'react';
import { styled } from '@linaria/react';
import CircularMetric from '../molecules/CircularMetric';

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
`;

const MetricsSection: React.FC = () => {
  return (
    <MetricsContainer>
      <CircularMetric 
        title="Voltaje"
        value={3}
        unit="voltios"
        color="#00E5FF"
        percentage={45}
      />
      
      <CircularMetric 
        title="Corriente"
        value={45}
        unit="amperios"
        color="#00FF09"
        percentage={60}
      />
      
      <CircularMetric 
        title="Potencia activa"
        value={40}
        unit="KW"
        color="#FF00FF"
        percentage={70}
      />
    </MetricsContainer>
  );
};

export default MetricsSection;