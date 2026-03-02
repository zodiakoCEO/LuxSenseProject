// src/components/pages/RegisterPage.tsx
import React from 'react';
import AuthLayout from '../templates/AuthLayout';
import RegisterFormSection from '../organism/RegisterFormSection';
import RegisterBrandingSection from '../organism/RegisterBrandingSection';
import { Modal } from '../organism/Modal';
import TermsContent from '../molecules/TermsContent';
import PrivacyContent from '../molecules/PrivacyContent';
import { useModal } from '../../hooks/useModal';

const RegisterPage: React.FC = () => {
  const termsModal = useModal();
  const privacyModal = useModal();

  return (
    <>
      <AuthLayout
        left={
        <RegisterFormSection 
        onOpenTerms={termsModal.openModal}
        onOpenPrivacy={privacyModal.openModal}
        />}
        right={<RegisterBrandingSection />}
      />

      {/* Modal de Términos */}
      <Modal
        isOpen={termsModal.isOpen}
        onClose={termsModal.closeModal}
        title="Términos de Servicio"
      >
        <TermsContent />
      </Modal>

      {/* Modal de Política */}
      <Modal
        isOpen={privacyModal.isOpen}
        onClose={privacyModal.closeModal}
        title="Política de Privacidad"
      >
        <PrivacyContent />
      </Modal>
    </>
  );
};

export default RegisterPage;
