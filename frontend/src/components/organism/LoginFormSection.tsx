// src/components/organisms/LoginFormSection.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import LoginForm from '../molecules/LoginForm';
import SocialButtons from '../molecules/SocialButtons';
import Divider from '../atoms/Divider';
import Link from '../atoms/Link';
import { useNavigate } from 'react-router-dom';

const Panel = styled.section`
  width: 440px;
  max-width: 100%;
  background-color: #101727;
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
    background: linear-gradient(90deg, #EA3BE7 0%, #E874E6 100%);
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

const FooterText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0;
  text-align: center;
`;

const LegalText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  text-align: center;
`;

const LinksInline = styled.span`
  display: inline-flex;
  gap: 0.25rem;
`;

const LoginFormSection: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null); // cuando conectes backend, aquí manejas mensajes

  const handleLogin = async (_email: string, _password: string, _remember: boolean) => {
    setLoading(true);
    try {
      // TODO: integrar llamada real a backend (login)
      // const { token } = await AuthService.login(email, password);
      // localStorage.setItem('token', token);
      // if (remember) también puedes persistir más info

      // Por ahora, para la demo:
      navigate('/Dashboard');
    } catch (e) {
      // setError('Credenciales inválidas'); // ejemplo
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    // TODO: integrar OAuth si algún día quieres, por ahora solo demo
    console.log('Login con Google no implementado aún');
  };

  const handleFacebookClick = () => {
    console.log('Login con Facebook no implementado aún');
  };

  return (
    <Panel>
      <div>
        <Title>
          Inicia <span>Sesión</span>
        </Title>
        <Subtitle>
          Accede a tu dashboard de control de iluminación inteligente.
        </Subtitle>
      </div>

      <LoginForm onSubmit={handleLogin} loading={loading} error={error || undefined} />

      <Divider text="O continúa con" />

      <SocialButtons
        onGoogleClick={handleGoogleClick}
        onFacebookClick={handleFacebookClick}
      />

      <FooterText>
        ¿No tienes una cuenta?{' '}
        <Link to="/register">Regístrate aquí</Link>
      </FooterText>

      <LegalText>
        Al iniciar sesión, aceptas nuestros{' '}
        <LinksInline>
          <Link to="/terms">Términos de Servicio</Link>
          <span>y</span>
          <Link to="/privacy">Política de Privacidad</Link>
        </LinksInline>
      </LegalText>
    </Panel>
  );
};

export default LoginFormSection;
