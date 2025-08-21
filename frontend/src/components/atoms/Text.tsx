import React from "react";
import styled from "styled-components";

const StyledText = styled.p`
    color: white;
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
    padding: 0.5rem;
    `;

interface TextProps {
    children:string;
}

const Text: React.FC<TextProps> = ({ children }) => {
    return( 
    <StyledText>{children}</StyledText>
    );
};

export default Text;