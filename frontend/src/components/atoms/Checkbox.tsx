// src/components/atoms/Checkbox.tsx
import { styled } from '@linaria/react';
import React from 'react';

interface CheckboxProps {
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.checked ? '#00E5FF' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 4px;
  background-color: ${props => props.checked ? '#00E5FF' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #00E5FF;
  }

  ${props => props.checked ? `
    &::after {
      content: '✓';
      color: #0f172a;
      font-weight: bold;
      font-size: 14px;
    }
  `:''}
`;

const Label = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #CCCCCC;
`;

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <CheckboxWrapper>
      <HiddenCheckbox 
        type="checkbox" 
        checked={checked} 
        onChange={handleChange}
      />
      <StyledCheckbox checked={checked} />
      <Label>{label}</Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
