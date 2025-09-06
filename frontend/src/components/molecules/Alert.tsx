import React, { useEffect } from 'react';
import styled from 'styled-components';
import Icon from '../atoms/Icon';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ModalContainer = styled.div<{ type: string }>`
  background-color: #ffffff;
  border: 2px solid ${props => props.type === 'success' ? '#10b981' : props.type === 'error' ? '#ef4444' : '#f59e0b'};
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #000000;
  font-size: 1rem;
  z-index: 1000;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
  onClose?: () => void;
  isOpen: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type = 'success', duration = 3000, onClose, isOpen }) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen && duration) {
      timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer type={type} onClick={(e) => e.stopPropagation()}>
        <div>
          {type === 'success' && <Icon ariaLabel="check">✅</Icon>}
          {type === 'error' && <Icon ariaLabel="error">❌</Icon>}
          {type === 'warning' && <Icon ariaLabel="warning">⚠️</Icon>}
          {message}
        </div>
      </ModalContainer>
    </Overlay>
  );
};

export default Alert;