import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  &::placeholder {
    color: #9ca3af;
  }
`;

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  return ( 
  <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
  )
};

export default Input;