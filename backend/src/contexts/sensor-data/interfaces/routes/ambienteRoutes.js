import express from 'express';
import { AmbienteController } from '../Controllers/AmbienteController.js';
import { AmbienteRepository } from '../../repositories/AmbienteRepository.js';
import { authGuard } from '../../../user-mangement/interface/middleware/authGuard.js';

export function createAmbienteRoutes(mongoDb) {
    const router = express.Router();
    const collection = mongoDb.collection('ambientes');
    const repo = new AmbienteRepository(collection);
    const controller = new AmbienteController(repo);

    router.post('/',    authGuard, (req, res, next) => controller.create(req, res, next));
    router.get('/',     authGuard, (req, res, next) => controller.getAll(req, res, next));
    router.put('/:id',  authGuard, (req, res, next) => controller.update(req, res, next));
    router.delete('/:id', authGuard, (req, res, next) => controller.delete(req, res, next));

    return router;
}