// src/components/molecules/PrivacyContent.tsx
import React from 'react';
import { styled } from '@linaria/react';
import Text from '../atoms/Text';

const ContentWrapper = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 0.5rem;
`;

const Section = styled.div`
  margin-bottom: 1.75rem;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.75rem;
`;

const PrivacyContent: React.FC = () => {
  return (
    <ContentWrapper>
      <Section>
        <SectionTitle>1. Información que recolectamos</SectionTitle>
        <Text size="0.9rem">
          Recolectamos datos de consumo energético, patrones de uso de iluminación,
          y información de tu cuenta (nombre, email, empresa).
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Cómo usamos tus datos</SectionTitle>
        <Text size="0.9rem">
          Usamos tus datos para:
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Optimizar consumo energético con IA</li>
            <li>Generar reportes y estadísticas</li>
            <li>Mejorar nuestros algoritmos</li>
            <li>Comunicarte sobre tu cuenta</li>
          </ul>
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. Quién tiene acceso</SectionTitle>
        <Text size="0.9rem">
          Solo nosotros y tú tienes acceso a tus datos. No compartimos con terceros
          salvo obligación legal o proveedores de servicios (procesadores de pagos).
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. Seguridad</SectionTitle>
        <Text size="0.9rem">
          Usamos encriptación AES-256 para datos en reposo, TLS 1.3 para datos en tránsito,
          y autenticación JWT para accesos.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. Tus derechos</SectionTitle>
        <Text size="0.9rem">
          Puedes solicitar acceso, rectificación, eliminación de tus datos en cualquier momento.
          Contacta a support@luxsense.com.
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. Cookies</SectionTitle>
        <Text size="0.9rem">
          Usamos cookies funcionales y analíticas. Puedes gestionarlas en la configuración
          de tu navegador.
        </Text>
      </Section>

      <Text size="0.85rem" color="#94a3b8">
        Última actualización: Marzo 2026
      </Text>
    </ContentWrapper>
  );
};

export default PrivacyContent;
