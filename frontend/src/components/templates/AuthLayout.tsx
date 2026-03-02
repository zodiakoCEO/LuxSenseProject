// src/components/templates/AuthLayout.tsx
import React from 'react';
import { styled } from '@linaria/react';

interface AuthLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #101727;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 3rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const LeftColumn = styled.div`
  @media (max-width: 1024px) {
    order: 2;
  }
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    order: 1;
  }
`;

const AuthLayout: React.FC<AuthLayoutProps> = ({ left, right }) => {
  return (
    <PageWrapper>
      <Content>
        <LeftColumn>{left}</LeftColumn>
        <RightColumn>{right}</RightColumn>
      </Content>
    </PageWrapper>
  );
};

export default AuthLayout;
