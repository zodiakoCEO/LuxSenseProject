export class User {
    constructor ({
        id_usuario,
        email,
        password_hash,
        nombre,
        id_rol,
        fecha_creacion
    }) {
        this.id_usuario = id_usuario;
        this.email = email;
        this.password_hash = password_hash;
        this.nombre = nombre;
        this.id_rol = id_rol;
        this.fecha_creacion = new Date(fecha_creacion);
    }

    toJSON() {
       return {
      id_usuario: this.id_usuario,
      email: this.email,
      nombre: this.nombre,
      id_rol: this.id_rol,
      fecha_creacion: this.fecha_creacion.toISOString()  
        }
    }

    toPublic() {
        return {
            id: this.id_usuario,
            email: this.email,
            nombre: this.nombre,
            rol: this.id_rol
        }
    }
}