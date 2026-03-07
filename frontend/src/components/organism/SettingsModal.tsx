// src/components/organisms/SettingsModal.tsx
import React, { useState } from 'react';
import { styled } from '@linaria/react';
import Modal from '../organism/Modal';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Toggle from '../atoms/Toggle';
import Button from '../atoms/Button';
import { FaBell, FaMoon, FaLanguage, FaUser } from 'react-icons/fa';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContentStyled = styled.div`
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const SettingLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #e2e8f0;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('es');
  const [profileName, setProfileName] = useState('Juan Pérez');

  const handleSave = () => {
    // TODO: Guardar en localStorage o API
    console.log('Ajustes guardados:', { theme, notifications, language, profileName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajustes">
      <ModalContentStyled>
        {/* Perfil */}
        <Section>
          <SectionTitle>
            <FaUser />
            Perfil
          </SectionTitle>
          <SettingRow>
            <SettingLabel>Nombre:</SettingLabel>
            <Input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Tu nombre"
              style={{ width: '200px' }}
            />
          </SettingRow>
        </Section>

        {/* Notificaciones */}
        <Section>
          <SectionTitle>
            <FaBell />
            Notificaciones
          </SectionTitle>
          <SettingRow>
            <SettingLabel>Email de reportes semanales</SettingLabel>
            <Toggle
              checked={notifications}
              onChange={setNotifications}
            />
          </SettingRow>
        </Section>

        {/* Apariencia */}
        <Section>
          <SectionTitle>
            <FaMoon />
            Apariencia
          </SectionTitle>
          <SettingRow>
            <SettingLabel>Modo oscuro</SettingLabel>
            <Toggle
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </SettingRow>
        </Section>

        {/* Idioma */}
        <Section>
          <SectionTitle>
            <FaLanguage />
            Idioma
          </SectionTitle>
          <SettingRow>
            <SettingLabel>Idioma de la interfaz</SettingLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              style={{ width: '120px' }}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </Select>
          </SettingRow>
        </Section>

        <ButtonsRow>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button gradient onClick={handleSave}>
            Guardar cambios
          </Button>
        </ButtonsRow>
      </ModalContentStyled>
    </Modal>
  );
};

export default SettingsModal;
