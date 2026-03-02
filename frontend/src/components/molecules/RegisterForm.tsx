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

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, loading, error }) => {
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
          placeholder='Jane'
          required
        />
        <Input
          label="Apellido"
          value={lastName}
          placeholder='Doe'
          onChange={(e) => setLastName(e.target.value)}
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
        <Checkbox
          label={(
            <>
              Aceptar <Link to="/terms">Términos y condiciones</Link> y{' '}
              <Link to="/privacy">Política de privacidad</Link>
            </>
          )}
          checked={acceptTerms}
          onChange={setAcceptTerms}
        />
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
