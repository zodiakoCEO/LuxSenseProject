import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    `;

interface LogoProps {
  children: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ children, onClick }) => {
  return <StyledLogo onClick={onClick}>{children}</StyledLogo>;
};

export default Logo;