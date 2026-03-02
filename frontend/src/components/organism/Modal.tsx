// src/components/organisms/Modal.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { ModalOverlay } from '../atoms/ModalOverlay';
import { ModalContent } from '../molecules/ModalContent';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface WrapperProps {
  isOpen: boolean;
}

const ModalWrapper = styled.div<WrapperProps>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  inset: 0;
  z-index: 9999;
`;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onKeyDown={handleEscape} tabIndex={-1}>
      <ModalOverlay onClose={onClose}>
        <ModalContent title={title} onClose={onClose}>
          {children}
        </ModalContent>
      </ModalOverlay>
    </ModalWrapper>
  );
};

export default Modal;
