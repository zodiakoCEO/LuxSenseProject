// src/components/atoms/Link.tsx
import { styled } from '@linaria/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to?: string;
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
}

const StyledLink = styled.a<{ color?: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${props => props.color || '#00E5FF'};
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const StyledRouterLink = styled(RouterLink)<{ color?: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${props => props.color || '#00E5FF'};
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export const Link: React.FC<LinkProps> = ({ to, children, color, onClick }) => {
  if (to) {
    return (
      <StyledRouterLink to={to} color={color}>
        {children}
      </StyledRouterLink>
    );
  }

  return (
    <StyledLink as="span" color={color} onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default Link;
