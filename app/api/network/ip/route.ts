import { isIP } from 'node:net';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query || isIP(query) === 0) {
    return NextResponse.json({ error: 'Please provide a valid IPv4 or IPv6 address.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(query)}`, {
      signal: AbortSignal.timeout(6000),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Unable to fetch IP intelligence right now.');
    }

    const data = await response.json();

    if (data.success === false) {
      return NextResponse.json({ error: data.message || 'Lookup failed.' }, { status: 400 });
    }

    const intelligence = {
      ip: data.ip || query,
      country: data.country || null,
      countryCode: data.country_code || null,
      region: data.region || null,
      regionName: data.region || null,
      city: data.city || null,
      zip: data.postal || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      timezone: data.timezone?.id || data.timezone || null,
      isp: data.connection?.isp || null,
      organization: data.connection?.org || null,
      autonomousSystem: data.connection?.asn || null,
      reverseDns: data.connection?.domain || null,
      timestamp: new Date().toISOString(),
      source: 'ipwho.is',
    };

    return NextResponse.json({
      query,
      ipType: isIP(query) === 4 ? 'IPv4' : 'IPv6',
      intelligence,
    });
  } catch {
    return NextResponse.json({
      query,
      ipType: isIP(query) === 4 ? 'IPv4' : 'IPv6',
      warning: 'Live IP intelligence provider is currently unreachable.',
    });
  }
}
