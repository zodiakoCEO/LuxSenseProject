// src/components/pages/RegisterPage.tsx
import React from 'react';
import AuthLayout from '../templates/AuthLayout';
import RegisterFormSection from '../organism/RegisterFormSection';
import RegisterBrandingSection from '../organism/RegisterBrandingSection';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      left={<RegisterFormSection />}
      right={<RegisterBrandingSection />}
    />
  );
};

export default RegisterPage;
