import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

import { getMysqlPool, getMongoClient, getMongoDb } from './config/database.js';
import { EventBus } from './integration/enventBus.js';

import { SensorReadingRepository } from './contexts/sensor-data/repositories/SensorReadingRepository.js';
import { AmbienteRepository }      from './contexts/sensor-data/repositories/AmbienteRepository.js';
import { UserRepository }          from './contexts/user-mangement/repositories/UserRepository.js';

import { RecordSensorReading }  from './contexts/sensor-data/user-cases/RecordSensorReading.js';
import { GetSensorReadings }    from './contexts/sensor-data/user-cases/GetSensorReading.js';
import { GetSensorStats }       from './contexts/sensor-data/user-cases/GetSensorStats.js';
import { UpdateAmbienteEstado } from './contexts/sensor-data/user-cases/UpdateAmbienteEstado.js';

import { CreateUser }        from './contexts/user-mangement/use-cases/CreateUser.js';
import { AuthenticateUser }  from './contexts/user-mangement/use-cases/AuthenticateUser.js';
import { GetUserProfile }    from './contexts/user-mangement/use-cases/GetUserProfile.js';
import { VerifyEmail }       from './contexts/user-mangement/use-cases/VerifyEmail.js';
import { ForgotPassword }    from './contexts/user-mangement/use-cases/ForgotPassword.js';
import { ResetPassword }     from './contexts/user-mangement/use-cases/ResetPassword.js';
import { UpdateUserProfile } from './contexts/user-mangement/use-cases/UpdateUserProfile.js';

import { SensorController } from './contexts/sensor-data/interfaces/Controllers/SensorControllers.js';
import { AuthController }   from './contexts/user-mangement/interface/controllers/AuthController.js';

import { BrevoEmailService } from './contexts/user-mangement/infrastructure/email/brevoEmailService.js';
import { TokenService }      from './contexts/user-mangement/infrastructure/jwt/tokenService.js';

import { initGoogleStrategy } from './contexts/user-mangement/infrastructure/passport/googleStrategy.js';
import googleAuthRoutes       from './contexts/user-mangement/interface/routes/googleAuthRoutes.js';

import { createSensorRoutes }   from './contexts/sensor-data/interfaces/routes/index.js';
import { createAuthRoutes }     from './contexts/user-mangement/interface/routes/index.js';
import { createAmbienteRoutes } from './contexts/sensor-data/interfaces/routes/ambienteRoutes.js';
import aiRoutes                 from './contexts/ai/routes.js';

import { SensorSocketManager } from './contexts/sensor-data/interfaces/ws/sensorSocket.js';
import { logger }              from './shared/utils/logger.js';


export const app = express();

// ── Trust proxy (CRÍTICO para Railway) ───────────────────────────────────────
app.set('trust proxy', 1);


// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_WWW?.replace(/\/$/, ''),
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`[CORS] Bloqueado: ${origin} | Permitidos: ${allowedOrigins.join(', ')}`);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));


// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'LuxSense API' });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status:      'ok',
    timestamp:   new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});


app.use((err, _req, res, _next) => {
  // LOG COMPLETO TEMPORAL
  console.error('[FULL ERROR]', JSON.stringify({
    message: err.message,
    code: err.code,
    hostname: err.hostname,
    stack: err.stack?.split('\n')[0]
  }));
  
  const statusCode = err.statusCode || 500;
  const message    = err.message    || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// ── Session ───────────────────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure:   process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));


// ── Passport ──────────────────────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());
initGoogleStrategy();


// ── App bootstrap ─────────────────────────────────────────────────────────────
export async function initializeApp() {
  try {
    await getMongoClient();
    const mysqlPool = await getMysqlPool();

    const mongoDb          = getMongoDb();
    const sensorCollection = mongoDb.collection('sensor_readings');
    const eventBus         = new EventBus();

    // ── Sensor layer ──────────────────────────────────────────────────────────
    const sensorReadingRepo   = new SensorReadingRepository(sensorCollection);
    const recordSensorReading = new RecordSensorReading(sensorReadingRepo, eventBus);
    const getSensorReadings   = new GetSensorReadings(sensorReadingRepo);
    const getSensorStats      = new GetSensorStats(sensorReadingRepo);

    const sensorController = new SensorController(
      recordSensorReading,
      getSensorReadings,
      getSensorStats
    );

    // ── Ambiente layer ────────────────────────────────────────────────────────
    const ambienteCollection   = mongoDb.collection('ambientes');
    const ambienteRepo         = new AmbienteRepository(ambienteCollection);
    const updateAmbienteEstado = new UpdateAmbienteEstado(ambienteRepo, eventBus);

    // ── User / Auth layer ─────────────────────────────────────────────────────
    const userRepo     = new UserRepository(mysqlPool);
    const tokenService = new TokenService();
    const emailService = new BrevoEmailService();

    const createUser        = new CreateUser(userRepo, eventBus, emailService);
    const authenticateUser  = new AuthenticateUser(userRepo, tokenService);
    const getUserProfile    = new GetUserProfile(userRepo);
    const verifyEmail       = new VerifyEmail(userRepo);
    const forgotPassword    = new ForgotPassword(userRepo, emailService);
    const resetPassword     = new ResetPassword(userRepo);
    const updateUserProfile = new UpdateUserProfile(userRepo);

    const authController = new AuthController(
      createUser,
      authenticateUser,
      getUserProfile,
      verifyEmail,
      forgotPassword,
      resetPassword,
      updateUserProfile
    );

    // ── Routes ────────────────────────────────────────────────────────────────
    app.use('/api/sensors',   createSensorRoutes(sensorController));
    app.use('/api/auth',      createAuthRoutes(authController));
    app.use('/api/auth',      googleAuthRoutes);
    app.use('/api/ai',        aiRoutes);
    app.use('/api/ambientes', createAmbienteRoutes(mongoDb, updateAmbienteEstado));


    // ── Global error handler ──────────────────────────────────────────────────
    app.use((err, _req, res, _next) => {
      logger.error('Request error:', err.message);
      const statusCode = err.statusCode || 500;
      const message    = err.message    || 'Internal Server Error';
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
      sensorSocketManager: new SensorSocketManager(recordSensorReading, eventBus)
    };

  } catch (error) {
    logger.error('Error inicializando aplicación:', error.message);
    throw error;
  }
}