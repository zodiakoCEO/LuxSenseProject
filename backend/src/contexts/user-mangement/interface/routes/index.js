import express from 'express'
import { authGuard } from '../../interface/middleware/authGuard.js'

export function createAuthRoutes(authController) {
    const router = express.Router()

    router.post('/register', (req, res, next) => authController.register(req, res, next)
    );
    
    router.post('/login',(req, res, next) => authController.login(req, res, next)
    );

    router.get('/profile', authGuard, (req, res, next) => 
    authController.getProfile(req, res, next)
  );

    return router;
}