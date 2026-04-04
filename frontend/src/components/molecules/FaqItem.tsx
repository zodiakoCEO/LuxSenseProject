// src/components/molecules/FaqItem.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { FaChevronDown } from 'react-icons/fa';

interface FaqItemProps {
  question: string;
  answer: string;
}

const ItemContainer = styled.div<{ open: boolean }>`
  border-radius: 10px;
  background-color: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.4);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: #00e5ff;
  }
`;

const QuestionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const QuestionText = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.98rem;
  font-weight: 500;
  color: #e5e7eb;
`;

const IconWrapper = styled.div<{ open: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5f5;
  font-size: 0.75rem;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  transform: rotate(${({ open }) => (open ? 180 : 0)}deg);

  ${ItemContainer}:hover & {
    border-color: #00e5ff;
    background-color: rgba(15, 23, 42, 0.9);
  }
`;

const Answer = styled.div<{ open: boolean }>`
  max-height: ${({ open }) => (open ? '400px' : '0')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  transition: max-height 0.25s ease, opacity 0.25s ease;
  margin-top: ${({ open }) => (open ? '0.75rem' : '0')};
`;

const AnswerText = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #9ca3af;
`;

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <ItemContainer open={open} onClick={() => setOpen((v) => !v)}>
      <QuestionRow>
        <QuestionText>{question}</QuestionText>
        <IconWrapper open={open}>
          <FaChevronDown />
        </IconWrapper>
      </QuestionRow>
      <Answer open={open}>
        <AnswerText>{answer}</AnswerText>
      </Answer>
    </ItemContainer>
  );
};

export default FaqItem;