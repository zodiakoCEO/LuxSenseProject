// src/components/molecules/BenefitsList.tsx
import React from 'react';
import { styled } from '@linaria/react';
import Text from '../atoms/Text';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SectionTitle = styled(Text)`
  font-weight: 600;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const ItemTitle = styled(Text)`
  font-weight: 600;
`;

const ItemDescription = styled(Text)`
  color: #9ca3af;
`;

const BenefitsList: React.FC = () => {
  return (
    <Wrapper>
      <SectionTitle as="p" size="1rem" color="#ffffff">
        ¿Por qué elegir LuxSense?
      </SectionTitle>

      <Item>
        <ItemTitle as="p" size="0.95rem" color="#ffffff">
          Ahorro inmediato
        </ItemTitle>
        <ItemDescription as="p" size="0.9rem">
          Reduce hasta 40% en costos de iluminación.
        </ItemDescription>
      </Item>

      <Item>
        <ItemTitle as="p" size="0.95rem" color="#ffffff">
          IA Predictiva
        </ItemTitle>
        <ItemDescription as="p" size="0.9rem">
          Algoritmos que aprenden de tus patrones de uso.
        </ItemDescription>
      </Item>

      <Item>
        <ItemTitle as="p" size="0.95rem" color="#ffffff">
          Instalación simple
        </ItemTitle>
        <ItemDescription as="p" size="0.9rem">
          Setup en menos de 48 horas.
        </ItemDescription>
      </Item>

      <Item>
        <ItemTitle as="p" size="0.95rem" color="#ffffff">
          Soporte 24/7
        </ItemTitle>
        <ItemDescription as="p" size="0.9rem">
          Asistencia técnica especializada siempre disponible.
        </ItemDescription>
      </Item>
    </Wrapper>
  );
};

export default BenefitsList;
