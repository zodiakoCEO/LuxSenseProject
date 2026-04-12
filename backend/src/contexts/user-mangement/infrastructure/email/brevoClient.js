import brevo from '@getbrevo/brevo';

export function createTransactionalApi() {
  const api = new brevo.TransactionalEmailsApi();
  api.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );
  return api;
}

export { brevo };