import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import PasswordInput from '../atoms/PasswordInput';
import LoginButton from '../atoms/LoginButton';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
  box-sizing: border-box;
`;

const Link = styled.a`
  color: #1e293b;
  text-decoration: none;
  font-size: 0.875rem;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert(`Registrando: ${name}, ${email}`); // Placeholder;
  };

  const handleBackToLogin = () => {
    navigate('/login'); 
  };

  return (
    <FormContainer>
      <Input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <Input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} />
      <Input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
      <PasswordInput placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <LoginButton label="Registrarse" onClick={handleSignup} variant="success" />
      <Link onClick={handleBackToLogin}>Volver a Iniciar sesión</Link>
    </FormContainer>
  );
};

export default SignupForm;