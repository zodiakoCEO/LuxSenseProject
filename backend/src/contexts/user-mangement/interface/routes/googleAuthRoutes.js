import express from 'express';
import passport from 'passport';
import { TokenService } from '../../infrastructure/jwt/tokenService.js';

const router = express.Router();
const tokenService = new TokenService();

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
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
    session: false,
  }),
  (req, res) => {
    try {
      // ✅ Leer en tiempo de REQUEST, no de módulo
      const FRONTEND_URL =
        process.env.FRONTEND_URL_WWW ||
        process.env.FRONTEND_URL ||
        'http://localhost:5173';

      const user = req.user;

      const token = tokenService.sign({
        id_usuario: user.id_usuario,
        email:      user.email,
        id_rol:     user.id_rol,
      });

      const params = new URLSearchParams({
        token,
        name:  user.nombre          || '',
        email: user.email           || '',
        id:    String(user.id_usuario || ''),
        role:  String(user.id_rol     || 2),
      });

      const redirectUrl = `${FRONTEND_URL}/auth/callback?${params.toString()}`;

      // LOG TEMPORAL — ver en Railway logs
      console.log('[Google OAuth] FRONTEND_URL:', FRONTEND_URL);
      console.log('[Google OAuth] Redirect →', redirectUrl);

      res.redirect(redirectUrl);
    } catch (err) {
      console.error('[Google] Error generando token:', err.message);
      const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${FRONTEND_URL}/login?error=token_failed`);
    }
  }
);

export default router;