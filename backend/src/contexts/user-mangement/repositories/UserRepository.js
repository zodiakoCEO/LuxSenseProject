import { User } from '../entities/User.js';

export class UserRepository {
  constructor(mysqlPool) {
    this.pool = mysqlPool;
  }

  async create(email, password_hash, nombre, id_rol = 2,
               verificationToken = null, tokenExpires = null) {
    const conn = await this.pool.getConnection();
    try {
      const [result] = await conn.execute(
        `INSERT INTO usuarios
           (email, password_hash, nombre, id_rol, fecha_creacion,
            email_verified, verification_token, verification_token_expires)
         VALUES (?, ?, ?, ?, NOW(), FALSE, ?, ?)`,
        [email, password_hash, nombre, id_rol, verificationToken, tokenExpires]
      );
      return new User({
        id_usuario: result.insertId, email, password_hash,
        nombre, id_rol, fecha_creacion: new Date(),
        email_verified: false,
        verification_token: verificationToken,
        verification_token_expires: tokenExpires
      });
    } finally { conn.release(); }
  }

  async findById(id_usuario) {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.execute(
        'SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
      return rows.length ? new User(rows[0]) : null;
    } finally { conn.release(); }
  }

  async findByEmail(email) {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.execute(
        'SELECT * FROM usuarios WHERE email = ?', [email]);
      return rows.length ? new User(rows[0]) : null;
    } finally { conn.release(); }
  }

  async findByVerificationToken(token) {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.execute(
        'SELECT * FROM usuarios WHERE verification_token = ?', [token]);
      return rows.length ? new User(rows[0]) : null;
    } finally { conn.release(); }
  }

  async markEmailVerified(id_usuario) {
    const conn = await this.pool.getConnection();
    try {
      await conn.execute(
        `UPDATE usuarios
         SET email_verified = TRUE,
             verification_token = NULL,
             verification_token_expires = NULL
         WHERE id_usuario = ?`, [id_usuario]);
      return this.findById(id_usuario);
    } finally { conn.release(); }
  }

  async saveResetToken(id_usuario, token, expires) {
    const conn = await this.pool.getConnection();
    try {
      await conn.execute(
        'UPDATE usuarios SET reset_token = ?, reset_token_expires = ? WHERE id_usuario = ?',
        [token, expires, id_usuario]);
    } finally { conn.release(); }
  }

  async findByResetToken(token) {
    const conn = await this.pool.getConnection();
    try {
      const [rows] = await conn.execute(
        'SELECT * FROM usuarios WHERE reset_token = ?', [token]);
      return rows.length ? new User(rows[0]) : null;
    } finally { conn.release(); }
  }

  async updatePassword(id_usuario, password_hash) {
    const conn = await this.pool.getConnection();
    try {
      await conn.execute(
        `UPDATE usuarios
         SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL
         WHERE id_usuario = ?`, [password_hash, id_usuario]);
    } finally { conn.release(); }
  }

  async updateProfile(id_usuario, nombre) {
    const conn = await this.pool.getConnection();
    try {
      await conn.execute(
        'UPDATE usuarios SET nombre = ? WHERE id_usuario = ?', [nombre, id_usuario]);
      return this.findById(id_usuario);
    } finally { conn.release(); }
  }
}