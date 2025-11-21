import mysql from 'mysql2/promise.js'
import { MongoClient } from 'mongodb';
import { logger } from '../shared/utils/logger.js';


let mysqlPool = null;
let mongoClient = null;


// ============================================
// MYSQL
// ============================================

export async function getMysqlPool() {
    if (!mysqlPool) {
        try {
            mysqlPool = await mysql.createPool({
                host: process.env.MYSQL_HOST || 'localhost',
                user: process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PASSWORD || '',
                database: process.env.MYSQL_DATABASE || 'UsuariosLuxSenseDB',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log('✅ MySQL Pool creada con éxito');
        } catch (error) {
            console.error('❌ Error creando MySQL Pool:', error.message);
            throw new Error('No se pudo conectar a MySQL');
        }
    }
    return mysqlPool;
}


// ============================================
// MONGODB
// ============================================

export async function getMongoClient() {
    if (!mongoClient) {
        try {
            const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
            console.log('🔗 Intentando conectar a MongoDB:', uri);
            
            mongoClient = new MongoClient(uri, {
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
                socketTimeoutMS: 10000,
                retryWrites: true,
                retryReads: true
            });
            
            await mongoClient.connect();
            
            // Verificar que la conexión funciona
            const adminDb = mongoClient.db('admin');
            await adminDb.command({ ping: 1 });
            
            console.log('✅ Conexión a MongoDB exitosa');
            
        } catch (error) {
            console.error('❌ Error conectando a MongoDB:', error.message);
            mongoClient = null;
            throw new Error(`No se pudo conectar a MongoDB: ${error.message}`);
        }
    }
    return mongoClient;
}


export function getMongoDb() {
    if (!mongoClient) {
        throw new Error('MongoDB no se inicializó correctamente. Llama a getMongoClient() primero.');
    }
    return mongoClient.db(process.env.MONGODB_NAME || 'luxsense');
}


// ============================================
// CERRAR CONEXIONES
// ============================================

export async function closeConnections() {
    try {
        if (mysqlPool) {
            await mysqlPool.end();
            console.log('ℹ️  MySQL Pool cerrado');
        }
        if (mongoClient) {
            await mongoClient.close();
            console.log('ℹ️  MongoDB desconectado');
        }
        console.log('✅ Todas las bases de datos desconectadas correctamente');
    } catch (error) {
        console.error('❌ Error cerrando conexiones:', error.message);
        throw error;
    }
}