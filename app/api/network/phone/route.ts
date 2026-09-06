import { NextResponse } from 'next/server';

const countryHints: Array<{ code: string; country: string }> = [
  { code: '+1', country: 'United States / Canada' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+91', country: 'India' },
];

function normalizePhone(raw: string) {
  const cleaned = raw.replace(/[\s()-]/g, '');
  if (cleaned.startsWith('+')) return `+${cleaned.slice(1).replace(/\D/g, '')}`;
  return cleaned.replace(/\D/g, '');
}

function toE164(normalized: string) {
  return normalized.startsWith('+') ? normalized : `+${normalized}`;
}

function guessCountry(e164: string) {
  const match = countryHints.find((item) => e164.startsWith(item.code));
  return match?.country || 'Unknown';
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query) {
    return NextResponse.json({ error: 'Please provide a phone number.' }, { status: 400 });
  }

  const normalized = normalizePhone(query);
  const e164 = toE164(normalized);
  const valid = /^\+[1-9]\d{6,14}$/.test(e164);

  return NextResponse.json({
    input: query,
    normalized: e164,
    valid,
    internationalFormat: e164,
    digitCount: e164.replace('+', '').length,
    countryHint: valid ? guessCountry(e164) : 'Invalid',
  });
}
