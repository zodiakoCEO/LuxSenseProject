// src/components/molecules/SocialButtons.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface SocialButtonsProps {
  onGoogleClick: () => void;
  onFacebookClick: () => void;
}

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const SocialButtons: React.FC<SocialButtonsProps> = ({ onGoogleClick, onFacebookClick }) => {
  return (
    <ButtonsWrapper>
      <SocialButton type="button" onClick={onGoogleClick}>
        <FaGoogle size={18} />
        Google
      </SocialButton>
      <SocialButton type="button" onClick={onFacebookClick}>
        <FaFacebook size={18} />
        Facebook
      </SocialButton>
    </ButtonsWrapper>
  );
};

export default SocialButtons;
