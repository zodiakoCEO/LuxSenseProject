// src/components/molecules/TermsContent.tsx
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

const TermsContent: React.FC = () => {
  return (
    <ContentWrapper>
      <Section>
        <SectionTitle>1. Términos Generales</SectionTitle>
        <Text size="0.9rem">
          Al usar LuxSense aceptas estos términos. Si no estás de acuerdo, no uses el servicio.
          LuxSense es una plataforma SaaS para optimización de iluminación con IA.
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Registro y Acceso</SectionTitle>
        <Text size="0.9rem">
          Debes proporcionar información precisa durante el registro. Eres responsable
          de mantener la seguridad de tu cuenta. Notifica inmediatamente cualquier uso
          no autorizado.
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. Uso del Servicio</SectionTitle>
        <Text size="0.9rem">
          Puedes usar LuxSense solo para fines legítimos. No estás autorizado para:
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Acceso no autorizado o hacking</li>
            <li>Distribución masiva de spam</li>
            <li>Actividades ilegales</li>
          </ul>
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. Pagos y Suscripciones</SectionTitle>
        <Text size="0.9rem">
          Las suscripciones se renuevan automáticamente. Puedes cancelar en cualquier momento.
          No hay reembolsos por periodos parciales.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. Datos y Privacidad</SectionTitle>
        <Text size="0.9rem">
          Consulta nuestra Política de Privacidad para detalles sobre cómo manejamos tus datos.
          LuxSense procesa datos de consumo energético para optimización.
        </Text>
      </Section>

      <Section>
        <SectionTitle>6. Limitación de Responsabilidad</SectionTitle>
        <Text size="0.9rem">
          LuxSense no garantiza disponibilidad 100%. No nos hacemos responsables por pérdidas
          indirectas o daños especiales.
        </Text>
      </Section>

      <Section>
        <SectionTitle>7. Terminación</SectionTitle>
        <Text size="0.9rem">
          Podemos suspender o terminar tu acceso por violación de términos. Tú puedes
          cancelar tu suscripción en cualquier momento.
        </Text>
      </Section>

      <Section>
        <SectionTitle>8. Ley Aplicable</SectionTitle>
        <Text size="0.9rem">
          Estos términos se rigen por las leyes de Colombia. Cualquier disputa se resolverá
          en los tribunales de Bogotá, Colombia.
        </Text>
      </Section>

      <Text size="0.85rem" color="#94a3b8">
        Última actualización: Marzo 2026
      </Text>
    </ContentWrapper>
  );
};

export default TermsContent;
