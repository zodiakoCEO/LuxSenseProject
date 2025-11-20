import express from 'express'

export function createAuthRoutes(authController) {
    const router = express.Router()

    router.post('/register', (req, res, next) => authController.register(req, res, next)
    );
    
    router.post('/login',(req, res, next) => authController.login(req, res, next)
    );

    return router;
}