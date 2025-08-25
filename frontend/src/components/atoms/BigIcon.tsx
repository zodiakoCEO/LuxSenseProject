import React from 'react';
import styled from 'styled-components';

const StyledBigIcon = styled.span`
  color: #000000;
  font-size: 6rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

interface BigIconProps {
  children: React.ReactNode;
  ariaLabel: string;
}

const BigIcon: React.FC<BigIconProps> = ({ children, ariaLabel }) => {
  return (
    <StyledBigIcon role="img" aria-label={ariaLabel}>
      {children}
    </StyledBigIcon>
  );
};

export default BigIcon;