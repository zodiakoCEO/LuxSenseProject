// src/components/atoms/Select.tsx
import React from 'react';
import { styled } from '@linaria/react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SelectLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
`;

const SelectStyled = styled.select`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  min-height: 44px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  /* Flecha personalizada */
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: #00e5ff;
    box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SelectError = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #ef4444;
`;

const Select: React.FC<SelectProps> = ({ 
  label, 
  error, 
  children, 
  ...rest 
}) => {
  return (
    <SelectContainer>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectStyled {...rest}>
        {children}
      </SelectStyled>
      {error && <SelectError>{error}</SelectError>}
    </SelectContainer>
  );
};

export default Select;
