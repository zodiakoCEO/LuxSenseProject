import express from 'express';
import { getMysqlPool, getMongoClient, getMongoDb } from './config/database.js';
import { EventBus } from './integration/enventBus.js';


// ============================================
// REPOSITORIOS
// ============================================

import { SensorReadingRepository } from './contexts/sensor-data/repositories/SensorReadingRepository.js';
import { UserRepository } from './contexts/user-mangement/repositories/UserRepository.js';


// ============================================
// CASOS DE USO
// ============================================

import { RecordSensorReading } from './contexts/sensor-data/user-cases/RecordSensorReading.js';
import { GetSensorReadings } from './contexts/sensor-data/user-cases/GetSensorReading.js';
import { GetSensorStats } from './contexts/sensor-data/user-cases/GetSensorStats.js';
import { CreateUser } from './contexts/user-mangement/use-cases/CreateUser.js';
import { AuthenticateUser } from './contexts/user-mangement/use-cases/AuthenticateUser.js';
import { GetUserProfile } from './contexts/user-mangement/use-cases/GetUserProfile.js'


// ============================================
// CONTROLADORES
// ============================================

import { SensorController } from './contexts/sensor-data/interfaces/Controllers/SensorControllers.js';
import { AuthController } from './contexts/user-mangement/interface/controllers/AuthController.js';


// ============================================
// RUTAS
// ============================================

import { createSensorRoutes } from './contexts/sensor-data/interfaces/routes/index.js';
import { createAuthRoutes } from './contexts/user-mangement/interface/routes/index.js';


// ============================================
// SERVICIOS
// ============================================

import { TokenService } from './contexts/user-mangement/infrastructure/jwt/tokenService.js';
import { SensorSocketManager } from './contexts/sensor-data/interfaces/ws/sensorSocket.js';


// ============================================
// UTILITIES
// ============================================

import { AppError } from './shared/errors/AppError.js';
import { logger } from './shared/utils/logger.js';


// ============================================
// INICIALIZACIÓN DE EXPRESS
// ============================================

export const app = express();
app.use(express.json());


// ============================================
// FUNCIÓN PRINCIPAL DE INICIALIZACIÓN
// ============================================

export async function initializeApp() {
    try {
        // 1️⃣ CONECTAR A LAS BASES DE DATOS
        // ⚠️ IMPORTANTE: Esto DEBE hacerse primero y en orden
        await getMongoClient();      // Conectar MongoDB
        const mysqlPool = await getMysqlPool();  // Conectar MySQL
        
        
        // 2️⃣ OBTENER INSTANCIAS DE LAS BASES DE DATOS
        const mongoDb = getMongoDb();
        const sensorCollection = mongoDb.collection('sensor_readings');


        // 3️⃣ INICIALIZAR EVENT BUS
        const eventBus = new EventBus();


        // 4️⃣ CONFIGURAR CONTEXTO DE SENSORES
        const sensorReadingRepo = new SensorReadingRepository(sensorCollection);
        const recordSensorReading = new RecordSensorReading(sensorReadingRepo, eventBus);
        const getSensorReadings = new GetSensorReadings(sensorReadingRepo);
        const getSensorStats = new GetSensorStats(sensorReadingRepo);
        const sensorController = new SensorController(
            recordSensorReading,
            getSensorReadings,
            getSensorStats
        );


        // 5️⃣ CONFIGURAR CONTEXTO DE USUARIOS Y AUTENTICACIÓN
        const userRepo = new UserRepository(mysqlPool);
        const tokenService = new TokenService();
        const createUser = new CreateUser(userRepo, eventBus);
        const authenticateUser = new AuthenticateUser(userRepo, tokenService);
        const getUserProfile = new GetUserProfile(userRepo);
        const authController = new AuthController(createUser, authenticateUser, getUserProfile);


        // 6️⃣ REGISTRAR RUTAS
        app.use('/api/sensors', createSensorRoutes(sensorController));
        app.use('/api/auth', createAuthRoutes(authController));


        // 7️⃣ HEALTH CHECK
        app.get('/health', (req, res) => {
            res.json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                database: {
                    mongodb: 'connected',
                    mysql: 'connected'
                }
            });
        });


        // 8️⃣ MANEJO DE ERRORES (MIDDLEWARE FINAL)
        app.use((err, req, res, next) => {
            logger.error('Request error:', err.message);

            const statusCode = err.statusCode || 500;
            const message = err.message || 'Internal Server Error';

            res.status(statusCode).json({
                success: false,
                error: {
                    message,
                    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
                }
            });
        });


        // 9️⃣ RETORNAR APP Y SOCKET MANAGER
        return {
            app,
            sensorSocketManager: new SensorSocketManager(recordSensorReading)
        };

    } catch (error) {
        logger.error('Error inicializando aplicación:', error.message);
        throw error;  // Propagar el error para que server.js lo maneje
    }
}