export class GetSensorStats {
    constructor(sensorReadingRespository) {
         this.repository = sensorReadingRespository;
    }

    async execute(id_dispositivo, hours = 24) {
        const stats = await this.repository.getstats(id_dispositivo, hours);

        if (!stats) {
            return {
                id_dispositivo,
                hours,
                message: 'Data no disponible'
            };
        }

        return {
            id_dispositivo,
            period: `${hours} horas`,
            ...stats
        }
    }
}