import React from 'react';
import styled from 'styled-components';
import BigIcon from '../atoms/BigIcon';
import { useNavigate } from 'react-router-dom';

const LogoContainer = styled.div`
  background-color: #1e293b;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #d4af37;
`;

const LogoText = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #9ca3af;
`;

const LogoSection: React.FC = () => {
  const navigate = useNavigate()

  const handiconClick = () => {
    navigate('/')
  }
  return (
    <LogoContainer>
      <BigIcon onClick={handiconClick} ariaLabel="lightbulb">💡</BigIcon>
      <LogoText>LUXSENSE</LogoText>
      <Subtitle>Automatizando tus sentidos</Subtitle>
    </LogoContainer>
  );
};

export default LogoSection;