import React from 'react';
import { styled } from '@linaria/react';
import Logo from '../atoms/Logo';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    align-items: center;

    > button {
      width: 100%;
      max-width: 260px;
    }
  }
`;

const DescriptionText = styled(Text)`
  max-width: 700px;
  text-align: center;
`;

const LandingContent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateDashboard = () => {
    navigate('/Dashboard');
  };

  const handleNavigateLogin = () => {
    navigate('/login'); // cambia esta ruta si tu login está en otra
  };

  return (
    <ContentContainer>
      <Logo fontSize="5rem" gradient={true} />
      <DescriptionText size="1.25rem" color="#CCCCCC" align="center">
        Esta página está en construcción, de momento te invitamos a que veas nuestro DashBoard, gracias por la paciencia ^^
      </DescriptionText>

      <ButtonsContainer>
        <Button gradient={true} onClick={handleNavigateDashboard}>
          Ir al DashBoard
        </Button>
        <Button gradient={false} variant="secondary" onClick={handleNavigateLogin}>
          Ir al Login
        </Button>
      </ButtonsContainer>
    </ContentContainer>
  );
};

export default LandingContent;
