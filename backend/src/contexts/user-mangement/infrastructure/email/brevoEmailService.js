import { brevo, createTransactionalApi } from './brevoClient.js';

export class BrevoEmailService {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.transactionalApi = createTransactionalApi();

    this.sender = {
      name: process.env.BREVO_SENDER_NAME || 'LuxSense',
      email: process.env.BREVO_SENDER_EMAIL || 'no-reply@luxsense.online'
    };

    this.replyTo = {
      name: process.env.BREVO_REPLY_TO_NAME || 'LuxSense',
      email: process.env.BREVO_REPLY_TO_EMAIL || 'support@luxsense.online'
    };

    this.templateIds = {
      registrationConfirmation: Number(process.env.BREVO_TEMPLATE_REGISTRATION_CONFIRMATION),
      passwordReset: Number(process.env.BREVO_TEMPLATE_PASSWORD_RESET),
      criticalNotification: Number(process.env.BREVO_TEMPLATE_CRITICAL_NOTIFICATION)
    };
  }

  async sendTemplateEmail({ userId, templateKey, params = {} }) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error(`Usuario no encontrado: ${userId}`);
    }

    const templateId = this.templateIds[templateKey];

    if (!templateId) {
      throw new Error(`Template key desconocida o no configurada: ${templateKey}`);
    }

    const email = new brevo.SendSmtpEmail();
    email.sender = this.sender;
    email.replyTo = this.replyTo;
    email.to = [{ email: user.email, name: user.name || '' }];
    email.templateId = templateId;
    email.params = {
      firstName: user.name || '',
      ...params
    };

    try {
      return await this.transactionalApi.sendTransacEmail(email);
    } catch (error) {
      const message =
        error?.response?.text ||
        error?.message ||
        'Error enviando email con Brevo';

      throw new Error(`Brevo send failed: ${message}`);
    }
  }

  async sendRegistrationConfirmation(userId, confirmUrl) {
    return this.sendTemplateEmail({
      userId,
      templateKey: 'registrationConfirmation',
      params: { confirmUrl }
    });
  }

  async sendPasswordReset(userId, resetUrl) {
    return this.sendTemplateEmail({
      userId,
      templateKey: 'passwordReset',
      params: { resetUrl }
    });
  }

  async sendCriticalNotification(userId, params) {
    return this.sendTemplateEmail({
      userId,
      templateKey: 'criticalNotification',
      params
    });
  }
}