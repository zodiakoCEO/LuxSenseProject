import crypto from 'crypto';

export class ForgotPassword {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService   = emailService;
  }

  async execute(email) {
    const user = await this.userRepository.findByEmail(email);

    // Respuesta siempre igual — evita user enumeration
    if (!user) return { success: true };

    // Cuentas Google no tienen contraseña local
    if (user.password_hash === 'GOOGLE_OAUTH') return { success: true };

    const resetToken   = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await this.userRepository.saveResetToken(
      user.id_usuario, resetToken, resetExpires
    );

    const base     = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${base}/reset-password?token=${resetToken}`;

    try {
      await this.emailService.sendPasswordReset(user, resetUrl);
    } catch (err) {
      console.error('[Email] Error enviando reset:', err.message);
    }

    return { success: true };
  }
}