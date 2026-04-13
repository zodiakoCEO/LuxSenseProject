import { ValidationError } from '../../../../shared/errors/AppError.js';
import { getMysqlPool } from '../../../../config/database.js';

export class AuthController {
  constructor(
    createUser, authenticateUser, getUserProfile,
    verifyEmail, forgotPassword, resetPassword   // ← nuevos
  ) {
    this.createUser       = createUser;
    this.authenticateUser = authenticateUser;
    this.getUserProfile   = getUserProfile;
    this.verifyEmail      = verifyEmail;
    this.forgotPassword   = forgotPassword;
    this.resetPassword    = resetPassword;
  }

  async register(req, res, next) {
    try {
      const { email, password, nombre } = req.body;
      if (!email || !password || !nombre)
        throw new ValidationError('Email, contraseña y nombre son requeridos');
      const user = await this.createUser.execute(email, password, nombre);
      res.status(201).json({
        success: true,
        message: 'Cuenta creada. Revisa tu correo para verificarla.',
        data: user.toJSON()
      });
    } catch (err) { next(err); }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new ValidationError('Email y contraseña son requeridos');
      const result = await this.authenticateUser.execute(email, password);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  }

  async verifyEmailHandler(req, res, next) {
    try {
      const { token } = req.query;
      const result = await this.verifyEmail.execute(token);
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  }

  async forgotPasswordHandler(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) throw new ValidationError('Email es requerido');
      await this.forgotPassword.execute(email);
      res.json({
        success: true,
        message: 'Si el correo existe, recibirás instrucciones en breve.'
      });
    } catch (err) { next(err); }
  }

  async resetPasswordHandler(req, res, next) {
    try {
      const { token, newPassword } = req.body;
      await this.resetPassword.execute(token, newPassword);
      res.json({ success: true, message: 'Contraseña restablecida correctamente.' });
    } catch (err) { next(err); }
  }

  async getProfile(req, res, next) {
    try {
      const userProfile = await this.getUserProfile.execute(req.user.id_usuario);
      res.json({ success: true, data: userProfile });
    } catch (err) { next(err); }
  }

  async updateProfile(req, res, next) {
    try {
      const { id_usuario } = req.user;
      const { nombre, email, avatar_url } = req.body;
      const pool = await getMysqlPool();
      const fields = [], values = [];
      if (nombre)              { fields.push('nombre = ?');    values.push(nombre); }
      if (email)               { fields.push('email = ?');     values.push(email); }
      if (avatar_url !== undefined) { fields.push('avatar_url = ?'); values.push(avatar_url); }
      if (!fields.length) {
        return res.status(400).json({ success: false,
          error: { message: 'No hay campos para actualizar' } });
      }
      values.push(id_usuario);
      await pool.execute(
        `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`, values
      );
      const [rows] = await pool.execute(
        'SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]
      );
      res.json({ success: true, data: rows[0] });
    } catch (err) { next(err); }
  }
}