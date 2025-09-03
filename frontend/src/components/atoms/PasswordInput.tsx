import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
`;

const StyledPasswordInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: #9ca3af;
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
        {showPassword ? '🙈' : '👁️'} {/* Placeholder  */}
      </EyeIcon>
    </InputWrapper>
  );
};

export default PasswordInput;