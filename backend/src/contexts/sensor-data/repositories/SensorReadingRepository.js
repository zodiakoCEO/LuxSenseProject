import {SensorReading} from '../entities/SensorReading.js'

export class SensorReadingRepository {
    constructor(mongoCollection) {
        this.collection = mongoCollection;
    }

    async save(SensorReading) {
        const result = await this.collection.insertOne(
            SensorReading.toPersistence()
        )
        return result.insertedId.toString()
    }

    async findByDevice(id_dispositivo, limit = 100) {
        const documents = await this.collection
        .find({ id_dispositivo })
        .sort({ fecha: -1 })
        .limit(limit)
        .toArray();

        return documents.map(doc =>
            new SensorReading({...doc, id: doc._id})
        )
    }

    async getAnomalies(id_dispositivo, limit = 50) {
        const documents = await this.collection
        .find ({
            id_dispositivo,
            anomalia: {$ne: 'ninguna'}
        })
        .sort({ fecha: -1})
        .limit(limit)
        .toArray()

        return documents.map(doc =>
            new SensorReading({...doc, id: doc._id})
        )
    }

    async getStats(id_dispositivo, hours = 24) {
        const startDate = new Date(Date.now() - hours * 60 * 60 * 1000)

        const stats = await this.collection.aggregate([
            {
                $match: {
                    id_dispositivo,
                    fecha: {$gte: startDate }
                }
            },
            {
                $group: {
                    _id: null,
                    avg_corriente: {$avg: `$corriente_A`},
                    max_corriente: {$max: `$corriente_A`},
                    min_corriente: {$min: `$corriente_A`},
                    avg_voltaje: {$avg: `$voltaje_V`},
                    max_voltaje: {$max: `$voltaje_V`},
                    min_voltaje: {$min: `$voltaje_V`},
                    total_energia: {$sum: `$energia_kWh`},
                    anomaly_count: {
                        $sum: {
                            $cond: [{ $ne: [`$anomalia`, 'ninguna'] }, 1, 0]
                        }
                    }
                }
            }
        ]).toArray();

        return stats[0] || null
    }
}