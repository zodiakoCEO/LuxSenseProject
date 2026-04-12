import 'dotenv/config';
import http from 'http';
import { initializeApp } from './app.js';
import { closeConnections } from './config/database.js';
import { logger } from './shared/utils/logger.js';

async function start() {
  try {
    const { app, sensorSocketManager } = await initializeApp();
    const PORT = process.env.PORT || 5002;

    const server = http.createServer(app);

    sensorSocketManager.initialize(server);

    server.listen(PORT, '0.0.0.0', () => {
      logger.success(`Server running on port ${PORT}`);
      logger.info(`Healthcheck available at /health`);
    });

    const shutdown = async (signal) => {
      logger.warn(`Received ${signal}, shutting down gracefully...`);
      try {
        await closeConnections();
        server.close(() => process.exit(0));
      } catch (error) {
        logger.error('Error during shutdown', error.message);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('=== FULL ERROR ===');
    console.error(error);
    console.error('Stack:', error?.stack);
    console.error('Message:', error?.message);
    logger.error('Server startup failed', error?.message || 'Unknown error');
    process.exit(1);
  }
}

start();