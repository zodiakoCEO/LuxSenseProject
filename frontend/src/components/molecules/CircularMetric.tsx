import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { styled } from '@linaria/react';

interface CircularMetricProps {
  title: string;
  value: number;
  unit: string;
  color: string;
  percentage: number;
}

const MetricContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MetricTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: #FFFFFF;
  margin: 0;
`;

const ProgressWrapper = styled.div`
  width: 150px;
  height: 150px;
`;

const MetricInfo = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #CCCCCC;
  margin: 0;
  
  span {
    font-weight: 600;
  }
`;

const CircularMetric: React.FC<CircularMetricProps> = ({ title, value, unit, color, percentage }) => {
  return (
    <MetricContainer>
      <MetricTitle>{title}</MetricTitle>
      <ProgressWrapper>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0,
            strokeLinecap: 'round',
            textSize: '1.2rem',
            pathTransitionDuration: 0.5,
            pathColor: color,
            textColor: '#FFFFFF',
            trailColor: 'rgba(255, 255, 255, 0.1)',
          })}
        />
      </ProgressWrapper>
      <MetricInfo>
        Este mes se han consumido <span>{value} {unit}</span>
      </MetricInfo>
    </MetricContainer>
  );
};

export default CircularMetric;