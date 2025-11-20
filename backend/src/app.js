import express from 'express'
import { getMysqlPool, getMongoDb, getMysqlPool } from './config/database.js'
import { EventBus } from './integration/enventBus.js'

// Repositorios
import { SensorReadingRepository } from "./contexts/sensor-data/repositories/SensorReadingRepository.js";
import { UserRepository } from "./contexts/user-mangement/repositories/UserRepository.js";

// Casos de uso

import { RecordSensorReading } from "./contexts/sensor-data/user-cases/RecordSensorReading.js";
import { GetSensorReadings } from "./contexts/sensor-data/user-cases/GetSensorReading.js";
import { GetSensorStats } from "./contexts/sensor-data/user-cases/GetSensorStats";
import { CreateUser } from "./contexts/user-mangement/use-cases/CreateUser.js";
import { AuthenticateUser } from "./contexts/user-mangement/use-cases/AuthenticateUser.js";

// Controladores

import { SensorController } from "./contexts/sensor-data/interfaces/Controllers/SensorControllers.js";
import { AuthController } from "./contexts/user-mangement/interface/controllers/AuthController.js";

// Rutas

import { createSensorRoutes } from "./contexts/sensor-data/interfaces/routes/index.js";
import { createAuthRoutes } from "./contexts/user-mangement/interface/routes/index.js";

// Services

import { TokenService } from "./contexts/user-mangement/infrastructure/jwt/tokenService.js";
import { SensorSocketManager } from "./contexts/sensor-data/interfaces/ws/sensorSocket.js";

// Errores

import { AppError } from "./shared/errors/AppError.js";
import { logger } from "./shared/utils/logger.js";

export const app = express()
app.use(express.json())

export async function initializeApp() {
    const mysqlPool = await getMysqlPool();
    const mongoDb = await getMongoDb();
    const sensorCollection = mongoDb.collection('sensor_readings')

    const eventBus = new EventBus()

    // Contexto Sensores 
    const sensorReadingRepo = new SensorReadingRepository(sensorCollection);
    const recordSensorReading = new RecordSensorReading(sensorReadingRepo, eventBus);
    const getSensorReadings = new GetSensorReadings(sensorReadingRepo);
    const getSensorStats = new GetSensorStats(sensorReadingRepo);
    const sensorController = new SensorController(recordSensorReading, getSensorReadings, getSensorStats);

    // Contexto manejo de usuario
    const userRepo = new UserRepository(mysqlPool);
    const tokenService = new TokenService();
    const createUser = new CreateUser(userRepo, eventBus);
    const authenticateUser = new AuthenticateUser(userRepo, tokenService);
    const authController = new AuthController(createUser, authenticateUser);

    // Rutas
    app.use('/api/sensors', createSensorRoutes(sensorController));
    app.use('/api/auth', createAuthRoutes(authController));

    // Health check
    app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

    // Manejo de errores
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

  return {app, SensorSocketManager: new SensorSocketManager(recordSensorReading)}
}