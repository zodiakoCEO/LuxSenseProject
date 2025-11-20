import 'dotenv/config';
import http from 'http';
import { initializeApp } from './app.js';
import { closeConnections } from './config/database.js';
import { logger } from './shared/utils/logger.js';

async function start() {
  try {
    const { app, sensorSocketManager } = await initializeApp();
    const PORT = process.env.PORT || 5000;

    const server = http.createServer(app);

    sensorSocketManager.initialize(server);

    server.listen(PORT, () => {
      logger.success(`Server running on http://localhost:${PORT}`);
      logger.info(`WebSocket ready at ws://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      logger.warn('Shutting down gracefully...');
      await closeConnections();
      server.close();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Server startup failed', error.message);
    process.exit(1);
  }
}

start();
