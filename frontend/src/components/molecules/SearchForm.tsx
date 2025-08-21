import React,{useState} from "react";
import styled from "styled-components";
import SearchInput from "../atoms/SearchInput";
import SearchButton from "../atoms/SearchButton";

const SearchFormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    `;

const SearchForm: React.FC = () =>{
    const [searchValue, setSearchValue] = useState('');

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue (e.target.value);
    };

    const handleSearch = () => {
        alert(`Buscando: ${searchValue}`);
    };

    return (
        <SearchFormContainer>
            <SearchInput value={searchValue} onChange={HandleChange} />
            <SearchButton label="Buscar" onClick={handleSearch} />
        </SearchFormContainer>
    )
}

export default SearchForm