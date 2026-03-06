import { styled } from '@linaria/react';
import React from 'react';
import InfoCard from '../molecules/InfoCard';
import { FaBell, FaExclamationTriangle, FaChartBar, FaDownload } from 'react-icons/fa';

interface AnomalySummary {
  total_readings: number;
  anomalies_detected: number;
  anomaly_rate: number;
  recent_anomalies: any[];
}

interface InfoCardsGridProps {
  anomalySummary: AnomalySummary | null;
  loading: boolean;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const InfoCardsGrid: React.FC<InfoCardsGridProps> = ({ anomalySummary, loading }) => {
  return (
    <GridContainer>
      <InfoCard
        icon={<FaBell />}
        title="Notificaciones"
        description="Tienes 5 notificaciones sin leer"
        accentColor="#00E5FF"
      />
      <InfoCard
        icon={<FaExclamationTriangle />}
        title="Anomalías detectadas"
        description={
          loading
            ? 'Cargando...'
            : anomalySummary
            ? `${anomalySummary.anomalies_detected} anomalías — ${anomalySummary.anomaly_rate}% de tasa`
            : 'Sin datos'
        }
        accentColor="#eeff00"
      />
      <InfoCard
        icon={<FaChartBar />}
        title="Total lecturas"
        description={
          loading
            ? 'Cargando...'
            : anomalySummary
            ? `${anomalySummary.total_readings} lecturas procesadas por IA`
            : 'Sin datos'
        }
        accentColor="#00FF09"
      />
      <InfoCard
        icon={<FaDownload />}
        title="Descargar"
        description="Descargar tu informe en PDF, DOCS..."
        accentColor="#00E5FF"
      />
    </GridContainer>
  );
};

export default InfoCardsGrid;