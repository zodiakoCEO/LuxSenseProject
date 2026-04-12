import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

import { getMysqlPool, getMongoClient, getMongoDb } from './config/database.js';
import { EventBus } from './integration/enventBus.js';

import { SensorReadingRepository } from './contexts/sensor-data/repositories/SensorReadingRepository.js';
import { UserRepository } from './contexts/user-mangement/repositories/UserRepository.js';

import { RecordSensorReading } from './contexts/sensor-data/user-cases/RecordSensorReading.js';
import { GetSensorReadings } from './contexts/sensor-data/user-cases/GetSensorReading.js';
import { GetSensorStats } from './contexts/sensor-data/user-cases/GetSensorStats.js';
import { CreateUser } from './contexts/user-mangement/use-cases/CreateUser.js';
import { AuthenticateUser } from './contexts/user-mangement/use-cases/AuthenticateUser.js';
import { GetUserProfile } from './contexts/user-mangement/use-cases/GetUserProfile.js';

import { SensorController } from './contexts/sensor-data/interfaces/Controllers/SensorControllers.js';
import { AuthController } from './contexts/user-mangement/interface/controllers/AuthController.js';
import { initGoogleStrategy } from './contexts/user-mangement/infrastructure/passport/googleStrategy.js';
import googleAuthRoutes from './contexts/user-mangement/interface/routes/googleAuthRoutes.js';

import { createSensorRoutes } from './contexts/sensor-data/interfaces/routes/index.js';
import { createAuthRoutes } from './contexts/user-mangement/interface/routes/index.js';
import aiRoutes from './contexts/ai/routes.js';
import { createAmbienteRoutes } from './contexts/sensor-data/interfaces/routes/ambienteRoutes.js';

import { TokenService } from './contexts/user-mangement/infrastructure/jwt/tokenService.js';
import { SensorSocketManager } from './contexts/sensor-data/interfaces/ws/sensorSocket.js';

import { logger } from './shared/utils/logger.js';

export const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_WWW,
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

initGoogleStrategy();

export async function initializeApp() {
  try {
    await getMongoClient();
    const mysqlPool = await getMysqlPool();

    const mongoDb = getMongoDb();
    const sensorCollection = mongoDb.collection('sensor_readings');

    const eventBus = new EventBus();

    const sensorReadingRepo = new SensorReadingRepository(sensorCollection);
    const recordSensorReading = new RecordSensorReading(sensorReadingRepo, eventBus);
    const getSensorReadings = new GetSensorReadings(sensorReadingRepo);
    const getSensorStats = new GetSensorStats(sensorReadingRepo);

    const sensorController = new SensorController(
      recordSensorReading,
      getSensorReadings,
      getSensorStats
    );

    const userRepo = new UserRepository(mysqlPool);
    const tokenService = new TokenService();
    const createUser = new CreateUser(userRepo, eventBus);
    const authenticateUser = new AuthenticateUser(userRepo, tokenService);
    const getUserProfile = new GetUserProfile(userRepo);
    const authController = new AuthController(
      createUser,
      authenticateUser,
      getUserProfile
    );

    app.use('/api/sensors', createSensorRoutes(sensorController));
    app.use('/api/auth', createAuthRoutes(authController));
    app.use('/api/ai', aiRoutes);
    app.use('/api/ambientes', createAmbienteRoutes(mongoDb));
    app.use('/api/auth', googleAuthRoutes);

    app.get('/health', (_req, res) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: {
          mongodb: 'connected',
          mysql: 'connected'
        }
      });
    });

    app.use((err, _req, res, _next) => {
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

    return {
      app,
      sensorSocketManager: new SensorSocketManager(recordSensorReading)
    };
  } catch (error) {
    logger.error('Error inicializando aplicación:', error.message);
    throw error;
  }
}