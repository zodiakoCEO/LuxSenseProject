// src/components/organisms/StatsSection.tsx
import React from 'react';
import { styled } from '@linaria/react';

const Container = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 229, 255, 0.03) 50%, transparent 100%);
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 3rem;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem 1rem;
`;

const StatNumber = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #9ca3af;
  margin: 0;
`;

const StatsSection: React.FC = () => {
  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <StatNumber>500+</StatNumber>
          <StatLabel>Empresas confiando en LuxSense</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>40%</StatNumber>
          <StatLabel>Ahorro promedio garantizado</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Soporte técnico disponible</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>48h</StatNumber>
          <StatLabel>Tiempo de instalación máximo</StatLabel>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

export default StatsSection;
