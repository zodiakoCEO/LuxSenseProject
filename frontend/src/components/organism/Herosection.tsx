// src/components/organisms/HeroSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

// ==================== ESTILOS ====================

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
`;

const GlowOrb1 = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 9, 0.12) 0%, transparent 70%);
  top: -100px;
  left: -150px;
  pointer-events: none;
`;

const GlowOrb2 = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%);
  bottom: -100px;
  right: -100px;
  pointer-events: none;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 255, 9, 0.08);
  border: 1px solid rgba(0, 255, 9, 0.25);
  border-radius: 999px;
  padding: 0.4rem 1.25rem;
  margin-bottom: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #00ff09;
  letter-spacing: 0.03em;
`;

const BadgeDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff09;
  box-shadow: 0 0 8px rgba(0, 255, 9, 0.8);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1.08;
  margin: 0 0 1.5rem 0;
  color: #ffffff;
  max-width: 800px;
  letter-spacing: -0.03em;

  span {
    background: linear-gradient(135deg, #00ff09 0%, #00e5ff 60%, #ae00a2 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  max-width: 520px;
  margin: 0 auto 3rem;
  color: #94a3b8;
  line-height: 1.7;
  font-weight: 400;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;

    button {
      width: 100%;
    }
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 640px) {
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

const StatNumber = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

const StatLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StatAccent = styled.span`
  color: #00ff09;
`;

// ==================== COMPONENTE ====================

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <GlowOrb1 />
      <GlowOrb2 />

      <Badge>
        <BadgeDot />
        Plataforma de energía con IA — Ahora disponible
      </Badge>

      <HeroTitle>
        Energía <span>inteligente</span><br />
        para tu empresa
      </HeroTitle>

      <HeroSubtitle>
        Reduce hasta 40% tus costos de iluminación con inteligencia artificial
        que aprende y se adapta a tus patrones de uso.
      </HeroSubtitle>

      <ButtonsRow>
        <Button variant="primary" size="large" onClick={() => navigate('/login')}>
          Ver Demo Gratis
        </Button>
        <Button variant="secondary" size="large" onClick={() => window.open('https://wa.me/573xxxxxxxxx', '_blank')}>
          Contáctanos
        </Button>
      </ButtonsRow>

      <StatsRow>
        <StatItem>
          <StatNumber><StatAccent>500+</StatAccent></StatNumber>
          <StatLabel>Empresas activas</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber><StatAccent>40%</StatAccent></StatNumber>
          <StatLabel>Ahorro promedio</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber><StatAccent>24/7</StatAccent></StatNumber>
          <StatLabel>Monitoreo en vivo</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber><StatAccent>48h</StatAccent></StatNumber>
          <StatLabel>Instalación máxima</StatLabel>
        </StatItem>
      </StatsRow>
    </Wrapper>
  );
};

export default HeroSection;