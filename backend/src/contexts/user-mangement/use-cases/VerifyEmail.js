import { ValidationError } from '../../../shared/errors/AppError.js';

export class VerifyEmail {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(token) {
    if (!token) throw new ValidationError('Token requerido');

    const user = await this.userRepository.findByVerificationToken(token);
    if (!user) throw new ValidationError('Token inválido o ya fue usado');

    if (user.email_verified) return { alreadyVerified: true };

    if (user.verification_token_expires &&
        new Date() > user.verification_token_expires) {
      throw new ValidationError(
        'El token expiró. Solicita un nuevo correo de verificación.'
      );
    }

    await this.userRepository.markEmailVerified(user.id_usuario);
    return { success: true, email: user.email };
  }
}