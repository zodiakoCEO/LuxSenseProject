export class AmbienteController {
    constructor(ambienteRepository) {
        this.ambienteRepository = ambienteRepository;
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