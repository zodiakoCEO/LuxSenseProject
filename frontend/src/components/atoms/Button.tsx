import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #1e40af;
  }
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;