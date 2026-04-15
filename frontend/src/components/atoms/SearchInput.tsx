import { styled } from '@linaria/react';
import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5f5;
  font-size: 0.75rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  ${InputWrapper}:focus-within & {
    border-color: #00e5ff;
    background-color: rgba(15, 23, 42, 0.9);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  
  &::placeholder {
    color: #CCCCCC;
  }
  
  &:focus {
    outline: none;
    border-color: #00E5FF;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Buscar", value, onChange }) => {
  return (
    <InputWrapper>
      <IconWrapper>
        <FaMagnifyingGlass />
      </IconWrapper>
      <StyledInput 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default SearchInput;