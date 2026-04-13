import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const brevo = require('@getbrevo/brevo');

export function createTransactionalApi() {
  const api = new brevo.TransactionalEmailsApi();
  api.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );
  return api;
}

export { brevo };