// src/components/atoms/Logo.tsx
import React from 'react';
import { styled } from '@linaria/react';

interface LogoProps {
  fontSize?: string;
  gradient?: boolean;
  onClick?: () => void;
}

const LogoTextGradient = styled.h1<{ 
  fontSize?: string; 
  clickable?: boolean 
}>`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: ${(props) => props.fontSize || '4rem'};
  letter-spacing: -0.02em;
  margin: 0;
  background: linear-gradient(90deg, #00ff09 0%, #00e5ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.clickable ? '0.85' : '1')};
  }
`;

const LogoTextSolid = styled.h1<{ 
  fontSize?: string; 
  clickable?: boolean 
}>`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: ${(props) => props.fontSize || '4rem'};
  letter-spacing: -0.02em;
  margin: 0;
  color: #00ff09;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.clickable ? '0.85' : '1')};
  }
`;

const Logo: React.FC<LogoProps> = ({ fontSize, gradient = true, onClick }) => {
  const clickable = !!onClick;

  return gradient ? (
    <LogoTextGradient 
      fontSize={fontSize} 
      clickable={clickable} 
      onClick={onClick}
    >
      DataSense
    </LogoTextGradient>
  ) : (
    <LogoTextSolid 
      fontSize={fontSize} 
      clickable={clickable} 
      onClick={onClick}
    >
      DataSense
    </LogoTextSolid>
  );
};

export default Logo;
