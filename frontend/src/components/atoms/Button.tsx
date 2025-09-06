import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ variant?: string; size?: string; fixedColor?: string }>`
  padding: ${props => props.size === 'large' ? '0.75rem 1.5rem' : '0.75rem'};
  background-color: ${props => props.fixedColor || (props.variant === 'primary' ? '#1e293b' : props.variant === 'secondary' ? '#6b7280' : props.variant === 'success' ? '#10b981' : '#1e293b')};
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  margin: ${props => props.size === 'large' ? '0.5rem' : '0 0.5rem'};
  &:hover {
    background-color: ${props => props.fixedColor ? props.fixedColor : (props.variant === 'primary' ? '#123456' : props.variant === 'secondary' ? '#4b5563' : props.variant === 'success' ? '#047857' : '#123456')};
  }
`;

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'default' | 'large'; 
  fixedColor?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', size = 'default', fixedColor }) => {
  return <StyledButton onClick={onClick} variant={variant} size={size} fixedColor={fixedColor}>{label}</StyledButton>;
};

export default Button;