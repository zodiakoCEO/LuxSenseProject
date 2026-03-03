import React from 'react';
import { styled } from '@linaria/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  gradient?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ButtonGradient = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  min-height: 56px;
  min-width: 180px;
  border-radius: 12px;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(0, 255, 9, 0.4);
  box-shadow: 0 0 12px rgba(0, 255, 9, 0.1);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #00ff09 0%, #00e5ff 100%);
    border-color: transparent;
    color: #000000;
    box-shadow: 0 0 35px rgba(0, 255, 9, 0.5), 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  &:active:not(:disabled) { transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ButtonOutline = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  min-height: 56px;
  min-width: 180px;
  border-radius: 12px;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(0, 255, 9, 0.4);
  box-shadow: 0 0 12px rgba(0, 255, 9, 0.1);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #00ff09 0%, #00e5ff 100%);
    border-color: transparent;
    color: #000000;
    box-shadow: 0 0 35px rgba(0, 255, 9, 0.5), 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  &:active:not(:disabled) { transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const ButtonSubmit = styled.button`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.9rem 1.75rem;
  min-height: 48px;
  width: 100%;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: all 0.25s ease;
  background: linear-gradient(135deg, #00ff09 0%, #00e5ff 100%);
  color: #000000;
  box-shadow: 0 0 20px rgba(0, 255, 9, 0.25);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(0, 255, 9, 0.45);
  }

  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const Button: React.FC<ButtonProps> = ({
  gradient = false,
  variant = 'primary',
  size,
  children,
  ...rest
}) => {
  if (gradient) return <ButtonGradient {...rest}>{children}</ButtonGradient>;
  if (variant === 'outline') return <ButtonOutline {...rest}>{children}</ButtonOutline>;
  return <ButtonSubmit {...rest}>{children}</ButtonSubmit>;
};

export default Button;