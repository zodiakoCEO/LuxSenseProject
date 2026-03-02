// src/components/organisms/LoginFormSection.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import LoginForm from '../molecules/LoginForm';

interface LoginFormSectionProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

const Panel = styled.section`
  width: 440px;
  max-width: 100%;
  background-color: #020617;
  border-radius: 16px;
  padding: 2.5rem 2.75rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.25rem 0;

  span {
    background: linear-gradient(90deg, #00ff09 0%, #ff00ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #9ca3af;
  margin: 0;
`;

const LoginFormSection: React.FC<LoginFormSectionProps> = ({
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    setLoading(true);
    try {
      console.log('Login:', { email, password, remember });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Panel>
      <div>
        <Title>
          Inicia <span>Sesión</span>
        </Title>
        <Subtitle>Accede a tu dashboard de control de iluminación inteligente.</Subtitle>
      </div>

      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error || undefined}
        onOpenTerms={onOpenTerms}
        onOpenPrivacy={onOpenPrivacy}
      />
    </Panel>
  );
};

export default LoginFormSection;
