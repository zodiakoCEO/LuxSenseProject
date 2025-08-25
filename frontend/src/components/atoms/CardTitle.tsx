import React from "react";
import styled from "styled-components";

const StyledCardTitle = styled.h2`
    color: #000000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0%.5rem;
    `;

interface CardTitleProps {
    children: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children }) => {
    return (
        <StyledCardTitle>{children}</StyledCardTitle>
    )
}

export default CardTitle