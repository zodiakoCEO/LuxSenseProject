// src/components/pages/LoginPage.tsx
import React from 'react';
import AuthLayout from '../templates/AuthLayout';
import LoginBrandingSection from '../organism/LoginBrandingSection';
import LoginFormSection from '../organism/LoginFormSection';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      left={<LoginBrandingSection />}
      right={<LoginFormSection />}
    />
  );
};

export default LoginPage;
