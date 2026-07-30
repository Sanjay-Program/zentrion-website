export const CONTACT_WHATSAPP = '917305771789';
export const CONTACT_EMAIL = 'support@zentriontechnologies.com';

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoLink(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
