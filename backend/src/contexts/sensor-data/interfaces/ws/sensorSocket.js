import { Server } from 'socket.io';
import { logger } from '../../../../shared/utils/logger.js'

export class SensorSocketManager {
    constructor(recordSensorReading) {
        this.recordSensorReading = recordSensorReading
        this.io = null
    }

    initialize(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.FRONTEND_URL || 'http://localhost:3000',
                credentials: true
            }
        })

        this.io.on('coneccion', (socket) => {
            logger.info(`Cliente Conectado: ${socket.id}`)

            socket.on('Coneccion: dispositivo', (id_dispositivo)=> {
                socket.join(`dispositivio:${id_dispositivo}`);
                logger.succes(`Cliente conectado con dispositivo ${id_dispositivo}`)
            })

            socket.on(`Desconeccion: dispositivo`, (id_dispositivo) => {
                socket.leave(`dispositivo: ${id_dispositivo}`)
                logger.info(`clientes desconectado del dispositivo ${id_dispositivo}`)
            })
        })

        return this.io
    }

    broadcastNewReading(id_dispositivo, reading) {
        this.io.to(`dispositivo: ${id_dispositivo}`).emit('sensor: nueva_lectura', reading)
    }

    broadcastAnomaly(id_dispositivo, anomaly) {
        this.io.to(`dispositivo: ${id_dispositivo}`).emit('sensor: anomalia', anomaly)
    }
}