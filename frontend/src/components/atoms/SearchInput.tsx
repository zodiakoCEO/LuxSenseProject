import React from "react";
import styled from "styled-components";

const StyledSearchInput = styled.input`
    padding: 0.75rem;
    width: 20rem;
    border: 1px solid #d1d5db;
    border-radius: 9999px;
    font-size: 1rem;
    margin-right: 0.5rem;
    `;

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = `Buscar ambiente`}) => {
    return (
        <StyledSearchInput value={value} onChange={onChange} placeholder= { placeholder }/>
    )
}

export default SearchInput