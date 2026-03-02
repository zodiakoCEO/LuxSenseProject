// src/components/atoms/Divider.tsx
import { styled } from '@linaria/react';
import React from 'react';

interface DividerProps {
  text?: string;
}

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: 1.5rem 0;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const DividerText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #CCCCCC;
`;

export const Divider: React.FC<DividerProps> = ({ text }) => {
  if (!text) {
    return <Line />;
  }

  return (
    <DividerWrapper>
      <Line />
      <DividerText>{text}</DividerText>
      <Line />
    </DividerWrapper>
  );
};

export default Divider;
