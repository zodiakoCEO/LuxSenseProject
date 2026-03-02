// src/components/pages/LoginPage.tsx
import React from 'react';
import AuthLayout from '../templates/AuthLayout';
import LoginBrandingSection from '../organism/LoginBrandingSection';
import LoginFormSection from '../organism/LoginFormSection';
import { Modal } from '../organism/Modal';
import TermsContent from '../molecules/TermsContent';
import PrivacyContent from '../molecules/PrivacyContent';
import { useModal } from '../../hooks/useModal';

const LoginPage: React.FC = () => {
  const termsModal = useModal();
  const privacyModal = useModal();

  return (
    <>
      <AuthLayout
        left={<LoginBrandingSection />}
        right={
          <LoginFormSection
            onOpenTerms={termsModal.openModal}
            onOpenPrivacy={privacyModal.openModal}
          />
        }
      />

      <Modal
        isOpen={termsModal.isOpen}
        onClose={termsModal.closeModal}
        title="Términos de Servicio"
      >
        <TermsContent />
      </Modal>

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

export default LoginPage;
