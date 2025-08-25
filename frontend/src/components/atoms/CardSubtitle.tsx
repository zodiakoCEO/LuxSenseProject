import React from "react";
import styled from "styled-components";

const StyledCardSubtitle = styled.p`
    color: darkgray;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    `;

interface CardSubtitleProps {
    children: string;
}

const CardSubtitle: React.FC<CardSubtitleProps> = ({ children }) => {
    return (
        <StyledCardSubtitle>{children}</StyledCardSubtitle>
    )
}

export default CardSubtitle