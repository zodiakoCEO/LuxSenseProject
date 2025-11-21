import {ValidationError} from '../../../../shared/errors/AppError.js'

export class SensorController {
    constructor (recordSensorReading, getSensorReadings, getSensorStats) {
        this.recordSensorReading = recordSensorReading;
        this.getSensorReadings = getSensorReadings;
        this.getSensorStats = getSensorStats;
    }

    async postReading (req, res, next) {
        try {
            const {corriente_A, voltaje_V, potencia_W, energia_kWh, estado, anomalia, id_dispositivo } = req.body;

            if (!corriente_A || !voltaje_V || !potencia_W || !id_dispositivo) {
                throw new ValidationError('campos requeridos invalidos')
            }

            const result = await this.recordSensorReading.execute({
               corriente_A,
               voltaje_V,
               potencia_W,
               energia_kWh: energia_kWh || 0,
               estado: estado || 'activo',
               anomalia: anomalia || 'ninguna',
               id_dispositivo
            });

            res.status(201).json({
                success: true,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    async getReadings(req, res, next) {
        try {
            const { id_dispositivo } = req.params;
            const {limit = 100 } = req.query;

            const readings = await this.getSensorReadings.execute(
                id_dispositivo,
                parseInt(limit)
            )

            res.json({
                success: true,
                data: readings
            })
        } catch (error) {
            next(error)
        }
    }

    async getStats(req, res, next) {
        try{
            const {id_dispositivo } = req.params;
            const { hours = 24 } = req.query;

            const stats = await this.getSensorStats.execute(
                id_dispositivo,
                parseInt(hours)
            )

            res.json({
                success: true,
                data: stats,
            })
        } catch (error) {
            next(error)
        }
    }
}