import {ANOMALIES, ANOMALY_SEVERITY} from '../../../shared/constants/anomalies.js'

export class SensorReading {
    constructor ({
        id,
        fecha,
        estado,
        corriente_A,
        voltaje_V,
        potencia_W,
        energia_kWh,
        anomalia,
        id_dispositivo
    }) {
        this.id = id;
        this.fecha = new Date(fecha);
        this.estado = estado;
        this.corriente_A = corriente_A;
        this.voltaje_V = voltaje_V,
        this.potencia_W = potencia_W,
        this.energia_kWh = energia_kWh,
        this.anomalia = anomalia,
        this.id_dispositivo = id_dispositivo
    }

    isAnomalous() {
        return this.anomalia !== ANOMALIES.NONE
    }

    getAnomalySeverity() {
        return ANOMALY_SEVERITY[this.anomalia] || 0;
    }

    toPersistence() {
        return {
            fecha: this.fecha,
            estado: this.estado,
            corriente_A: this.corriente_A,
            voltaje_V: this.voltaje_V,
            potencia_W: this.potencia_W,
            energia_kWh: this.energia_kWh,
            anomalia: this.anomalia,
            id_dispositivo: this.id_dispositivo,
        }
    }

    toJSON() {
        return {
            _id: this.id,
            fecha: this.fecha.toISOString(),
            estado: this.estado,
            corriente_A: this.corriente_A,
            voltaje_V: this.voltaje_V,
            potencia_W: this.potencia_W,
            energia_kWh: this.energia_kWh,
            anomalia: this.anomalia,
            isAnomalous: this.isAnomalous(),
            severity: this.getAnomalySeverity(),
            id_dispositivo: this.id_dispositivo
        }
    }
}