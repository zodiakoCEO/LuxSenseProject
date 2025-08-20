import React from "react";
import styled from "styled-components";

const StyledNavLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1rem;
    &:hover {
        text-decoration: underline
        }
    `;

interface NavLinkProps {
    href: string;
    children: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children}) => {
    return <StyledNavLink href={href}>{children}</StyledNavLink>
}

export default NavLink;