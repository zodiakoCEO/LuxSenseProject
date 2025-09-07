import React from 'react';
import styled from 'styled-components';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

const WhoWeAreContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  background-color: #f3f4f6;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    max-height: none;
    padding-right: 0;
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-height: 60vh;

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    margin-top: 1rem;
  }
`;

const WhoWeAreSection: React.FC = () => {
  return (
    <WhoWeAreContainer>
      <LeftSection>
        <Title>Quiénes Somos</Title>
        <Text>
          En LuxSense creemos en la tecnología al servicio de las personas y del planeta. Nacimos con una misión clara: optimizar el consumo energético a través de soluciones inteligentes, accesibles y pensadas para el bienestar de todos. <br /><br />
          Sabemos que cada pequeño cambio genera un gran impacto, por eso unimos innovación, sostenibilidad y diseño para transformar la manera en que usamos la energía.<br /><br />
          <strong>Nuestros valores:</strong><br />
          🌎 <em>Compromiso ambiental</em>: Trabajamos cada día por reducir el desperdicio energético y contribuir al cuidado del planeta.<br />
          🤝 <em>Tecnología con propósito</em>: Cada funcionalidad de LuxSense está pensada para mejorar tu entorno, optimizando recursos de forma automatizada y eficiente.<br />
          🚀 <em>Innovación constante</em>: Nos apasiona crear. Estamos en permanente evolución, integrando nuevas tecnologías y escuchando las necesidades de nuestros usuarios.<br />
          🧩 <em>Trabajo colaborativo</em>: Creemos en el poder del trabajo en equipo. Porque el futuro se construye mejor, juntos.
        </Text>
      </LeftSection>
      <RightSection>
        <Image
          src="/assets/IMG/pexels-chengxin-zhao-1218017-15470542.jpg"
          alt="Equipo de LuxSense"
          width="200px"
        />
      </RightSection>
    </WhoWeAreContainer>
  );
};

export default WhoWeAreSection;