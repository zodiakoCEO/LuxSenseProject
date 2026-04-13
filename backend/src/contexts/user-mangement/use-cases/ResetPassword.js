import bcrypt from 'bcrypt';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class ResetPassword {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(token, newPassword) {
    if (!token || !newPassword) {
      throw new ValidationError('Token y nueva contraseña son requeridos');
    }
    if (newPassword.length < 8) {
      throw new ValidationError('La contraseña debe tener al menos 8 caracteres');
    }

    const user = await this.userRepository.findByResetToken(token);
    if (!user) throw new ValidationError('Token inválido o ya fue usado');

    if (user.reset_token_expires && new Date() > user.reset_token_expires) {
      throw new ValidationError(
        'El token expiró. Solicita un nuevo enlace de recuperación.'
      );
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updatePassword(user.id_usuario, password_hash);

    return { success: true };
  }
}