export class UpdateAmbienteEstado {
    constructor(ambienteRepository, eventBus) {
        this.ambienteRepository = ambienteRepository;
        this.eventBus = eventBus;
    }

    async execute({ sensor_id, estado }) {
        const activo = estado === 'encendido';

        const ambiente = await this.ambienteRepository.updateEstadoBySensorId(sensor_id, activo);

        if (!ambiente) {
            const error = new Error(`No existe ningún ambiente asociado al sensor_id: ${sensor_id}`);
            error.statusCode = 404;
            throw error;
        }

        await this.eventBus.publish('ambiente:estado_changed', {
            ambiente_id: ambiente._id.toString(),
            sensor_id,
            nombre: ambiente.nombre,
            icono: ambiente.icono,
            id_usuario: ambiente.id_usuario,
            activo,
            estado,
            ultima_actividad: ambiente.ultima_actividad,
            timestamp: new Date().toISOString()
        });

        return ambiente;
    }
}