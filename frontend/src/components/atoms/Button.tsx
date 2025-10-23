import { styled } from '@linaria/react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => 
    props.variant === 'secondary' ? '#00FF09' : '#00E5FF'};
  color: ${props => 
    props.variant === 'secondary' ? '#000000' : '#000000'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 229, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default Button;