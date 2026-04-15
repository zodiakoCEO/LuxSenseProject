/**
 * Middleware de autenticación para dispositivos físicos (ESP32, etc.)
 * Valida la cabecera x-device-key contra la variable de entorno DEVICE_API_KEY
 */
export function deviceAuth(req, res, next) {
    const key = req.headers['x-device-key'];

    if (!key) {
        return res.status(401).json({
            success: false,
            error: { message: 'x-device-key header requerido' }
        });
    }

    if (key !== process.env.DEVICE_API_KEY) {
        return res.status(401).json({
            success: false,
            error: { message: 'Device key inválida' }
        });
    }

    next();
}