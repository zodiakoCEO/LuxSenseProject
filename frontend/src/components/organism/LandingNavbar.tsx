// src/components/organisms/LandingNavbar.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';

const NAVBAR_HEIGHT = 80;

const NavbarWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${NAVBAR_HEIGHT}px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at top left,
    rgba(0, 255, 9, 0.05) 0%,
    rgba(15, 23, 42, 0.98) 45%,
    rgba(2, 6, 23, 0.98) 100%
  );
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  backdrop-filter: blur(18px);
`;

const NavbarInner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-left: 3rem;
  flex: 1;

  @media (max-width: 960px) {
    display: none;
  }
`;

const NavLink = styled.button<{ active?: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ active }) => (active ? '#ffffff' : '#e5e7eb')};
  cursor: pointer;
  letter-spacing: 0.04em;
  text-transform: none;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #00ff09;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.6rem;
    margin: 0 auto;
    width: ${({ active }) => (active ? '60%' : '0')};
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(135deg, #00ff09 0%, #00e5ff 100%);
    box-shadow: 0 0 12px rgba(0, 255, 9, 0.6);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transform: ${({ active }) => (active ? 'scaleX(1)' : 'scaleX(0.4)')};
    transition: all 0.25s ease;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Inicio', targetId: 'inicio' },
    { label: 'Tecnología', targetId: 'tecnologia' },
    { label: 'Sostenibilidad', targetId: 'sostenibilidad' },
    { label: 'Casos de Éxito', targetId: 'casos-exito' },
    { label: 'FAQ', targetId: 'faq' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <NavbarWrapper>
      <NavbarInner>
        <LogoContainer onClick={() => scrollToSection('inicio')}>
          <Logo fontSize="1.7rem" gradient />
        </LogoContainer>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.targetId}
              onClick={() => scrollToSection(item.targetId)}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <Actions>
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigate('/login')}
          >
            Ingresar
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => navigate('/register')}
          >
            Comenzar
          </Button>
        </Actions>
      </NavbarInner>
    </NavbarWrapper>
  );
};

export default LandingNavbar;