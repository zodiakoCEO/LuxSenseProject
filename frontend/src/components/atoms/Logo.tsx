import React from "react";
import { styled } from '@linaria/react';

interface LogoProps {
    fontSize?: string;
}

const LogoText = styled.h1<LogoProps>`
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: ${props => props.fontSize || '4rem'};
    color: #00ff09;
    letter-spacing: -0.02em;
    margin: 0;
    `;

const Logo: React.FC<LogoProps> = ({ fontSize }) => {
    return <LogoText fontSize={fontSize}>LuxSense</LogoText>;
};

export default Logo;