// infra/email/brevoClient.js
const { BrevoClient } = require('@getbrevo/brevo');

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
  timeoutInSeconds: 60,
  maxRetries: 2,
});

module.exports = { brevo };