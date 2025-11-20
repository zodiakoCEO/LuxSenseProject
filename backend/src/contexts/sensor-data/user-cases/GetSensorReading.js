export class GetSensorReadings {
    constructor (sensorReadingRepository) {
        this.repository = sensorReadingRepository;
    }

    async execute(id_dispositivo, limit = 100) {
        const readings = await this.repository.findByDevice(id_dispositivo, limit)
        return readings.map(r => r.toJSON())
    }
}