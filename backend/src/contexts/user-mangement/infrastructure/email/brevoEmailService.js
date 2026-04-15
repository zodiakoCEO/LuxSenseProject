import { sendBrevoEmail } from './brevoClient.js';

export class BrevoEmailService {
  constructor() {
    this.sender = {
      name:  process.env.BREVO_SENDER_NAME  || 'LuxSense',
      email: process.env.BREVO_SENDER_EMAIL || 'no-reply@luxsense.online'
    };
    this.replyTo = {
      name:  process.env.BREVO_REPLY_TO_NAME  || 'LuxSense',
      email: process.env.BREVO_REPLY_TO_EMAIL || 'support@luxsense.online'
    };
  }

  async #send({ to, subject, html }) {
    try {
      return await sendBrevoEmail({
        sender:      this.sender,
        replyTo:     this.replyTo,
        to:          [to],
        subject,
        htmlContent: html
      });
    } catch (err) {
      throw new Error(`Brevo: ${err.message}`);
    }
  }

  sendWelcomeVerification(user, verificationUrl) {
    return this.#send({
      to:      { email: user.email, name: user.nombre || '' },
      subject: '¡Bienvenido a LuxSense! Verifica tu correo',
      html:    verificationHtml(user.nombre, verificationUrl)
    });
  }

  sendPasswordReset(user, resetUrl) {
    return this.#send({
      to:      { email: user.email, name: user.nombre || '' },
      subject: 'Recuperación de contraseña — LuxSense',
      html:    resetHtml(user.nombre, resetUrl)
    });
  }
}

/* ── Templates ─────────────────────────────────── */

function verificationHtml(nombre, url) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#0f0f0f;padding:40px 0">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0"
  style="background:#1a1a1a;border-radius:12px;overflow:hidden;max-width:560px;width:100%">
  <tr><td style="background:#7c3aed;padding:28px 40px;text-align:center">
    <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700">LuxSense</h1>
    <p style="margin:6px 0 0;color:#ddd6fe;font-size:13px">Sistema de monitoreo inteligente</p>
  </td></tr>
  <tr><td style="padding:36px 40px">
    <h2 style="margin:0 0 14px;color:#f1f5f9;font-size:20px;font-weight:600">
      ¡Bienvenido, ${nombre}! </h2>
    <p style="margin:0 0 20px;color:#94a3b8;font-size:14px;line-height:1.6">
      Tu cuenta fue creada. Para activarla verifica tu correo.
      El enlace expira en <strong style="color:#c4b5fd">24 horas</strong>.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px">
      <tr><td style="background:#7c3aed;border-radius:8px">
        <a href="${url}"
          style="display:inline-block;padding:13px 28px;color:#fff;
                 text-decoration:none;font-size:15px;font-weight:600">
          Verificar mi correo →
        </a>
      </td></tr>
    </table>
    <p style="margin:0;color:#64748b;font-size:12px;line-height:1.5">
      O copia este enlace: <a href="${url}" style="color:#a78bfa;word-break:break-all">${url}</a>
    </p>
  </td></tr>
  <tr><td style="padding:20px 40px;border-top:1px solid #2d2d2d;text-align:center">
    <p style="margin:0;color:#475569;font-size:11px">
      Si no creaste esta cuenta, ignora este correo.<br>
      © ${new Date().getFullYear()} LuxSense.
    </p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

function resetHtml(nombre, url) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"
  style="background:#0f0f0f;padding:40px 0">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0"
  style="background:#1a1a1a;border-radius:12px;overflow:hidden;max-width:560px;width:100%">
  <tr><td style="background:#dc2626;padding:28px 40px;text-align:center">
    <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700">LuxSense</h1>
    <p style="margin:6px 0 0;color:#fecaca;font-size:13px">Recuperación de contraseña</p>
  </td></tr>
  <tr><td style="padding:36px 40px">
    <h2 style="margin:0 0 14px;color:#f1f5f9;font-size:20px;font-weight:600">
      Hola, ${nombre}</h2>
    <p style="margin:0 0 20px;color:#94a3b8;font-size:14px;line-height:1.6">
      Recibimos una solicitud para restablecer tu contraseña.
      El enlace expira en <strong style="color:#fca5a5">1 hora</strong>.
    </p>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px">
      <tr><td style="background:#dc2626;border-radius:8px">
        <a href="${url}"
          style="display:inline-block;padding:13px 28px;color:#fff;
                 text-decoration:none;font-size:15px;font-weight:600">
          Restablecer contraseña →
        </a>
      </td></tr>
    </table>
    <p style="margin:0 0 14px;color:#64748b;font-size:12px;line-height:1.5">
      O copia: <a href="${url}" style="color:#fca5a5;word-break:break-all">${url}</a>
    </p>
    <p style="margin:0;color:#ef4444;font-size:12px;font-weight:500">
      Si no lo solicitaste, ignora este correo.
    </p>
  </td></tr>
  <tr><td style="padding:20px 40px;border-top:1px solid #2d2d2d;text-align:center">
    <p style="margin:0;color:#475569;font-size:11px">
      © ${new Date().getFullYear()} LuxSense. Todos los derechos reservados.
    </p>
  </td></tr>
</table></td></tr></table></body></html>`;
}