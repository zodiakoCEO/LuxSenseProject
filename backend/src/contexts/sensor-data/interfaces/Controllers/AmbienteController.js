export class AmbienteController {
    constructor(ambienteRepository, updateAmbienteEstado = null) {
        this.ambienteRepository = ambienteRepository;
        this.updateAmbienteEstado = updateAmbienteEstado;
    }

    async create(req, res, next) {
        try {
            const { nombre, icono, sensor_id } = req.body;
            const id_usuario = req.user.id_usuario;

            if (!nombre) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'El nombre del ambiente es requerido' }
                });
            }

            const ambiente = await this.ambienteRepository.create({
                nombre,
                icono: icono || '💡',
                sensor_id: sensor_id || null,
                id_usuario
            });

            res.status(201).json({ success: true, data: ambiente });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const id_usuario = req.user.id_usuario;
            const ambientes = await this.ambienteRepository.findByUsuario(id_usuario);
            res.json({ success: true, data: ambientes });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/ambientes/activos — devuelve solo los ambientes activos del usuario
    async getActivos(req, res, next) {
        try {
            const id_usuario = req.user.id_usuario;
            const activos = await this.ambienteRepository.findActivos(id_usuario);
            res.json({ success: true, data: activos });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/ambientes/evento — recibe eventos del ESP32 (autenticado con deviceAuth)
    async registrarEvento(req, res, next) {
        try {
            const { sensor_id, estado } = req.body;

            if (!sensor_id || !estado) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'sensor_id y estado son requeridos' }
                });
            }

            if (!['encendido', 'apagado'].includes(estado)) {
                return res.status(400).json({
                    success: false,
                    error: { message: 'estado debe ser "encendido" o "apagado"' }
                });
            }

            if (!this.updateAmbienteEstado) {
                return res.status(500).json({
                    success: false,
                    error: { message: 'UpdateAmbienteEstado no configurado' }
                });
            }

            const ambiente = await this.updateAmbienteEstado.execute({ sensor_id, estado });

            res.status(200).json({
                success: true,
                data: {
                    ambiente_id: ambiente._id.toString(),
                    nombre: ambiente.nombre,
                    activo: ambiente.activo,
                    ultima_actividad: ambiente.ultima_actividad
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const ambiente = await this.ambienteRepository.update(id, data);
            res.json({ success: true, data: ambiente });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.ambienteRepository.delete(id);
            res.json({ success: true, message: 'Ambiente eliminado' });
        } catch (error) {
            next(error);
        }
    }
}