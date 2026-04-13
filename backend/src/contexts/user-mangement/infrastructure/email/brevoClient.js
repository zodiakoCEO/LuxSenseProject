const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendBrevoEmail({ sender, replyTo, to, subject, htmlContent }) {
  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'accept':       'application/json',
      'content-type': 'application/json',
      'api-key':      process.env.BREVO_API_KEY
    },
    body: JSON.stringify({ sender, replyTo, to, subject, htmlContent })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API error ${response.status}: ${error}`);
  }

  return response.json();
}