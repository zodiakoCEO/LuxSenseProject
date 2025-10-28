import { styled } from '@linaria/react';
import React from 'react';

interface IconProps {
  name: string;
  size?: string;
  color?: string;
}

const IconWrapper = styled.span<{ size?: string; color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.size || '1.5rem'};
  color: ${props => props.color || '#FFFFFF'};
`;

export const Icon: React.FC<IconProps> = ({ name, size, color }) => {
  // Aquí puedes usar una librería de iconos como react-icons
  return <IconWrapper size={size} color={color}>
    {/* Placeholder - integra con react-icons */}
    <i className={name}></i>
  </IconWrapper>;
};

export default Icon;
