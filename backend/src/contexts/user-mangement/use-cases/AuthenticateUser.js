import bcrypt from 'bcrypt';
import { AuthenticationError } from '../../../shared/errors/AppError.js';

export class AuthenticateUser {
  constructor(userRepository, tokenService) {
    this.userRepository = userRepository;
    this.tokenService   = tokenService;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AuthenticationError('Credenciales inválidas');

    // Cuentas Google no tienen contraseña local
    if (user.password_hash === 'GOOGLE_OAUTH') {
      throw new AuthenticationError('Esta cuenta usa Google para iniciar sesión');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new AuthenticationError('Credenciales inválidas');

    if (!user.email_verified) {
      throw new AuthenticationError(
        'Debes verificar tu correo antes de iniciar sesión'
      );
    }

    const token = this.tokenService.sign({
      id_usuario: user.id_usuario,
      email:      user.email,
      id_rol:     user.id_rol
    });

    return { token, user: user.toJSON() };
  }
}