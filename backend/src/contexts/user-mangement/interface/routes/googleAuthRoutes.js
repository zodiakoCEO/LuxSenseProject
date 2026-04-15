// src/contexts/user-mangement/interface/routes/googleAuthRoutes.js
import express from 'express';
import passport from 'passport';
import { TokenService } from '../../infrastructure/jwt/tokenService.js';

const router = express.Router();
const tokenService = new TokenService();

// En producción: https://luxsense-dun.vercel.app
// En local: FRONTEND_URL = http://localhost:5173
const FRONTEND_URL =
  process.env.FRONTEND_URL_WWW || process.env.FRONTEND_URL || 'http://localhost:5173';

// 1) Inicio de login con Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// 2) Callback después de Google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/login?error=google_failed`,
    session: false,
  }),
  (req, res) => {
    try {
      const user = req.user;

      const token = tokenService.sign({
        id_usuario: user.id_usuario,
        email:      user.email,
        id_rol:     user.id_rol,
      });

      const params = new URLSearchParams({
        token,
        name:  user.nombre || '',
        email: user.email,
      });

      // El front tiene una página /auth/callback que lee el token de la query
      res.redirect(`${FRONTEND_URL}/auth/callback?${params.toString()}`);
    } catch (err) {
      console.error('[Google] Error generando token:', err.message);
      res.redirect(`${FRONTEND_URL}/login?error=token_failed`);
    }
  }
);

export default router;