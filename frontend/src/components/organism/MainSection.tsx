import React from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import SearchForm from "../molecules/SearchForm";

const MainSectionContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #ffffff;
    `;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    `;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
    `;

const MainSection: React.FC = () => {
    
    const handleAmbienteClick = () => {
        alert('Navegando a ambientes')
    }

    const handleDashboardClick = () => {
        alert('Navegando a Dashboard')
    }

    return (
        <MainSectionContainer>
            <Title>Sensorizando tus sentidos al maximo</Title>
            <ButtonContainer>
                <Button label="Ambientes" onClick={handleAmbienteClick}/>
                <Button label="Dashboard" onClick={handleDashboardClick}/>
            </ButtonContainer>
            <SearchForm/>
            <IconContainer>
                <Icon ariaLabel="lightbulb">💡</Icon>
            </IconContainer>
        </MainSectionContainer>
    )
}

export default MainSection