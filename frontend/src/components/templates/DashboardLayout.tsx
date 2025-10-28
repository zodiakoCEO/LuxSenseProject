// src/components/templates/DashboardLayout.tsx
import { styled } from '@linaria/react';
import React from 'react';
import Sidebar from '../organism/Sidebar';
import DashboardHeader from '../organism/DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #101727;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <DashboardHeader />
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default DashboardLayout;
