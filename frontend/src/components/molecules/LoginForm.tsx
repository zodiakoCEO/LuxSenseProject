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

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
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

      <Button type="submit" gradient={true} disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </FormWrapper>
  );
};

export default LoginForm;
