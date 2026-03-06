import express from 'express';
import passport from 'passport';
import { TokenService } from '../../infrastructure/jwt/tokenService.js';

const router = express.Router();
const tokenService = new TokenService();

// ── Iniciar flujo Google ──────────────────────────
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// ── Callback de Google ────────────────────────────
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/Login?error=google_failed',
        session: false
    }),
    (req, res) => {
        try {
            const user = req.user;
            const token = tokenService.sign({
                id_usuario: user.id_usuario,
                email: user.email,
                id_rol: user.id_rol
            });

            res.redirect(
                `http://localhost:5173/auth/callback?token=${token}&name=${encodeURIComponent(user.nombre)}&email=${encodeURIComponent(user.email)}`
            );
        } catch (error) {
            console.error(' Error generando token Google:', error.message);
            console.error('Usuario recibido:', JSON.stringify(req.user));
            res.redirect('http://localhost:5173/Login?error=token_failed');
        }
    }
);

export default router;