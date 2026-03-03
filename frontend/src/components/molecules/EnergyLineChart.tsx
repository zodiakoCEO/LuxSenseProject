import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { styled } from '@linaria/react';

interface ForecastPoint {
  hour: number;
  consumption_kwh: number;
}

interface EnergyLineChartProps {
  forecast?: ForecastPoint[];
  loading?: boolean;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChartTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  color: #FFFFFF;
  margin: 0;
`;

const ChartSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #CCCCCC;
  margin: 0;
  span {
    color: #AE00A2;
    font-weight: 600;
  }
`;

const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 5rem;
`;

const EnergyLineChart: React.FC<EnergyLineChartProps> = ({ forecast = [], loading = false }) => {
  const chartData = forecast.map(f => ({
    hour: `${f.hour}:00`,
    prediccion: f.consumption_kwh
  }));

  const maxVal = forecast.length > 0
    ? Math.max(...forecast.map(f => f.consumption_kwh))
    : 150;

  const avgVal = forecast.length > 0
    ? (forecast.reduce((a, b) => a + b.consumption_kwh, 0) / forecast.length).toFixed(1)
    : 0;

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Predicción de consumo energético — IA</ChartTitle>
        <ChartSubtitle>
          Promedio diario: <span>{avgVal} kWh</span>
        </ChartSubtitle>
      </ChartHeader>

      {loading ? (
        <LoadingText>Cargando predicciones de IA...</LoadingText>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis
              dataKey="hour"
              stroke="#CCCCCC"
              tick={{ fill: '#CCCCCC', fontSize: 11 }}
              interval={2}
            />
            <YAxis
              stroke="#CCCCCC"
              tick={{ fill: '#CCCCCC', fontSize: 12 }}
              label={{ value: 'kWh', position: 'insideLeft', fill: '#CCCCCC' }}
              domain={[0, Math.ceil(maxVal * 1.1)]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
              formatter={(value: any) => [`${value} kWh`, 'Predicción IA']}
            />
            <Legend wrapperStyle={{ color: '#CCCCCC' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="prediccion"
              stroke="#00FF09"
              strokeWidth={3}
              dot={{ fill: '#00FF09', r: 3 }}
              activeDot={{ r: 6, fill: '#00FF09' }}
              name="Predicción IA"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default EnergyLineChart;