export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message) {
        super(message, 400)
    }
}

export class NotFoundError extends AppError {
    constructor (message = 'Recurso no encontrado') {
        super(message, 404)
    }
}

export class AuthenticationError extends AppError {
    constructor(message = 'No autorizado') {
        super(message, 401)
    }
}

export class ForbiddenError extends AppError {
    constructor (message = 'Prohibido') {
        super (message, 403)
    }
}