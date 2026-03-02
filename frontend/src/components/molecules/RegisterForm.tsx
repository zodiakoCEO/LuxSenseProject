// src/components/molecules/RegisterForm.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Input from '../atoms/Input';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';
import Link from '../atoms/Link';

interface RegisterFormProps {
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
    acceptTips: boolean;
  }) => void;
  loading?: boolean;
  error?: string;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Checkboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

const BottomText = styled.p`
  margin: 0;
  margin-top: 0.75rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #9ca3af;
`;

const InlineLink = styled.span`
  color: #00e5ff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.85;
  }
`;

const SmallText = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #9ca3af;
`;

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading,
  error,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptTips, setAcceptTips] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      acceptTerms,
      acceptTips,
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Row>
        <Input
          label="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Jane"
          required
        />
        <Input
          label="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
          required
        />
      </Row>

      <Input
        type="email"
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="juan@empresa.com"
        required
      />

      <Input
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mínimo 8 caracteres"
        required
        error={error}
      />

      <Input
        type="password"
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Repetir contraseña"
        required
      />

      <Checkboxes>
        {/* Checkbox solo para aceptar términos, sin links dentro */}
        <Checkbox
          label="Aceptar Términos y condiciones y Política de privacidad"
          checked={acceptTerms}
          onChange={setAcceptTerms}
        />

        {/* Texto independiente con links que abren los modales */}
        <SmallText>
          Puedes leer nuestros{' '}
          <InlineLink
            onClick={(e) => {
              e.stopPropagation();
              onOpenTerms();
            }}
          >
            Términos y condiciones
          </InlineLink>{' '}
          y{' '}
          <InlineLink
            onClick={(e) => {
              e.stopPropagation();
              onOpenPrivacy();
            }}
          >
            Política de privacidad
          </InlineLink>
          .
        </SmallText>

        <Checkbox
          label="Quiero recibir tips de ahorro energético por mi email"
          checked={acceptTips}
          onChange={setAcceptTips}
        />
      </Checkboxes>

      <Button type="submit" gradient disabled={loading || !acceptTerms}>
        {loading ? 'Creando cuenta...' : 'Crear cuenta Gratis'}
      </Button>

      <BottomText>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </BottomText>
    </FormWrapper>
  );
};

export default RegisterForm;
