import React from 'react';
import LandingContent from '../organism/LandingContent';
import LandingTemplate from '../templates/LandingTemplate';

const LandingPage: React.FC = () => {
  return (
    <LandingTemplate>
        <LandingContent />
    </LandingTemplate>
      
  );
};

export default LandingPage;