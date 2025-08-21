import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 0.75rem;
  background-color: #1e293b;
  color: white;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 0.5rem;
  &:hover {
    background-color: #123456;
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