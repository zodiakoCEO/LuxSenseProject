import React from 'react';
import styled from 'styled-components';

interface LoginButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success';
}

const LoginButton: React.FC<LoginButtonProps> = ({ label, onClick, variant = 'primary' }) => {
const StyledButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: ${variant === 'primary' ? '#1e293b' : variant === 'secondary' ? '#6b7280' : '#10b981'};
    color: white;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 1rem;
    margin: 0.5rem;
    &:hover {
      background-color: ${variant === 'primary' ? '#123456' : variant === 'secondary' ? '#4b5563' : '#047857'};
    }
  `;
 
    return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default LoginButton;