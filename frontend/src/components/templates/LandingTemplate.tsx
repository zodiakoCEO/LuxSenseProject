import React from 'react';
import { styled } from '@linaria/react';

interface LandingTemplateProps {
  children: React.ReactNode;
}

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #101727;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandingTemplate: React.FC<LandingTemplateProps> = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default LandingTemplate;