import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class CreateUser {
  constructor(userRepository, eventBus, emailService) {
    this.userRepository = userRepository;
    this.eventBus       = eventBus;
    this.emailService   = emailService;
  }

  async execute(email, password, nombre) {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new ValidationError('El usuario ya existe');

    const password_hash       = await bcrypt.hash(password, 10);
    const verificationToken   = crypto.randomBytes(32).toString('hex');
    const tokenExpires        = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const user = await this.userRepository.create(
      email, password_hash, nombre, 2, verificationToken, tokenExpires
    );

    await this.eventBus.publish('usuario:creado', {
      id_usuario: user.id_usuario,
      email:      user.email,
      nombre:     user.nombre
    });

    const base = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `${base}/verify-email?token=${verificationToken}`;

    try {
      await this.emailService.sendWelcomeVerification(user, verificationUrl);
    } catch (err) {
      // No interrumpir el registro si falla el email
      console.error('[Email] Error enviando verificación:', err.message);
    }

    return user;
  }
}