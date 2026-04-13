export class UpdateUserProfile {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id_usuario, nombre) {
    return this.userRepository.updateProfile(id_usuario, nombre);
  }
}