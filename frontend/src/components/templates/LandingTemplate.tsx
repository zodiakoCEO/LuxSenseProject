// src/components/templates/LandingTemplate.tsx
import React from 'react';
import { styled } from '@linaria/react';
import HeroSection from '../organism/Herosection';
import FeaturesSection from '../organism/FeaturesSection';
import StatsSection from '../organism/StatsSection';
import TestimonialsSection from '../organism/TestimonialsSection';
import CTASection from '../organism/CTASection';
import FooterSection from '../organism/FooterSection';
import LandingNavbar from '../organism/LandingNavbar';

const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #020617;
  color: #ffffff;
  overflow-x: hidden;
`;

const Sections = styled.main`
  padding-top: 80px; /* misma altura del navbar */
`;

const SectionWrapper = styled.section`
  scroll-margin-top: 88px; /* para scrollIntoView con navbar fijo */
`;

const LandingTemplate: React.FC = () => {
  return (
    <Page>
      <LandingNavbar />
      <Sections>
        <SectionWrapper id="inicio">
          <HeroSection />
        </SectionWrapper>

        <SectionWrapper id="tecnologia">
          <FeaturesSection />
        </SectionWrapper>

        <SectionWrapper id="sostenibilidad">
          <StatsSection />
        </SectionWrapper>

        <SectionWrapper id="casos-exito">
          <TestimonialsSection />
        </SectionWrapper>

        <SectionWrapper id="faq">
          {/* Aquí podrías tener tu sección de FAQ / acordeones */}
          <CTASection />
        </SectionWrapper>

        <FooterSection />
      </Sections>
    </Page>
  );
};

export default LandingTemplate;