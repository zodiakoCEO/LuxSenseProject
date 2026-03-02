// src/components/organisms/RegisterBrandingSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';
import BenefitsList from '../molecules/BenefitsList';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
  padding: 3rem 2rem;
`;

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

const Tagline = styled(Text)`
  margin-top: 0.5rem;
`;

// Tarjeta doble reutilizada
const CardContainer = styled.div`
  position: relative;
  max-width: 520px;
  width: 100%;
  height: 200px;
`;

const BackCard = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, #ff00ff 0%, #4b00ff 100%);
  transform: rotate(-3deg);
  z-index: 0;
`;

const FrontCard = styled.div`
  position: absolute;
  inset: 8px;
  border-radius: 24px;
  background-color: #00e5ff;
  z-index: 1;
`;


const RegisterBrandingSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <div>
        <LogoClickable onClick={handleGoHome}>
          <Logo fontSize="3rem" gradient />
        </LogoClickable>
        <Tagline size="0.9rem" color="#A3A3A3">
          Plataforma de Energía con IA.
        </Tagline>
      </div>

      <CardContainer>
        <BackCard />
        <FrontCard />
      </CardContainer>

      <BenefitsList />
    </Wrapper>
  );
};

export default RegisterBrandingSection;
