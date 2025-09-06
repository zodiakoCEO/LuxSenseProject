import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import PasswordInput from '../atoms/PasswordInput';
import LoginButton from '../atoms/LoginButton';
import { useNavigate } from "react-router-dom";
import Alert from './Alert';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  box-sizing: border-box;
  position: relative;
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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMesage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' > ('success')
  const navigate = useNavigate()

  const handleLogin = () => {
   if (!username || !password) {
    setAlertType('error')
    setAlertMesage ('Por favor, completa todos lo campos.')
    setIsAlertOpen(true)
    return
   }
   setAlertType('success')
   setAlertMesage(`Iniciando sesión con usuario: ${username}`)
   setIsAlertOpen(true)
   //placeHolder
  };

  const handleSignup = () => {
    setAlertType('warning')
    setAlertMesage('Redirigiendo a crear cuenta.')
    setIsAlertOpen(true)
    navigate('/signup')
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false)
  }

  return (
    <FormContainer>
      <Input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <ButtonContainer>
        <LoginButton label="Iniciar sesión" onClick={handleLogin} variant="primary" />
        <LoginButton label="Crear cuenta" onClick={handleSignup} variant="secondary" />
      </ButtonContainer>
        <Alert
          message={alertMessage}
          type={alertType}
          duration={3000}
          onClose={handleAlertClose}
          isOpen={isAlertOpen}
        />
    </FormContainer>
  );
};

export default LoginForm;