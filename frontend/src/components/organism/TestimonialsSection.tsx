// src/components/organisms/TestimonialsSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import { FaQuoteLeft } from 'react-icons/fa';

const Container = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #ffffff;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #9ca3af;
  margin: 0 0 4rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(0, 255, 9, 0.1);
  }
`;

const QuoteIcon = styled.div`
  font-size: 2rem;
  color: #00ff09;
  opacity: 0.3;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #e2e8f0;
  margin: 0 0 1.5rem 0;
  font-style: italic;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff09, #00e5ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AuthorName = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #ffffff;
`;

const AuthorRole = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #9ca3af;
`;

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      text: 'En solo 3 meses recuperamos la inversión. El ahorro en nuestra factura de luz ha sido impresionante y el equipo técnico siempre disponible.',
      author: 'Carlos Mendoza',
      role: 'CEO, TechCorp',
      initial: 'C',
    },
    {
      text: 'La instalación fue tan rápida que ni nos dimos cuenta. Ahora tenemos control total de nuestro consumo energético en tiempo real.',
      author: 'Ana Rodríguez',
      role: 'Gerente de Operaciones, RetailPlus',
      initial: 'A',
    },
    {
      text: 'LuxSense nos permitió cumplir nuestras metas de sostenibilidad sin comprometer la productividad. Una inversión que vale cada peso.',
      author: 'Miguel Ángel Torres',
      role: 'Director de Sostenibilidad, EcoFactory',
      initial: 'M',
    },
  ];

  return (
    <Container>
      <SectionTitle>Lo que dicen nuestros clientes</SectionTitle>
      <SectionSubtitle>
        Más de 500 empresas confían en LuxSense para reducir sus costos energéticos
      </SectionSubtitle>

      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <QuoteIcon>
              <FaQuoteLeft />
            </QuoteIcon>
            <TestimonialText>"{testimonial.text}"</TestimonialText>
            <Author>
              <AuthorAvatar>{testimonial.initial}</AuthorAvatar>
              <AuthorInfo>
                <AuthorName>{testimonial.author}</AuthorName>
                <AuthorRole>{testimonial.role}</AuthorRole>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </Container>
  );
};

export default TestimonialsSection;
