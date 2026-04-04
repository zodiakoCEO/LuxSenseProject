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
   
    small: {
      fontSize: '0.95rem',
      padding: '0.8rem 1.8rem',
      minHeight: '44px',
      minWidth: '140px',
    },
  
    medium: {
      fontSize: '1rem',
      padding: '0.9rem 2.1rem',
      minHeight: '50px',
      minWidth: '160px',
    },
  
    large: {
      fontSize: '1.1rem',
      padding: '1rem 2.5rem',
      minHeight: '56px',
      minWidth: '180px',
    },
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

  font-size: ${props => getSizeStyles(props.size ?? 'medium').fontSize};
  padding: ${props => getSizeStyles(props.size ?? 'medium').padding};
  min-height: ${props => getSizeStyles(props.size ?? 'medium').minHeight};
  min-width: ${props => getSizeStyles(props.size ?? 'medium').minWidth};

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}

  &:focus-visible {
    outline: 2px solid #00ff09;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(0, 255, 9, 0.4);
  }

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
  type = 'button',
  children,
  ...rest
}) => {
  if (variant === 'secondary') {
    return (
      <ButtonSecondary
        size={size}
        fullWidth={fullWidth}
        type={type}
        {...rest}
      >
        {children}
      </ButtonSecondary>
    );
  }

  if (variant === 'outline') {
    return (
      <ButtonOutline
        size={size}
        fullWidth={fullWidth}
        type={type}
        {...rest}
      >
        {children}
      </ButtonOutline>
    );
  }

  return (
    <ButtonPrimary
      size={size}
      fullWidth={fullWidth}
      type={type}
      {...rest}
    >
      {children}
    </ButtonPrimary>
  );
};

export default Button;