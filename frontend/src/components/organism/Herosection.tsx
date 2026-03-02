// src/components/organisms/HeroSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const Container = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoClickable = styled.div`
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    opacity: 0.9;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(90deg, #00ff09 0%, #00e5ff 50%, #ff00ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled(Text)`
  font-size: clamp(1.2rem, 3vw, 1.75rem);
  max-width: 600px;
  margin: 0 auto 3rem;
  color: #9ca3af;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleDemo = () => {
    navigate('/login');
  };

  const handleContact = () => {
    // TODO: abrir modal contacto o WhatsApp
    window.open('https://wa.me/573xxxxxxxxx', '_blank');
  };

  return (
    <Container>
      <LogoClickable onClick={() => navigate('/')}>
        <Logo fontSize="clamp(4rem, 10vw, 8rem)" gradient />
      </LogoClickable>

      <HeroTitle>
        Energía inteligente para tu empresa
      </HeroTitle>

      <HeroSubtitle size="1.5rem">
        Reduce hasta 40% tus costos de iluminación con IA que aprende de tus patrones.
      </HeroSubtitle>

      <ButtonsRow>
        <Button gradient onClick={handleDemo} size="large">
          Ver Demo Gratis
        </Button>
        <Button variant="secondary" onClick={handleContact} size="large">
          Contáctanos
        </Button>
      </ButtonsRow>
    </Container>
  );
};

export default HeroSection;
