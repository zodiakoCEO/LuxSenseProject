import React, { useState } from 'react';
import styled from 'styled-components';
import SearchInput from '../atoms/SearchInput';
import Button from '../atoms/Button';
import Alert from './Alert';

const SearchFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning'>('success')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
        setAlertType('error');
        setAlertMessage('P9or favor, ingresa un termino de busqueda.')
        setIsAlertOpen(true)
        return
    }
    setAlertType('success')    
    setAlertMessage(`Buscando: ${searchValue}`)
    setIsAlertOpen(true)
    //Placeholder para logica de busqueda
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <SearchFormContainer>
      <SearchInput value={searchValue} onChange={handleChange} />
      <Button label="Buscar" onClick={handleSearch} fixedColor="#10b981" size="large" />
      <Alert
        message = {alertMessage}
        type = {alertType}
        duration = {3000}
        onClose = {handleAlertClose}
        isOpen = {isAlertOpen}
        />
    </SearchFormContainer>
  );
};

export default SearchForm;