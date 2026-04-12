class RegisterUser {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async execute(input) {
    const { email, name } = input;

    const user = await this.userRepository.create({
      email,
      name,
      isVerified: false,
    });

    const token = 'token-generado'; // genera y guarda en DB
    await this.userRepository.saveVerificationToken(user.id, token);

    const confirmUrl = `https://luxsense.app/verify?token=${token}`;

    await this.emailService.sendRegistrationConfirmation(user.id, confirmUrl);
  }
}

module.exports = { RegisterUser };