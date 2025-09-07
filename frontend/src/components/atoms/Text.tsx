import React from "react";
import styled from "styled-components";

const StyledText = styled.p`
    color: black;
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
    line-height: 1.5;
    padding: 0.5rem;
    `;

interface TextProps {
    children:React.ReactNode;
}

const Text: React.FC<TextProps> = ({ children }) => {
    return( 
    <StyledText>{children}</StyledText>
    );
};

export default Text;