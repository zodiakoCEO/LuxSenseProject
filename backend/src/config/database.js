import mysql from 'mysql2/promise.js'
import {MongoClient} from 'mongodb';

let mysqlPool = null;
let mongoClient = null;

// MySQL

export async function getMysqlPool() {
    if (!mysqlPool) {
        mysqlPool = await mysql.createPool({
            host: process.env.MYSQL_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DATABASE || 'UsuariosLuxSenseDB',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('MySQL Pool creada con exito');
    }
    return mysqlPool
}

// MongoDB

export async function getMongoClient() {
    if (!mongoClient) {
        mongoClient = new MongoClient(
            process.env.MONGODB_URI || 'mongodb://localhost:27017'
        )
        await mongoClient.connect();
        console.log('Conexion a mongoDB exitosa')
    }
    return mongoClient;
}

export function getMongoDb() {
    if (!mongoClient) throw new Error('MongoDB no se inicializo correctamente');
    return mongoClient.db(process.env.MONGODB_NAME || 'luxsense')
}

export async function closeConnections() {
    if (mysqlPool) await mysqlPool.end();
    if(mongoClient) await mongoClient.close()
    console.log('Bases de datos desconectadas correctamente')
}