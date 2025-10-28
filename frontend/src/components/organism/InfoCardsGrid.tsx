import { styled } from '@linaria/react';
import React from 'react';
import InfoCard from '../molecules/InfoCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const InfoCardsGrid: React.FC = () => {
  return (
    <GridContainer>
      <InfoCard 
        icon="🔔"
        title="Notificaciones"
        description="Tienes 5 notificaciones sin leer"
        accentColor="#00E5FF"
      />
      <InfoCard 
        icon="⚠️"
        title="Alertas"
        description="Tienes 2 alertas pendientes por solucionar"
        accentColor="#FF0000"
      />
      <InfoCard 
        icon="📊"
        title="Reportes"
        description="Reportar un problema"
        accentColor="#00FF09"
      />
      <InfoCard 
        icon="⬇️"
        title="Descargar"
        description="Descargar tu informe en PDF, DOCS..."
        accentColor="#00E5FF"
      />
    </GridContainer>
  );
};

export default InfoCardsGrid;
