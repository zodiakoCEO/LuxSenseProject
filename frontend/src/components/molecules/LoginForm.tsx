// src/components/molecules/LoginForm.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Input from '../atoms/Input';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';
import Link from '../atoms/Link';

interface LoginFormProps {
  onSubmit: (email: string, password: string, remember: boolean) => void;
  loading?: boolean;
  error?: string;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const RememberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InlineLink = styled.span`
  color: #00e5ff;
  cursor: pointer;
  text-decoration: underline;
`;

const SmallText = styled.p`
  margin: 0;
  margin-top: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #9ca3af;
`;

const BottomText = styled.p`
  margin: 0;
  margin-top: 0.75rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #9ca3af;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;

  button {
    font-size: 1.1rem !important;
    padding: 1rem 2.5rem !important;
    min-height: 56px !important;
    min-width: 180px !important;
    border-radius: 12px !important;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;

    button {
      width: 100%;
    }
  }
`;

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  error,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, remember);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        type="email"
        label="Correo Electrónico"
        placeholder="tu@empresa.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={error}
      />

      <Input
        type="password"
        label="Contraseña"
        placeholder="Tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <RememberRow>
        <Checkbox
          label="Recordarme"
          checked={remember}
          onChange={setRemember}
        />
        <Link to="/forgot-password">¿Olvidaste la contraseña?</Link>
      </RememberRow>

      <SmallText>
        Al iniciar sesión, aceptas nuestros{' '}
        <InlineLink onClick={onOpenTerms}>Términos de Servicio</InlineLink> y{' '}
        <InlineLink onClick={onOpenPrivacy}>Política de Privacidad</InlineLink>.
      </SmallText>

      <ButtonsRow>
        <Button type="submit" gradient={true} disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </ButtonsRow>

      <BottomText>
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </BottomText>
    </FormWrapper>
  );
};

export default LoginForm;
