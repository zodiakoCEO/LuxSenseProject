import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    if (token && name && email) {
      saveSession(
    {  nombre: name, email: email, id_usuario: 0, id_rol: 2 },
        token
    );
      navigate('/Dashboard');
    } else {
      navigate('/Login?error=google_failed');
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.1rem',
      gap: '1rem'
    }}>
      <span style={{ fontSize: '1.5rem' }}>⚡</span>
      Autenticando con Google...
    </div>
  );
};

export default AuthCallbackPage;