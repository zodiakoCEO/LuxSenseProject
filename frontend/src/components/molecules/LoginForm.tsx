import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import PasswordInput from '../atoms/PasswordInput';
import LoginButton from '../atoms/LoginButton';
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = () => {
    alert(`Iniciando sesión con usuario: ${username}`); // Placeholder; conecta con backend más adelante
  };

  const handleSignup = () => {
    navigate('/signup')
  };

  return (
    <FormContainer>
      <Input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <ButtonContainer>
        <LoginButton label="Iniciar sesión" onClick={handleLogin} variant="primary" />
        <LoginButton label="Crear cuenta" onClick={handleSignup} variant="secondary" />
      </ButtonContainer>
    </FormContainer>
  );
};

export default LoginForm;