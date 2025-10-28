import React from "react";
import { styled } from '@linaria/react';

interface LogoProps {
    fontSize?: string;
    gradient?: boolean;
}

const LogoTextGradient = styled.h1<{ fontSize?: string }>`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: ${props => props.fontSize || '4rem'};
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(90deg, #00FF09 0%, #00E5FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const LogoTextSolid = styled.h1<{ fontSize?: string }>`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: ${props => props.fontSize || '4rem'};
  letter-spacing: -0.02em;
  margin: 0;
  color: #00FF09;
`;

const Logo: React.FC<LogoProps> = ({ fontSize, gradient = true }) => {
    return gradient? (
        <LogoTextGradient fontSize={fontSize}>LuxSense</LogoTextGradient>
    ) : (
        <LogoTextSolid fontSize={fontSize}>LuxSense</LogoTextSolid>
    );
};

export default Logo;