import express from 'express';
import { AmbienteController } from '../Controllers/AmbienteController.js';
import { AmbienteRepository } from '../../repositories/AmbienteRepository.js';
import { authGuard } from '../../../user-mangement/interface/middleware/authGuard.js';
import { deviceAuth } from '../middleware/deviceAuth.js';

export function createAmbienteRoutes(mongoDb, updateAmbienteEstado) {
    const router = express.Router();
    const collection = mongoDb.collection('ambientes');
    const repo = new AmbienteRepository(collection);
    const controller = new AmbienteController(repo, updateAmbienteEstado);

    // ── Rutas del usuario (protegidas por JWT) ────────────────────────────────
    router.get('/activos', authGuard, (req, res, next) => controller.getActivos(req, res, next));
    router.post('/',       authGuard, (req, res, next) => controller.create(req, res, next));
    router.get('/',        authGuard, (req, res, next) => controller.getAll(req, res, next));
    router.put('/:id',     authGuard, (req, res, next) => controller.update(req, res, next));
    router.delete('/:id',  authGuard, (req, res, next) => controller.delete(req, res, next));

    // ── Ruta para dispositivos físicos (ESP32) — autenticada con API key ──────
    router.post('/evento', deviceAuth, (req, res, next) => controller.registrarEvento(req, res, next));

    return router;
}