import express from 'express'
import { authGuard } from '../../../user-mangement/interface/middleware/authGuard.js'


export function createSensorRoutes(sensorController) {
    const router = express.Router()

    router.post('/readings', authGuard, (req, res, next) => 
        sensorController.postReading(req, res, next)
    );

    router.get('/device/:id_dispositivo/readings', authGuard, (req, res, next) => 
        sensorController.getReadings(req, res, next)
    );

    router.get('/device/:id_dispositivo/stats', authGuard, (req, res, next) => 
        sensorController.getStats(req, res, next)
    );

    router.post('/device/readings', (req, res, next) => 
        sensorController.postReading(req, res, next)
    );

    return router;
}
