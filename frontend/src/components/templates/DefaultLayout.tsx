import React from "react";
import styled from "styled-components";
import Navbar from "../organism/Navbar";
import Footer from "../organism/Footer";

const LayoutContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f3f4f6;
    `;

interface DefaultLayoutProps {
    children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <LayoutContainer>
            <Navbar/>
            {children}
            <Footer/>
        </LayoutContainer>
    )
}

export default DefaultLayout