import React from 'react';
import DashboardLayout from '../templates/DashboardLayout';
import InfoCardsGrid from '../organism/InfoCardsGrid';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <InfoCardsGrid />
      {/* Aquí irán los gráficos y métricas que desarrollaremos después */}
    </DashboardLayout>
  );
};

export default DashboardPage;
