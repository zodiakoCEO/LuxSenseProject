import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    outline: none;
    border-color: #10b981; /* Resalta al enfocar, color de LuxSense */
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
`;

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string; // Para asociar con label
  ariaLabel?: string; // Para accesibilidad
  name?: string
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, id, ariaLabel ,name }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      aria-label={ariaLabel || placeholder} // Usa placeholder como fallback para aria-label
      name={name}
    />
  );
};

export default Input;