export class AmbienteRepository {
    constructor(collection) {
        this.collection = collection;
    }

    async create(ambiente) {
        const doc = {
            nombre: ambiente.nombre,
            icono: ambiente.icono || '💡',
            sensor_id: ambiente.sensor_id || null,
            activo: false,
            ultima_actividad: null,
            id_usuario: ambiente.id_usuario,
            fecha_creacion: new Date()
        };
        const result = await this.collection.insertOne(doc);
        return { ...doc, _id: result.insertedId };
    }

    async findByUsuario(id_usuario) {
        return await this.collection.find({ id_usuario }).toArray();
    }

    async findById(id) {
        const { ObjectId } = await import('mongodb');
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async findBySensorId(sensor_id) {
        return await this.collection.findOne({ sensor_id });
    }

    // Actualiza el estado activo/inactivo buscando por sensor_id
    async updateEstadoBySensorId(sensor_id, activo) {
        const result = await this.collection.findOneAndUpdate(
            { sensor_id },
            { $set: { activo, ultima_actividad: new Date() } },
            { returnDocument: 'after' }
        );
        return result; // null si sensor_id no existe en ningún ambiente
    }

    // Devuelve ambientes activos filtrados por usuario
    async findActivos(id_usuario) {
        return await this.collection
            .find({ activo: true, id_usuario })
            .toArray();
    }

    async update(id, data) {
        const { ObjectId } = await import('mongodb');
        await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        );
        return await this.findById(id);
    }

    async delete(id) {
        const { ObjectId } = await import('mongodb');
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
}