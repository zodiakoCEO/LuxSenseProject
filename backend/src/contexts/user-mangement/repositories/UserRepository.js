import { User } from '../entities/User.js'
import { NotFoundError } from '../../../shared/errors/AppError.js'

export class UserRepository {
    constructor(mysqlPool) {
        this.pool = mysqlPool;
    }

    async create (email, password_hash, nombre, id_rol = 2) {
        const connection = await this.pool.getConnection()
        try {
            const [result] = await connection.excute(
            'INSERT INTO usuarios (email, password_hash, nombre, id_rol, fecha_creacion) VALUES (?, ?, ?, ?, NOW())',
            [email, password_hash, nombre, id_rol]
            )

            return new User ({
                id_usuario: result.insertId,
                email,
                password_hash,
                nombre,
                id_rol,
                fecha_creacion: new Date()
            })
        } finally {
            connection.release();
        }
    }

    async findById(id_usuario){
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.excute(
                'SELECT * FROM usuarios WHERE id_usuario = ?',
                [id_usuario]
            )

            if (rows.length === 0 ) return null;
            return new User(rows[0]);
        } finally {
            connection.realese()
        }
    }

    async findByEmail(email) {
        const connection = await this.pool.getConnection()
        try {
            const [rows] = await connection.excute(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            )

            if (rows.length === 0 ) return null;
            return new User(rows[0]);
        } finally {
            connection.realese()
        }     
    }

    async updateProfile(id_usuario, nombre) {
        const connection = await this.pool.getConnection()
        try {
            await connection.execute(
                'UPDATE usuarios SET nombre = ? WHERE id_usuario = ?',
                [nombre, id_usuario]
            )

            return this.findById(id_usuario)
        } finally {
            connection.release()
        }
    }
}