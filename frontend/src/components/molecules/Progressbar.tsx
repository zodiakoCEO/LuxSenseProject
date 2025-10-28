import React from 'react';
import { styled } from '@linaria/react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color: string;
}

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #CCCCCC;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LabelIcon = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const Percentage = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #FFFFFF;
`;

const BarTrack = styled.div`
  width: 100%;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
`;

const BarFill = styled.div<{ percentage: number; color: string }>`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.color};
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, color }) => {
  return (
    <BarContainer>
      <BarLabel>
        <LabelText>
          <LabelIcon color={color} />
          {label}
        </LabelText>
        <Percentage>{percentage}%</Percentage>
      </BarLabel>
      <BarTrack>
        <BarFill percentage={percentage} color={color} />
      </BarTrack>
    </BarContainer>
  );
};

export default ProgressBar;