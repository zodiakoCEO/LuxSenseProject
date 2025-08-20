import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.span`
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

interface IconProps {
  children: React.ReactNode;
  ariaLabel: string;
}

const Icon: React.FC<IconProps> = ({ children, ariaLabel }) => {
  return (
    <StyledIcon role="img" aria-label={ariaLabel}>
      {children}
    </StyledIcon>
  );
};

export default Icon;