import React from 'react';
import styled from 'styled-components';

const StyledSearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #047857;
  }
`;

interface SearchButtonProps {
  label: string;
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ label, onClick }) => {
  return <StyledSearchButton onClick={onClick}>{label}</StyledSearchButton>;
};

export default SearchButton;