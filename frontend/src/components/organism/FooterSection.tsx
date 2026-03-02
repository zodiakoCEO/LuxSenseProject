// src/components/organisms/FooterSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import Logo from '../atoms/Logo';

const Container = styled.footer`
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColumnTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
`;

const FooterLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #9ca3af;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #00e5ff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 229, 255, 0.2);
    color: #00e5ff;
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <FooterContent>
        <FooterColumn>
          <Logo fontSize="2.5rem" gradient onClick={() => navigate('/')} />
          <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.95rem' }}>
            Optimización energética inteligente para empresas del futuro.
          </p>
          <SocialLinks>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Producto</ColumnTitle>
          <FooterLink onClick={() => navigate('/features')}>Características</FooterLink>
          <FooterLink onClick={() => navigate('/pricing')}>Precios</FooterLink>
          <FooterLink onClick={() => navigate('/demo')}>Demo</FooterLink>
          <FooterLink onClick={() => navigate('/integrations')}>Integraciones</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Empresa</ColumnTitle>
          <FooterLink onClick={() => navigate('/about')}>Nosotros</FooterLink>
          <FooterLink onClick={() => navigate('/careers')}>Carreras</FooterLink>
          <FooterLink onClick={() => navigate('/blog')}>Blog</FooterLink>
          <FooterLink onClick={() => navigate('/contact')}>Contacto</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Recursos</ColumnTitle>
          <FooterLink onClick={() => navigate('/docs')}>Documentación</FooterLink>
          <FooterLink onClick={() => navigate('/help')}>Centro de ayuda</FooterLink>
          <FooterLink onClick={() => navigate('/support')}>Soporte técnico</FooterLink>
          <FooterLink onClick={() => navigate('/api')}>API</FooterLink>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <Copyright>© 2026 LuxSense. Todos los derechos reservados.</Copyright>
        <LegalLinks>
          <FooterLink onClick={() => navigate('/privacy')}>Privacidad</FooterLink>
          <FooterLink onClick={() => navigate('/terms')}>Términos</FooterLink>
          <FooterLink onClick={() => navigate('/cookies')}>Cookies</FooterLink>
        </LegalLinks>
      </FooterBottom>
    </Container>
  );
};

export default FooterSection;
