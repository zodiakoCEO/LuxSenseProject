import { styled } from '@linaria/react';
import React from 'react';

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

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #CCCCCC;
  font-size: 1.2rem;
`;

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Buscar", value, onChange }) => {
  return (
    <InputWrapper>
      <SearchIcon>🔍</SearchIcon>
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
