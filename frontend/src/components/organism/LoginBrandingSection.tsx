// src/components/organisms/LoginBrandingSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';
import TestimonialCard from '../molecules/TestimonialCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  padding: 3rem 2rem;
`;

const Tagline = styled(Text)`
  margin-top: 0.5rem;
`;

/* Contenedor clicable para el logo */
const LogoClickable = styled.div`
  display: inline-flex;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

/**
 * Contenedor general de la “tarjeta doble”
 */
const CardContainer = styled.div`
  position: relative;
  max-width: 564px;
  width: 100%;
  height: 220px;
`;

/**
 * Tarjeta de atrás (degradado, ligeramente girada)
 */
const BackCard = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, #ff00ff 0%, #4b00ff 100%);
  transform: rotate(-1deg);
  z-index: 0;
`;

/**
 * Tarjeta frontal (cyan, sin giro) donde irá la imagen
 */
const FrontCard = styled.div`
  position: absolute;
  inset: 8px;
  border-radius: 24px;
  background-color: #00e5ff;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

/**
 * Contenedor del texto de testimonio (debajo de la tarjeta)
 */
const TestimonialInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LoginBrandingSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <div>
        <LogoClickable onClick={handleGoHome}>
          <Logo fontSize="5rem" gradient={true} />
        </LogoClickable>
        <Tagline size="0.95rem" color="#A3A3A3">
          Plataforma de energía con IA.
        </Tagline>
      </div>

      <CardContainer>
        <BackCard />
        <FrontCard>
          <span>Imagen del testimonio</span>
        </FrontCard>
      </CardContainer>

      <TestimonialInfo>
        <TestimonialCard
          quote="LuxSense ha reducido nuestros costos energéticos en un 40% mientras mejora la experiencia de nuestros empleados."
          author="María Gonzales"
          role="Directora de Operaciones, TechCorp"
        />
      </TestimonialInfo>
    </Wrapper>
  );
};

export default LoginBrandingSection;
