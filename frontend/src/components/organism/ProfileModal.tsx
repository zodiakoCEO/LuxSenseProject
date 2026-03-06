import React, { useState, useRef } from 'react';
import { styled } from '@linaria/react';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';

// ==================== ESTILOS ====================

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Modal = styled.div`
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 130px;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  border-radius: 20px 20px 0 0;
  position: relative;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  bottom: -44px;
  left: 1.75rem;
`;

const AvatarCircle = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 3px solid #0f172a;
  background: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: opacity 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover { opacity: 0.85; }
`;

const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const AvatarOverlayText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  border: none;
  color: #ffffff;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;

  &:hover { background: rgba(0, 0, 0, 0.65); }
`;

const Content = styled.div`
  padding: 3.25rem 1.75rem 1.75rem;
`;

const UserName = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.01em;
`;

const UserEmail = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #64748b;
  margin: 0 0 1.25rem 0;
`;

const RoleBadge = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(100, 116, 139, 0.15);
  color: #94a3b8;
  border: 1px solid rgba(100, 116, 139, 0.2);
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 1.25rem 0;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 0.875rem 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.875rem;
`;

const FormLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
`;

const FormInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 0.7rem 1rem;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus { border-color: rgba(0, 229, 255, 0.35); }
  &::placeholder { color: #2d3f55; }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  border: 2px solid rgba(0, 255, 9, 0.4);
  border-radius: 10px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.25rem;
  transition: all 0.25s;
  box-shadow: 0 0 12px rgba(0, 255, 9, 0.1);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00ff09, #00e5ff);
    border-color: transparent;
    color: #000000;
    box-shadow: 0 0 35px rgba(0, 255, 9, 0.5), 0 8px 25px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }

  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 10px;
  color: #ef4444;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.25s;

  &:hover {
    background: rgba(239, 68, 68, 0.07);
    border-color: rgba(239, 68, 68, 0.4);
  }
`;

const SuccessMsg = styled.div`
  background: rgba(0, 255, 9, 0.06);
  border: 1px solid rgba(0, 255, 9, 0.18);
  border-radius: 8px;
  padding: 0.65rem 1rem;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #00ff09;
`;

const ErrorMsg = styled.div`
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.18);
  border-radius: 8px;
  padding: 0.65rem 1rem;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #ef4444;
`;

// ==================== COMPONENTE ====================

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const { user, saveSession, token, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const res = await apiService.updateProfile({
        nombre,
        email,
        avatar_url: avatarPreview || undefined
      });
      if (res.success) {
        saveSession({
          ...user!,
          nombre,
          email,
          avatar_url: avatarPreview || user?.avatar_url
        }, token!);
        setSuccessMsg('Perfil actualizado correctamente');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch {
      setErrorMsg('Error al actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const initials = user?.nombre
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CoverPhoto>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
          <AvatarWrapper>
            <AvatarCircle
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" />
                : <span style={{ color: '#94a3b8', fontFamily: 'Inter', fontWeight: 700, fontSize: '1.1rem' }}>{initials}</span>
              }
              {hovering && (
                <AvatarOverlay>
                  <span style={{ fontSize: '1rem' }}>📷</span>
                  <AvatarOverlayText>Cambiar</AvatarOverlayText>
                </AvatarOverlay>
              )}
            </AvatarCircle>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </AvatarWrapper>
        </CoverPhoto>

        <Content>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <UserName>{user?.nombre}</UserName>
              <UserEmail>{user?.email}</UserEmail>
            </div>
            <RoleBadge>{user?.id_rol === 1 ? 'Administrador' : 'Usuario'}</RoleBadge>
          </div>

          <Divider />

          <SectionTitle>Editar información</SectionTitle>

          {successMsg && <SuccessMsg> {successMsg}</SuccessMsg>}
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

          <FormGroup>
            <FormLabel>Nombre completo</FormLabel>
            <FormInput
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Correo electrónico</FormLabel>
            <FormInput
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              type="email"
            />
          </FormGroup>

          <SaveButton onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </SaveButton>

          <Divider />

          <SectionTitle>Sesión</SectionTitle>
          <LogoutButton onClick={handleLogout}>
            Cerrar sesión
          </LogoutButton>
        </Content>
      </Modal>
    </Overlay>
  );
};

export default ProfileModal;