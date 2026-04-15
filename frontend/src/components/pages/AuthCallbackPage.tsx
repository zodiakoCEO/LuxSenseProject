import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const token  = searchParams.get('token');
    const name   = searchParams.get('name');
    const email  = searchParams.get('email');
    const id     = searchParams.get('id');
    const role   = searchParams.get('role');
    const avatar = searchParams.get('avatar');
    const error  = searchParams.get('error');

    if (error) {
      setErrorMsg('Error al autenticar con Google. Redirigiendo...');
      setTimeout(() => navigate('/Login?error=google_failed'), 2000);
      return;
    }

    if (token && name && email) {
      saveSession(
        {
          id_usuario: id   ? parseInt(id, 10) : 0,
          nombre:     name,
          email,
          id_rol:     role ? parseInt(role, 10) : 2,
          avatar_url: avatar ?? undefined,
        },
        token
      );
      navigate('/Dashboard', { replace: true });
    } else {
      setErrorMsg('Datos de sesión incompletos. Redirigiendo...');
      setTimeout(() => navigate('/Login?error=google_failed'), 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.1rem',
      gap: '1rem'
    }}>
      {errorMsg ? (
        <>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <span style={{ color: '#ff6b6b' }}>{errorMsg}</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: '1.5rem', animation: 'spin 1s linear infinite' }}>⚡</span>
          <span>Autenticando con Google...</span>
        </>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthCallbackPage;