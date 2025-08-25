import React from "react";
import styled from "styled-components";

const StyledCardValue = styled.p`
    color: #000000;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
    `;

interface CardValueProps {
    children: string | number;
}

const CardValue: React.FC<CardValueProps> = ({ children }) => {
    return (
        <StyledCardValue>{children}</StyledCardValue>
    )
}

export default CardValue