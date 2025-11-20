import { SensorReading } from '../entities/SensorReading.js'

export class RecordSensorReading {
    constructor (SensorReadingRepository, eventBus) {
        this.repository = SensorReadingRepository,
        this.eventBus = eventBus;
    }

    async execute(readingData) {
        const reading = new SensorReading({
            ...readingData,
            fecha: new Date()
        });

        const id = await this.repository.save(reading);

        if (reading.isAnomalous()) {
            await this.eventBus.publish('sensor:anomaly_detected', {
                id_dispositivo: reading.id_dispositivo,
                anomalia: reading.anomalia,
                severity: reading.getAnomalySeverity(),
                fecha: reading.fecha
            })
        }

        return {
            id,
            ...reading.toJSON()
        }
    }
}