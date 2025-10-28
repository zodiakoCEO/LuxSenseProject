import { styled } from '@linaria/react';
import React from 'react';
import Logo from '../atoms/Logo';
import SidebarItem from '../molecules/SidebarItem';

const SidebarContainer = styled.aside`
  width: 260px;
  height: 100vh;
  background-color: #0f172a;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  position: fixed;
  left: 0;
  top: 0;
`;

const LogoSection = styled.div`
  padding: 0 1.25rem 2rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavSection = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.75rem;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.75rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoSection>
        <Logo fontSize="1.5rem" gradient={true}/>
      </LogoSection>
      
      <NavSection>
        <SidebarItem icon="📊" label="Dashboard" path="/dashboard" />
        <SidebarItem icon="🏠" label="Ambientes" path="/ambientes" />
        <SidebarItem icon="📜" label="Historial" path="/historial" />
      </NavSection>
      
      <BottomSection>
        <SidebarItem icon="❓" label="Ayuda" path="/ayuda" />
        <SidebarItem icon="⚙️" label="Ajustes" path="/ajustes" />
        <SidebarItem icon="🚪" label="Salir" path="/logout" />
      </BottomSection>
    </SidebarContainer>
  );
};

export default Sidebar;
