// src/components/molecules/ModalContent.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { FiX } from 'react-icons/fi';

interface ModalContentProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Content = styled.div`
  background-color: #020617;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
`;

const Body = styled.div`
  font-family: 'Inter', sans-serif;
  color: #e2e8f0;
  line-height: 1.7;
`;

export const ModalContent: React.FC<ModalContentProps> = ({ title, children, onClose }) => {
  return (
    <Content>
      <Header>
        <Title>{title}</Title>
        <CloseButton onClick={onClose} aria-label="Cerrar">
          <FiX />
        </CloseButton>
      </Header>
      <Body>{children}</Body>
    </Content>
  );
};

export default ModalContent;
