import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';
import LoginForm from '../molecules/LoginForm';

const SectionContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoginSection: React.FC = () => {
  return (
    <SectionContainer>
      <Title>Bienvenido</Title>
      <LoginForm />
    </SectionContainer>
  );
};

export default LoginSection;