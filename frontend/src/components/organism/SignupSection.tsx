import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';
import SignupForm from '../molecules/SignupForm';

const SectionContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SignupSection: React.FC = () => {
  return (
    <SectionContainer>
      <Title>Crear cuenta</Title>
      <SignupForm />
    </SectionContainer>
  );
};

export default SignupSection;