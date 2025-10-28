import React from 'react';
import { styled } from '@linaria/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  gradient?: boolean;
}

const ButtonGradient = styled.button<{/* Aparece un error pero es por el eslint, funciona igual*/ }>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #00FF09 0%, #00E5FF 100%);
  color: #FFFFFF;
  box-shadow: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(1, 133, 61, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonSolid = styled.button<{ variant?: 'primary' | 'secondary' }>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props =>
    props.variant === 'secondary' ? '#00FF09' : '#00E5FF'};
  color: #000000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 229, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Button: React.FC<ButtonProps> = ({ gradient = true, variant = 'primary', children, ...rest }) => {
  return gradient ? (
    <ButtonGradient {...rest}>{children}</ButtonGradient>
  ) : (
    <ButtonSolid variant={variant} {...rest}>{children}</ButtonSolid>
  );
};

export default Button;
