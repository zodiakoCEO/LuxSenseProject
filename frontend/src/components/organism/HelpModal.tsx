// src/components/organisms/HelpModal.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Modal from '../organism/Modal';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import {  FaSearch, FaVideo, FaBook } from 'react-icons/fa';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContentStyled = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled(Input)`
  width: 100%;
`;

const SearchTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const HelpCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: #00e5ff;
    transform: translateY(-2px);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
`;

const CategoryDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
`;

const ContactSection = styled.div`
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const ContactButton = styled(Button)`
  margin: 0.5rem;
`;

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      icon: <FaBook />,
      title: 'Guías rápidas',
      description: 'Configuración inicial, primeros pasos, tutoriales',
      action: () => window.open('/docs', '_blank'),
    },
    {
      icon: <FaVideo />,
      title: 'Videos tutoriales',
      description: 'Aprende visualmente cómo usar LuxSense',
      action: () => window.open('https://youtube.com/luxsense', '_blank'),
    },
    {
      icon: <FaSearch />,
      title: 'Base de conocimiento',
      description: 'Encuentra respuestas a problemas comunes',
      action: () => window.open('/knowledge-base', '_blank'),
    },
  ];

  const handleCategoryClick = (action?: () => void) => {
    if (action) action();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Centro de Ayuda">
      <ModalContentStyled>
        <SearchSection>
          <SearchTitle>
            <FaSearch />
            ¿En qué te podemos ayudar?
          </SearchTitle>
          <SearchInput
            placeholder="Buscar en ayuda, guías, tutoriales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix={<FaSearch style={{ color: '#9ca3af' }} />}
          />
        </SearchSection>

        <HelpCategories>
          {helpCategories.map((category, index) => (
            <CategoryCard key={index} onClick={() => handleCategoryClick(category.action)}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
            </CategoryCard>
          ))}
        </HelpCategories>

        <ContactSection>
          <h3 style={{ color: '#ffffff', margin: '0 0 1rem 0' }}>
            ¿No encontraste lo que buscabas?
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ContactButton gradient>
              Chat en vivo
            </ContactButton>
            <ContactButton variant="secondary">
              WhatsApp
            </ContactButton>
            <ContactButton variant="secondary">
              Llamar
            </ContactButton>
          </div>
        </ContactSection>
      </ModalContentStyled>
    </Modal>
  );
};

export default HelpModal;
