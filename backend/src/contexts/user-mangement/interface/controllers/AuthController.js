import { ValidationError } from '../../../../shared/errors/AppError.js'

export class AuthController {
    constructor(createUser, authenticateUser, getUserProfile) {
        this.createUser = createUser,
        this.authenticateUser = authenticateUser,
        this.getUserProfile = getUserProfile
    }

    async register (req,res, next) {
        try {
            const { email, password, nombre} = req.body

            if (!email || !password || !nombre) {
                throw new ValidationError('Email, contrasena y nombre son requeridos')
            }

            const user = await this.createUser.execute(email, password, nombre)

            res.status(201).json ({
                success: true,
                message: 'Usuario creado correctamente',
                data: user.toJSON()
            })
        } catch (error) {
            next (error)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                throw new ValidationError('Email y constrasena son requeridos')
            }

            const result = await this.authenticateUser.execute(email, password)

            res.json({
                success: true,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

      async getProfile(req, res, next) {
        try {
            const { id_usuario } = req.user;

            const userProfile = await this.getUserProfile.execute(id_usuario);

        res.json({
            success: true,
            data: userProfile
        });
        } catch (error) {
        next(error);
        }
    }
}

