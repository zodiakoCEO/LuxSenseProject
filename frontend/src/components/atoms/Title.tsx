import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
    color: #000000;
    font-size: 2.25rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    `;

interface TitleProps {
    children: string;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <StyledTitle>{children}</StyledTitle>
    )
}

export default Title