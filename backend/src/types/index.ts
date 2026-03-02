export interface DeviceReading {
  id_dispositivo: string;
  voltaje: number;
  corriente: number;
  potenciaActiva: number;
  timestamp?: string;
  consumoMesActual?: number;
  consumoMesPasado?: number;
  lastMonthValue?: number;
}

export interface EnergyData {
  day: string;
  currentMonth: number;
  lastMonth: number;
}

export interface Metric {
  title: string;
  value: number;
  unit: string;
  percentage: number;
  color: string;
}
