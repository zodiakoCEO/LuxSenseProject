import { Server } from 'socket.io';
import { logger } from '../../../../shared/utils/logger.js';

export class SensorSocketManager {
    constructor(recordSensorReading, eventBus = null) {
        this.recordSensorReading = recordSensorReading;
        this.eventBus = eventBus;
        this.io = null;
    }

    initialize(server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.FRONTEND_URL || 'http://localhost:3000',
                credentials: true,
                methods: ['GET', 'POST']
            },
            transports: ['websocket', 'polling']
        });

        this.io.on('connection', (socket) => {
            logger.info(` Cliente Conectado: ${socket.id}`);

            socket.on('subscribe:device', (id_dispositivo) => {
                socket.join(`device:${id_dispositivo}`);
                logger.info(` Cliente suscrito al dispositivo ${id_dispositivo}`);
            });

            socket.on('unsubscribe:device', (id_dispositivo) => {
                socket.leave(`device:${id_dispositivo}`);
                logger.info(` Cliente desuscrito del dispositivo ${id_dispositivo}`);
            });

            // El frontend se suscribe a los cambios de sus ambientes
            socket.on('subscribe:ambientes', (id_usuario) => {
                socket.join(`usuario:${id_usuario}`);
                logger.info(` Cliente suscrito a ambientes del usuario ${id_usuario}`);
            });

            socket.on('unsubscribe:ambientes', (id_usuario) => {
                socket.leave(`usuario:${id_usuario}`);
            });

            socket.on('disconnect', () => {
                logger.info(` Cliente desconectado: ${socket.id}`);
            });
        });

        // Escucha EventBus para reemitir cambios de ambientes al frontend en tiempo real
        if (this.eventBus) {
            this.eventBus.subscribe('ambiente:estado_changed', (data) => {
                this.broadcastAmbienteEstado(data);
            });
            logger.info(' SensorSocketManager suscrito a ambiente:estado_changed');
        }

        return this.io;
    }

    broadcastNewReading(id_dispositivo, reading) {
        if (this.io) {
            this.io.to(`device:${id_dispositivo}`).emit('sensor:new_reading', reading);
        }
    }

    broadcastAnomaly(id_dispositivo, anomaly) {
        if (this.io) {
            this.io.to(`device:${id_dispositivo}`).emit('sensor:anomaly', anomaly);
        }
    }

    // Emite al room del usuario específico cuando cambia el estado de un ambiente
    broadcastAmbienteEstado(data) {
        if (this.io) {
            // Emite al usuario propietario del ambiente
            this.io.to(`usuario:${data.id_usuario}`).emit('ambiente:estado_changed', {
                ambiente_id:       data.ambiente_id,
                sensor_id:         data.sensor_id,
                nombre:            data.nombre,
                icono:             data.icono,
                activo:            data.activo,
                estado:            data.estado,
                ultima_actividad:  data.ultima_actividad,
                timestamp:         data.timestamp
            });
            logger.info(` Estado broadcast → usuario ${data.id_usuario}: ${data.nombre} → ${data.estado}`);
        }
    }
}