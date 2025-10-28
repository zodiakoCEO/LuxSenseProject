import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { styled } from '@linaria/react';

// Datos quemados para la presentación
const mockData = [
  { day: '1', currentMonth: 30, lastMonth: 35 },
  { day: '2', currentMonth: 35, lastMonth: 40 },
  { day: '3', currentMonth: 45, lastMonth: 50 },
  { day: '4', currentMonth: 50, lastMonth: 60 },
  { day: '5', currentMonth: 60, lastMonth: 55 },
  { day: '6', currentMonth: 55, lastMonth: 50 },
  { day: '7', currentMonth: 50, lastMonth: 45 },
  { day: '8', currentMonth: 45, lastMonth: 35 },
  { day: '9', currentMonth: 50, lastMonth: 40 },
  { day: '10', currentMonth: 60, lastMonth: 50 },
  { day: '11', currentMonth: 65, lastMonth: 55 },
  { day: '12', currentMonth: 70, lastMonth: 60 },
  { day: '13', currentMonth: 75, lastMonth: 65 },
  { day: '14', currentMonth: 70, lastMonth: 60 },
  { day: '15', currentMonth: 75, lastMonth: 70 },
  { day: '16', currentMonth: 72, lastMonth: 68 },
  { day: '17', currentMonth: 68, lastMonth: 65 },
  { day: '18', currentMonth: 75, lastMonth: 25 }, // Punto destacado en el mockup
];

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
    color: #FF00FF;
    font-weight: 600;
  }
`;

const EnergyLineChart: React.FC = () => {
  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>Consumo energético</ChartTitle>
        <ChartSubtitle>
          Se ha presentado un consumo energético del <span>75%</span> de la meta este mes
        </ChartSubtitle>
      </ChartHeader>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            {/* Gradiente para la línea del mes actual */}
            <linearGradient id="colorCurrentMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF09" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00FF09" stopOpacity={0.3}/>
            </linearGradient>
            
            {/* Gradiente para la línea del mes pasado */}
            <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FF00FF" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          
          <XAxis 
            dataKey="day" 
            stroke="#CCCCCC"
            tick={{ fill: '#CCCCCC', fontSize: 12 }}
          />
          
          <YAxis 
            stroke="#CCCCCC"
            tick={{ fill: '#CCCCCC', fontSize: 12 }}
            label={{ value: '%', position: 'insideLeft', fill: '#CCCCCC' }}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#FFFFFF'
            }}
          />
          
          <Legend 
            wrapperStyle={{ color: '#CCCCCC' }}
            iconType="line"
          />
          
          <Line 
            type="monotone" 
            dataKey="currentMonth" 
            stroke="#00FF09" 
            strokeWidth={3}
            dot={{ fill: '#00FF09', r: 4 }}
            activeDot={{ r: 6, fill: '#00FF09' }}
            name="Mes actual"
          />
          
          <Line 
            type="monotone" 
            dataKey="lastMonth" 
            stroke="#FF00FF" 
            strokeWidth={3}
            dot={{ fill: '#FF00FF', r: 4 }}
            activeDot={{ r: 6, fill: '#FF00FF' }}
            name="Mes pasado"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default EnergyLineChart;