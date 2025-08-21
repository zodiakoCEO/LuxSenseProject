import React from "react";
import styled from "styled-components";
import Text from "../atoms/Text";

const FooterContainer = styled.footer`
    background-color: #1e293b;
    padding: 1rem 2rem;
    text-align: center;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
    `;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Text>
                © 2025 LuxSense. Todos los derechos reservados. Prohibida su reproducción total o parcial sin autorización expresa.
            </Text>
        </FooterContainer>
    );
};

export default Footer;