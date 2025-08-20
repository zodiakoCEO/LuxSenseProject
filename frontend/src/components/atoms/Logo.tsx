import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    `;

    interface LogoProps {
        children: string;
    }

    const Logo: React.FC<LogoProps> = ({ children }) => {
        return <StyledLogo>{children}</StyledLogo>
    };

    export default Logo