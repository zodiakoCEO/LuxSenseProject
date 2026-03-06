import express from 'express';
import { AIController } from './controller.js';
import { authGuard } from '../user-mangement/interface/middleware/authGuard.js';

const router = express.Router();
const aiController = new AIController();

// ── ENERGÍA ──────────────────────────────────
router.get('/energy/forecast', authGuard, (req, res, next) =>
    aiController.getEnergyForecast(req, res, next)
);

router.get('/energy/predict', authGuard, (req, res, next) =>
    aiController.predictEnergy(req, res, next)
);

// ── ANOMALÍAS ─────────────────────────────────
router.get('/anomalies/summary', authGuard, (req, res, next) =>
    aiController.getAnomalySummary(req, res, next)
);

router.get('/anomalies/detect', authGuard, (req, res, next) =>
    aiController.detectAnomaly(req, res, next)
);

// ── ILUMINACIÓN ───────────────────────────────
router.get('/lighting/schedule', authGuard, (req, res, next) =>
    aiController.getLightingSchedule(req, res, next)
);

router.get('/lighting/optimize', authGuard, (req, res, next) =>
    aiController.optimizeLighting(req, res, next)
);
// ── AMBIENTES ─────────────────────────────────
router.get('/ambientes', authGuard, (req, res, next) =>
    aiController.getAmbientes(req, res, next)
);

router.get('/ambientes/:id', authGuard, (req, res, next) =>
    aiController.getAmbienteDetail(req, res, next)
);

export default router;