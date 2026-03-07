// src/components/templates/DashboardLayout.tsx
import { styled } from '@linaria/react';
import React from 'react';
import Sidebar from '../organism/Sidebar';
import DashboardHeader from '../organism/DashboardHeader';
import SettingsModal from '../organism/SettingsModal';
import { SettingsProvider, useSettings } from '../../context/SettingsContext';
import { HelpProvider, useHelp } from '../../context/HelpContext';
import HelpModal from '../organism/HelpModal';

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

const LayoutWithModals: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isSettingsOpen, closeSettings } = useSettings();
  const { isHelpOpen, closeHelp } = useHelp();

  return (
    <>
      <LayoutContainer>
        <Sidebar />
        <MainContent>
          <DashboardHeader />
          <ContentArea>{children}</ContentArea>
        </MainContent>
      </LayoutContainer>
      
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      <HelpModal isOpen={isHelpOpen} onClose={closeHelp} />
    </>
  );
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SettingsProvider>
      <HelpProvider> 
        <LayoutWithModals>{children}</LayoutWithModals>
      </HelpProvider>
    </SettingsProvider>
  );
};

export default DashboardLayout;