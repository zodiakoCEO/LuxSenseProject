// src/components/molecules/TestimonialCard.tsx
import React from 'react';
import { styled } from '@linaria/react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const CardWrapper = styled.div`
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Quote = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #FFFFFF;
  margin: 0 0 1.5rem 0;
`;

const AuthorName = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFFFFF;
  margin: 0;
`;

const AuthorRole = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #CCCCCC;
  margin: 0.25rem 0 0 0;
`;

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <CardWrapper>
      <Quote>"{quote}"</Quote>
      <AuthorName>{author}</AuthorName>
      <AuthorRole>{role}</AuthorRole>
    </CardWrapper>
  );
};

export default TestimonialCard;
