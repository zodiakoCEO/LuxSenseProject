// src/components/atoms/Input.tsx
import { styled } from '@linaria/react';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #FFFFFF;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.hasError ? '#FF0000' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #8B8B8B;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#FF0000' : '#00E5FF'};
    background-color: rgba(255, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #FF0000;
`;

export const Input: React.FC<InputProps> = ({ label, error, ...rest }) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput hasError={!!error} {...rest} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;
