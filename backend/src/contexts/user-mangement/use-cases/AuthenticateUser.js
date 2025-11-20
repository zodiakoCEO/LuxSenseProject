import bcrypt from 'bcrypt'
import { AuthenticationError } from '../../../shared/errors/AppError.js'

export class AuthenticateUser {
    constructor (userRepository, tokenService) {
        this.userRepository = userRepository,
        this.tokenService = tokenService
    }

    async execute(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AuthenticationError('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        )
        if (!isPasswordValid) {
            throw new AuthenticationError('Clave invalida')
        }

        const token = this.tokenService.sign({
            id_usuario: user.id_usuario,
            email: user.email,
            id_rol: user.id_rol
        })

        return {
            token,
            user: user.toJSON()
        }
    }
}