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
      const pool = await getMysqlPool();
      const email = profile.emails[0].value;

      const [rows] = await pool.execute(
        'SELECT * FROM usuarios WHERE email = ?', [email]);

      if (rows.length) return done(null, rows[0]);

      // Usuario nuevo — Google ya verificó el email
      const [result] = await pool.execute(
        `INSERT INTO usuarios
           (email, nombre, password_hash, id_rol, email_verified)
         VALUES (?, ?, 'GOOGLE_OAUTH', 2, TRUE)`,
        [email, profile.displayName]
      );

      const [newUser] = await pool.execute(
        'SELECT * FROM usuarios WHERE id_usuario = ?', [result.insertId]);

      return done(null, newUser[0]);
    } catch (err) {
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id_usuario));

  passport.deserializeUser(async (id, done) => {
    try {
      const pool = await getMysqlPool();
      const [rows] = await pool.execute(
        'SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
      done(null, rows[0] || null);
    } catch (err) {
      done(err, null);
    }
  });
}