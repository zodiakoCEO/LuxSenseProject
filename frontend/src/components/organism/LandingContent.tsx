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

const DescriptionText = styled(Text)`
  max-width: 700px;
  text-align: center;
`;

const LandingContent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/Dashboard');
  };

  return (
    <ContentContainer>
      <Logo fontSize="5rem" gradient={true}/>
      <DescriptionText size="1.25rem" color="#CCCCCC" align="center">
        Esta pagina esta en construcción, de momento te invitamos a que veas nuestro DashBoard, gracias por la paciencia ^^
      </DescriptionText>
      <Button onClick={handleNavigate}>
        Ir al DashBoard
      </Button>
    </ContentContainer>
  );
};

export default LandingContent;