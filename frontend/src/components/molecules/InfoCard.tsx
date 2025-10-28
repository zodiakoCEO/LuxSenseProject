import { styled } from '@linaria/react';
import React from 'react';
import Text from '../atoms/Text';

interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
}

const CardContainer = styled.div<{ accentColor?: string }>`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid ${props => props.accentColor || '#00E5FF'};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconWrapper = styled.span<{ accentColor?: string }>`
  font-size: 1.5rem;
  color: ${props => props.accentColor || '#00E5FF'};
`;

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, accentColor }) => {
  return (
    <CardContainer accentColor={accentColor}>
      <CardHeader>
        <IconWrapper accentColor={accentColor}>{icon}</IconWrapper>
        <Text size="1.1rem" weight="semibold">{title}</Text>
      </CardHeader>
      <Text size="0.9rem" color="#CCCCCC">{description}</Text>
    </CardContainer>
  );
};

export default InfoCard;
