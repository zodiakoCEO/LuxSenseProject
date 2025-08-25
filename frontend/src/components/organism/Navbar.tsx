import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../atoms/Logo";
import NavLink from "../atoms/NavLink";
import Icon from "../atoms/Icon";

const NavbarContainer = styled.nav`
    background-color: #1e293b;
    padding: 1rem 2rem;
    display: flex;
    border-radius: 1rem;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;

const NavLinks = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    `;

const NavItem = styled.li`
    margin-left: 2rem;
    a {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        &:hover {
            text-decoration: underline;
        }
    }
    `;

const Icons = styled.div`
    display:flex;
    align-items: center;
    gap: 1rem;
    `;

const Navbar: React.FC = () => {
    const navigate = useNavigate()

    const handlogoClick = () => {
        navigate('/')
    }


    return (
        <NavbarContainer>
            <Logo onClick={handlogoClick}>LuxSense</Logo>
            <NavLinks>
                <NavItem><NavLink href="#contacto">Contacto</NavLink></NavItem>
                <NavItem><NavLink href="#quienes-somos">Quienes somos</NavLink></NavItem>
                <NavItem><NavLink href="#como-funciona">¿Cómo funciona?</NavLink></NavItem>
            </NavLinks>
            <Icons>
                <Icon ariaLabel="user">👤</Icon>
                <Icon ariaLabel="moon">🌙</Icon>
            </Icons>
        </NavbarContainer>
    );
};

export default Navbar;