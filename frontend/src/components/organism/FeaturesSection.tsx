// src/components/organisms/FeaturesSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { FaBrain, FaChartLine, FaPlug, FaShieldAlt } from 'react-icons/fa';

const Container = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin: 0 0 4rem 0;
  color: #ffffff;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 1rem 0;
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', sans-serif;
  color: #9ca3af;
  line-height: 1.7;
  margin: 0;
`;

const FeaturesSection: React.FC = () => {
  return (
    <Container>
      <SectionTitle>Por qué LuxSense</SectionTitle>

      <FeaturesGrid>
        <FeatureCard>
          <FeatureIcon>
            <FaBrain />
          </FeatureIcon>
          <FeatureTitle>IA Predictiva</FeatureTitle>
          <FeatureDescription>
            Algoritmos que aprenden de tus patrones de consumo y optimizan
            automáticamente tu iluminación.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaChartLine />
          </FeatureIcon>
          <FeatureTitle>Ahorro Garantizado</FeatureTitle>
          <FeatureDescription>
            Reduce hasta 40% tus costos energéticos desde el primer mes.
            Resultados medibles y transparentes.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaPlug />
          </FeatureIcon>
          <FeatureTitle>Instalación Simple</FeatureTitle>
          <FeatureDescription>
            Setup completo en menos de 48 horas. Sin interrupciones en tu operación.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <FaShieldAlt />
          </FeatureIcon>
          <FeatureTitle>Soporte 24/7</FeatureTitle>
          <FeatureDescription>
            Equipo técnico especializado siempre disponible para tu tranquilidad.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </Container>
  );
};

export default FeaturesSection;
