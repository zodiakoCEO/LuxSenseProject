import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledPasswordInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem; /* Más padding a la derecha para el ícono */
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #9ca3af;
  padding: 0.25rem; /* Espacio interno para el ícono */
`;

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputWrapper>
      <StyledPasswordInput
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <EyeIcon onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? '🙈' : '👁️'} {/* Placeholder */}
      </EyeIcon>
    </InputWrapper>
  );
};

export default PasswordInput;