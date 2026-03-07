import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

const Container = styled.section`
  padding: 8rem 2rem;
  text-align: center;
  background: radial-gradient(circle at center, rgba(0, 255, 9, 0.08) 0%, transparent 70%);
  max-width: 900px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  color: #ffffff;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #00ff09, #00e5ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CTASubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #64748b;
  margin: 0 auto 3rem;
  max-width: 500px;
  line-height: 1.7;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;

  button {
    font-size: 1.1rem !important;
    padding: 1rem 2.5rem !important;
    min-height: 56px !important;
    min-width: 180px !important;
    border-radius: 12px !important;
  }

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

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <CTATitle>
        ¿Listo para <span>transformar</span> tu empresa?
      </CTATitle>
      <CTASubtitle>
        Únete a más de 500 empresas que ya están ahorrando con LuxSense.
        Sin contratos largos, sin letra pequeña.
      </CTASubtitle>
      <ButtonsRow>
        <Button variant='primary' size='large' onClick={() => navigate('/register')}>
          Crear cuenta gratis
        </Button>
      </ButtonsRow>
    </Container>
  );
};

export default CTASection;