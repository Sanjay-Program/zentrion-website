export const CONTACT_WHATSAPP = '917305771789';

// General business, sales, services & consultation inquiries
export const CONSULT_EMAIL = 'consultancy@zentriontechnologies.com';

// Careers, internships & HR communication
export const HR_EMAIL = 'hr@zentriontechnologies.com';

// Default email used by the generic contact form / mailto helper
export const CONTACT_EMAIL = CONSULT_EMAIL;

export const COMPANY_ADDRESS =
  'Chennai, Tamil Nadu, India';

export const MAPS_LINK = 'https://maps.app.goo.gl/8inA3Sy9FR8fsdXM8';

export const INTERNSHIP_APPLICATION_FORM = 'https://forms.gle/aLGPRe9tkRfkJgXv7';

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoLink(subject: string, body: string, email: string = CONTACT_EMAIL) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
