export class User {
  constructor ({
    id_usuario, email, password_hash, nombre, id_rol, fecha_creacion,
    email_verified = false,
    verification_token = null,
    verification_token_expires = null,
    reset_token = null,
    reset_token_expires = null
  }) {
    this.id_usuario  = id_usuario;
    this.email       = email;
    this.password_hash = password_hash;
    this.nombre      = nombre;
    this.id_rol      = id_rol;
    this.fecha_creacion = new Date(fecha_creacion);
    this.email_verified = Boolean(email_verified);
    this.verification_token = verification_token;
    this.verification_token_expires = verification_token_expires
      ? new Date(verification_token_expires) : null;
    this.reset_token = reset_token;
    this.reset_token_expires = reset_token_expires
      ? new Date(reset_token_expires) : null;
  }

  toJSON() {
    return {
      id_usuario:    this.id_usuario,
      email:         this.email,
      nombre:        this.nombre,
      id_rol:        this.id_rol,
      fecha_creacion: this.fecha_creacion.toISOString(),
      email_verified: this.email_verified
    };
  }

  toPublic() {
    return {
      id:            this.id_usuario,
      email:         this.email,
      nombre:        this.nombre,
      rol:           this.id_rol,
      email_verified: this.email_verified
    };
  }
}