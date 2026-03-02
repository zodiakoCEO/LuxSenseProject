// src/components/atoms/ModalOverlay.tsx
import { styled } from '@linaria/react';
import React from 'react';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
`;

interface ModalOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children, onClose }) => {
  const handleClick = (e: React.MouseEvent) => {
    // only close when clicking directly on the overlay, not on the content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClick}>
      {children}
    </Overlay>
  );
};

export default ModalOverlay;
