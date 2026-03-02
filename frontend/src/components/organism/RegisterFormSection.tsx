// src/components/organisms/RegisterFormSection.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Text from '../atoms/Text';
import RegisterForm from '../molecules/RegisterForm';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptTips: boolean;
}

interface RegisterFormSectionProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

const Panel = styled.section`
  width: 460px;
  max-width: 100%;
  background-color: #020617;
  border-radius: 16px;
  padding: 2.5rem 2.75rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;

  span {
    color: #00ff09;
  }
`;

const Subtitle = styled(Text)`
  max-width: 320px;
`;

const RegisterFormSection: React.FC<RegisterFormSectionProps> = ({
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    try {
      console.log('Registro:', data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel>
      <div>
        <Title>
          Crear <span>Cuenta</span>
        </Title>
        <Subtitle size="0.9rem" color="#9ca3af">
          Únete a más de 500 empresas que ahorran energía con LuxSense.
        </Subtitle>
      </div>

      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
        error={error || undefined}
        onOpenTerms={onOpenTerms}
        onOpenPrivacy={onOpenPrivacy}
      />
    </Panel>
  );
};

export default RegisterFormSection;
