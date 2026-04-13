import express from 'express';
import passport from 'passport';
import { TokenService } from '../../infrastructure/jwt/tokenService.js';

const router = express.Router();
const tokenService = new TokenService();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    // ← Fix: usa env var, no localhost hardcodeado
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
    session: false
  }),
  (req, res) => {
    try {
      const user  = req.user;
      const token = tokenService.sign({
        id_usuario: user.id_usuario,
        email:      user.email,
        id_rol:     user.id_rol
      });
      const params = new URLSearchParams({
        token,
        name:  user.nombre || '',
        email: user.email
      });
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?${params}`);
    } catch (err) {
      console.error('[Google] Error generando token:', err.message);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=token_failed`);
    }
  }
);

export default router;