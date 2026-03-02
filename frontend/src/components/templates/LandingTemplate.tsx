// src/components/templates/LandingTemplate.tsx
import React from 'react';
import { styled } from '@linaria/react';
import HeroSection from '../organism/Herosection';
import FeaturesSection from '../organism/FeaturesSection';
import StatsSection from '../organism/StatsSection';
import TestimonialsSection from '../organism/TestimonialsSection';
import CTASection from '../organism/CTASection';
import FooterSection from '../organism/FooterSection';

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #020617;
  color: #ffffff;
  overflow-x: hidden;
`;

const LandingTemplate: React.FC = () => {
  return (
    <Page>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </Page>
  );
};

export default LandingTemplate;
