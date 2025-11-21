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
                credentials: true,
                methods: ['GET', 'POST']
            },
            transports: ['websocket', 'polling']
        })

        this.io.on('connection', (socket) => {
            logger.info(`📡 Cliente Conectado: ${socket.id}`)

            socket.on('subscribe:device', (id_dispositivo) => {
                socket.join(`device:${id_dispositivo}`);
                logger.success(`✅ Cliente conectado con dispositivo ${id_dispositivo}`)
            })

            socket.on('unsubscribe:device', (id_dispositivo) => {
                socket.leave(`device:${id_dispositivo}`)
                logger.info(`📴 Cliente desconectado del dispositivo ${id_dispositivo}`)
            })

            socket.on('disconnect', () => {
                logger.info(`📴 Cliente desconectado: ${socket.id}`)
            })
        })

        return this.io
    }

    broadcastNewReading(id_dispositivo, reading) {
        this.io.to(`device:${id_dispositivo}`).emit('sensor:new_reading', reading)
    }

    broadcastAnomaly(id_dispositivo, anomaly) {
        this.io.to(`device:${id_dispositivo}`).emit('sensor:anomaly', anomaly)
    }
}
