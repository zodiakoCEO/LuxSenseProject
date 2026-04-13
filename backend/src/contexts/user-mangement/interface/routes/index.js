import express from 'express';
import { authGuard } from '../middleware/authGuard.js';

export function createAuthRoutes(authController) {
  const router = express.Router();

  // ── Públicas ──────────────────────────────────────────────────────────────
  router.post('/register',
    (req, res, next) => authController.register(req, res, next));

  router.post('/login',
    (req, res, next) => authController.login(req, res, next));

  router.get('/verify-email',
    (req, res, next) => authController.verifyEmailHandler(req, res, next));

  router.post('/forgot-password',
    (req, res, next) => authController.forgotPasswordHandler(req, res, next));

  router.post('/reset-password',
    (req, res, next) => authController.resetPasswordHandler(req, res, next));

  // ── Protegidas (requieren JWT) ────────────────────────────────────────────
  router.get('/profile',
    authGuard, (req, res, next) => authController.getProfile(req, res, next));

  router.put('/profile',
    authGuard, (req, res, next) => authController.updateProfile(req, res, next));

  return router;
}