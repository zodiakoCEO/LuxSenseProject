// src/components/atoms/Button.tsx
import React from 'react';
import { styled } from '@linaria/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  gradient?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const getSizeStyles = (size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: { fontSize: '0.875rem', padding: '0.625rem 1.25rem', minHeight: '36px', minWidth: '100px' },
    medium: { fontSize: '1rem', padding: '0.875rem 1.75rem', minHeight: '44px', minWidth: '140px' },
    large: { fontSize: '1.125rem', padding: '1rem 2.5rem', minHeight: '56px', minWidth: '180px' },
  };
  return sizes[size];
};

const BaseButton = styled.button<{
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  box-sizing: border-box;
  
  ${({ size }) => {
    const s = getSizeStyles(size);
    return `
      font-size: ${s.fontSize};
      padding: ${s.padding};
      min-height: ${s.minHeight};
      min-width: ${s.minWidth};
    `;
  }}
  
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonPrimary = styled(BaseButton)`
  background: linear-gradient(135deg, #00ff09 0%, #00e5ff 100%);
  color: #000000;
  box-shadow: 0 0 20px rgba(0, 255, 9, 0.25);

  &:hover:not(:disabled) {
    box-shadow: 0 0 30px rgba(0, 255, 9, 0.45);
  }
`;

const ButtonSecondary = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 2px solid rgba(0, 255, 9, 0.4);
  backdrop-filter: blur(10px);

  &:hover:not(:disabled) {
    background: rgba(0, 255, 9, 0.15);
    border-color: #00ff09;
    box-shadow: 0 0 25px rgba(0, 255, 9, 0.3);
  }
`;

const ButtonOutline = styled(BaseButton)`
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(0, 255, 9, 0.4);
  backdrop-filter: blur(10px);

  &:hover:not(:disabled) {
    background: rgba(0, 255, 9, 0.1);
    border-color: #00ff09;
    box-shadow: 0 0 25px rgba(0, 255, 9, 0.3);
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...rest
}) => {
  if (variant === 'secondary') {
    return <ButtonSecondary size={size} fullWidth={fullWidth} {...rest}>{children}</ButtonSecondary>;
  }
  if (variant === 'outline') {
    return <ButtonOutline size={size} fullWidth={fullWidth} {...rest}>{children}</ButtonOutline>;
  }
  return <ButtonPrimary size={size} fullWidth={fullWidth} {...rest}>{children}</ButtonPrimary>;
};

export default Button;
