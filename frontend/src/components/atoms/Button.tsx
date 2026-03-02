// src/components/atoms/Button.tsx
import React from 'react';
import { styled } from '@linaria/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  gradient?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const getSizeStyles = (size?: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return `
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
      `;
    case 'large':
      return `
        font-size: 1.125rem;
        padding: 1rem 2.5rem;
      `;
    case 'medium':
    default:
      return `
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
      `;
  }
};

const ButtonGradient = styled.button<{ size?: 'small' | 'medium' | 'large' }>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  ${(props) => getSizeStyles(props.size)}
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #00ff09 0%, #00e5ff 100%);
  color: #ffffff;
  box-shadow: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(1, 133, 61, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonSolid = styled.button<{
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  ${(props) => getSizeStyles(props.size)}
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.variant === 'secondary' ? '#00FF09' : '#00E5FF'};
  color: #000000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 229, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Button: React.FC<ButtonProps> = ({
  gradient = false,
  variant = 'primary',
  size = 'medium',
  children,
  ...rest
}) => {
  return gradient ? (
    <ButtonGradient size={size} {...rest}>
      {children}
    </ButtonGradient>
  ) : (
    <ButtonSolid variant={variant} size={size} {...rest}>
      {children}
    </ButtonSolid>
  );
};

export default Button;
