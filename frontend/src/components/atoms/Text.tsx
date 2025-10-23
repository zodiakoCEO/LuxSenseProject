import { styled } from '@linaria/react';

interface TextProps {
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  size?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const Text = styled.p<TextProps>`
  font-family: 'Inter', sans-serif;
  font-weight: ${props => fontWeights[props.weight || 'regular']};
  font-size: ${props => props.size || '1rem'};
  color: ${props => props.color || '#FFFFFF'};
  text-align: ${props => props.align || 'left'};
  line-height: 1.6;
  margin: 0;
`;

export default Text;