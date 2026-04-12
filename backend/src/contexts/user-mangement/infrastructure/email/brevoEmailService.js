// infra/email/BrevoEmailService.js
const {
  TransactionalEmailsApi,
  SendSmtpEmail,
} = require('@getbrevo/brevo');
const { brevo } = require('./brevoClient');

class BrevoEmailService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.transactionalApi = new TransactionalEmailsApi(brevo);

    this.templateIds = {
      registrationConfirmation: 1, // pon aquí tus IDs reales de plantilla
      passwordReset: 2,
      criticalNotification: 3,
    };
  }

  async sendRegistrationConfirmation(userId, confirmUrl) {
    const user = await this.userRepository.findById(userId);

    const email = new SendSmtpEmail();
    email.to = [{ email: user.email, name: user.name }];
    email.templateId = this.templateIds.registrationConfirmation;
    email.params = {
      confirmUrl,
      firstName: user.name,
    };

    await this.transactionalApi.sendTransacEmail(email);
  }

  async sendPasswordReset(userId, resetUrl) {
    const user = await this.userRepository.findById(userId);

    const email = new SendSmtpEmail();
    email.to = [{ email: user.email, name: user.name }];
    email.templateId = this.templateIds.passwordReset;
    email.params = {
      resetUrl,
      firstName: user.name,
    };

    await this.transactionalApi.sendTransacEmail(email);
  }

  async sendCriticalNotification(userId, templateKey, params) {
    const user = await this.userRepository.findById(userId);
    const templateId = this.templateIds[templateKey];

    if (!templateId) {
      throw new Error(`Template key desconocida: ${templateKey}`);
    }

    const email = new SendSmtpEmail();
    email.to = [{ email: user.email, name: user.name }];
    email.templateId = templateId;
    email.params = params;

    await this.transactionalApi.sendTransacEmail(email);
  }
}

module.exports = { BrevoEmailService };