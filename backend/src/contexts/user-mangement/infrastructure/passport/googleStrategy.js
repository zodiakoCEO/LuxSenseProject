import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getMysqlPool } from '../../../../config/database.js';

export function initGoogleStrategy() {
  passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const pool  = await getMysqlPool();
      const email = profile.emails?.[0]?.value;

      if (!email) return done(new Error('No se pudo obtener el email de Google'), null);

      // 1. Buscar usuario existente
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?', [email]
      );

      if (rows.length) return done(null, rows[0]);

      // 2. Usuario nuevo — insertar sin email_verified (usa DEFAULT 0)
      //    Luego actualizamos email_verified=1 en query separada
      const [result] = await pool.query(
        `INSERT INTO usuarios (email, nombre, password_hash, id_rol)
         VALUES (?, ?, 'GOOGLE_OAUTH', 2)`,
        [email, profile.displayName]
      );

      // 3. Marcar email como verificado (Google ya lo verificó)
      await pool.query(
        'UPDATE usuarios SET email_verified = 1 WHERE id_usuario = ?',
        [result.insertId]
      );

      // 4. Obtener usuario completo
      const [newUser] = await pool.query(
        'SELECT * FROM usuarios WHERE id_usuario = ?',
        [result.insertId]
      );

      return done(null, newUser[0]);

    } catch (err) {
      console.error('[GoogleStrategy] Error:', err.message);
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id_usuario));

  passport.deserializeUser(async (id, done) => {
    try {
      const pool = await getMysqlPool();
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE id_usuario = ?', [id]
      );
      done(null, rows[0] || null);
    } catch (err) {
      done(err, null);
    }
  });
}