import { styled } from '@linaria/react';
import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
}

const AvatarImage = styled.img<{ size?: string }>`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00E5FF;
`;

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size }) => {
  return <AvatarImage src={src} alt={alt} size={size} />;
};

export default Avatar;
