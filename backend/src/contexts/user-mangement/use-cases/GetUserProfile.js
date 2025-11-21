export class GetUserProfile {
    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async execute(id_usuario) {
        const user = await this.userRepository.findById(id_usuario)

        if (!user) {
            throw new Error('User not found')
        }

        return user.toJSON()
    }
}