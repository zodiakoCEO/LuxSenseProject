// src/components/organisms/FaqSection.tsx
import React from 'react';
import { styled } from '@linaria/react';
import FaqItem from '../molecules/FaqItem';
import Button from '../atoms/Button';

const SectionWrapper = styled.section`
  padding: 6rem 2rem 5rem;
  background-color: #020617;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin: 0 0 0.25rem 0;
  color: #ffffff;
`;

const TitleAccent = styled.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  color: #00e5ff;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  text-align: center;
  color: #9ca3af;
  max-width: 600px;
  margin: 0.75rem auto 2.5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const ContactCard = styled.div`
  margin-top: 2rem;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  background-color: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.4);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactTitle = styled.h3`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
`;

const ContactSubtitle = styled.p`
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #9ca3af;
`;

const ContactActions = styled.div`
  margin-top: 0.75rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: '¿Qué tan rápida es la implementación y configuración?',
      a: 'Normalmente podemos tener LuxSense operando en menos de 48 horas, incluyendo la calibración inicial de sensores y la conexión con tus circuitos de iluminación.',
    },
    {
      q: '¿Cómo se integra con nuestros sistemas BMS existentes?',
      a: 'LuxSense expone APIs estándar y puede integrarse con la mayoría de BMS a través de Modbus, BACnet u otras pasarelas habituales en la industria.',
    },
    {
      q: '¿Cuál es el ROI real y cuándo se materializa?',
      a: 'Nuestros clientes ven ahorros de hasta 40 % en iluminación, con un retorno típico entre 6 y 12 meses, dependiendo del tamaño de la instalación y el horario de operación.',
    },
    {
      q: '¿Qué impacto ambiental real podemos esperar?',
      a: 'Al reducir el consumo de energía también reduces emisiones de CO₂. Generamos reportes mensuales con el equivalente en árboles plantados y toneladas de CO₂ evitadas.',
    },
    {
      q: '¿Cómo garantizan la ciberseguridad y la privacidad de los datos?',
      a: 'Encriptamos todos los datos en tránsito y en reposo, seguimos buenas prácticas de seguridad y podemos trabajar con redes segmentadas o VPN según tu política interna.',
    },
    {
      q: '¿Qué nivel de soporte técnico y mantenimiento incluye?',
      a: 'Incluimos monitoreo 24/7, alertas proactivas y soporte técnico por correo, chat y videollamada para acompañarte durante toda la operación.',
    },
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/573002946029', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:luxsense@gmail.com';
  };

  return (
    <SectionWrapper id="faq">
      <Content>
        <Title>Resolvemos</Title>
        <TitleAccent>Tus Dudas</TitleAccent>
        <Subtitle>
          Respuestas expertas a las consultas más comunes sobre nuestra plataforma de IA energética.
        </Subtitle>

        <List>
          {faqs.map((item, idx) => (
            <FaqItem key={idx} question={item.q} answer={item.a} />
          ))}
        </List>

        <ContactCard>
          <ContactTitle>¿Necesitas más información personalizada?</ContactTitle>
          <ContactSubtitle>
            Nuestros expertos están disponibles para una consulta gratuita.
          </ContactSubtitle>
          <ContactActions>
            <Button
              variant="secondary"
              size="small"
              onClick={handleWhatsApp}
            >
              +57 (300) 294-6029
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleEmail}
            >
              luxsense@gmail.com
            </Button>
          </ContactActions>
        </ContactCard>
      </Content>
    </SectionWrapper>
  );
};

export default FaqSection;