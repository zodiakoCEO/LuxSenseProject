import jwt from 'jsonwebtoken'
import { AuthenticationError } from '../../../../shared/errors/AppError.js'

export class TokenService {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'tu-mega-wondeful-secreto';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '7d'
    }

    sign(payload) {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        })
    }

    verify(token) {
        try {
            return jwt.verify(token, this.secret)
        } catch (error) {
            throw new AuthenticationError('Token invalido o ya expiro')
        }
    }

    decode(token){
        return jwt.decode(token)
    }
}