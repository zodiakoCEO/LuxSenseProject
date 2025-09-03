import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.span`
  color: #000000;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

interface IconProps {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ children, ariaLabel, onClick }) => {
  return (
    <StyledIcon onClick={onClick} role="img" aria-label={ariaLabel}>
      {children}
    </StyledIcon>
  );
};

export default Icon;