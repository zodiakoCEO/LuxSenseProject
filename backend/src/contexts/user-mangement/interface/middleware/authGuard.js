import { TokenService } from '../../infrastructure/jwt/tokenService.js'

const tokenService = new TokenService();

export const authGuard = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                error: 'Header de autorizacion invalido o no se encuentra'
            })            
        }

        const token = authHeader.substring(7)
        const decoded = tokenService.verify(token)

        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message
        })
    }
}