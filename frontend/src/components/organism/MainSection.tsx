import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import BigIcon from "../atoms/BigIcon";
import SearchForm from "../molecules/SearchForm";

const MainSectionContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background-color: #ffffff;
    `;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
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

    `;

const MainSection: React.FC = () => {
    const navigate = useNavigate();
    
    const handleAmbienteClick = () => {
        alert('Navegando a ambientes')
    }

    const handleDashboardClick = () => {
       navigate('/dashboard');
    }

    return (
        <MainSectionContainer>
            <LeftSection>
                <Title>Sensorizando tus sentidos al maximo</Title>
                <ButtonContainer>
                    <Button label="Ambientes" onClick={handleAmbienteClick}/>
                    <Button label="Dashboard" onClick={handleDashboardClick}/>
                </ButtonContainer>
                <SearchForm/>
            </LeftSection>
            <IconContainer>
                <BigIcon ariaLabel="lightbulb">💡</BigIcon>
            </IconContainer>
        </MainSectionContainer>
    )
}

export default MainSection