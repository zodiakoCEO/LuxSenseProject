// src/components/organisms/FeaturesSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { FaBrain, FaChartLine, FaPlug, FaShieldAlt, FaBolt, FaLeaf } from 'react-icons/fa';

const Container = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionBadge = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const Badge = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #00ff09;
  background: rgba(0, 255, 9, 0.08);
  border: 1px solid rgba(0, 255, 9, 0.2);
  border-radius: 999px;
  padding: 0.35rem 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin: 0 0 1rem 0;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto 4rem;
  line-height: 1.7;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 2.25rem 1.75rem;
  text-align: left;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 9, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(0, 255, 9, 0.2);
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 255, 9, 0.05);

    &::before {
      opacity: 1;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: #000;
  box-shadow: 0 4px 15px rgba(0, 255, 9, 0.25);
`;

const FeatureTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', sans-serif;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
  font-size: 0.925rem;
`;

const features = [
  {
    icon: <FaBrain />,
    title: 'IA Predictiva',
    description: 'Algoritmos que aprenden de tus patrones de consumo y optimizan automáticamente tu iluminación.',
  },
  {
    icon: <FaChartLine />,
    title: 'Ahorro Garantizado',
    description: 'Reduce hasta 40% tus costos energéticos desde el primer mes. Resultados medibles y transparentes.',
  },
  {
    icon: <FaPlug />,
    title: 'Instalación Simple',
    description: 'Setup completo en menos de 48 horas. Sin interrupciones en tu operación.',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Soporte 24/7',
    description: 'Equipo técnico especializado siempre disponible para tu tranquilidad y continuidad.',
  },
  {
    icon: <FaBolt />,
    title: 'Tiempo Real',
    description: 'Monitoreo en vivo de todos tus sensores y ambientes desde un solo dashboard centralizado.',
  },
  {
    icon: <FaLeaf />,
    title: 'Impacto Ambiental',
    description: 'Reduce tu huella de carbono mientras optimizas costos. Sostenibilidad sin sacrificar productividad.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <Container>
      <SectionBadge>
        <Badge>¿Por qué LuxSense?</Badge>
      </SectionBadge>
      <SectionTitle>Todo lo que necesitas</SectionTitle>
      <SectionSubtitle>
        Una plataforma completa para gestionar, optimizar y reducir tu consumo energético.
      </SectionSubtitle>
      <FeaturesGrid>
        {features.map((f, i) => (
          <FeatureCard key={i}>
            <FeatureIcon>{f.icon}</FeatureIcon>
            <FeatureTitle>{f.title}</FeatureTitle>
            <FeatureDescription>{f.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </Container>
  );
};

export default FeaturesSection;