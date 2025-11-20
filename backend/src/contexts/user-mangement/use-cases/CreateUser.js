import bcrypt from 'bcrypt'
import { ValidationError } from '../../../shared/errors/AppError.js'

export class CreateUser {
    constructor(userRepository, eventBus) {
        this.userRepository = userRepository,
        this.eventBus = eventBus
    }

    async execute(email,password,nombre){
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new ValidationError('El usaurio ya existe')
        }

        const password_hash = await bcrypt.hash(password, 10)

        const user = await this.userRepository.create(
            email,
            password_hash,
            nombre
        );

        await this.eventBus.publish('usuario:creado', {
            id_usuario: user.id_usuario,
            email: user.email,
            nombre: user.nombre
        })

        return user
    }
}