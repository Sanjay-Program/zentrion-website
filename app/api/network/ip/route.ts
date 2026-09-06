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

    return NextResponse.json({
      query,
      ipType: isIP(query) === 4 ? 'IPv4' : 'IPv6',
      provider: 'ipwho.is',
      data,
    });
  } catch {
    return NextResponse.json({
      query,
      ipType: isIP(query) === 4 ? 'IPv4' : 'IPv6',
      warning: 'Live IP intelligence provider is currently unreachable.',
    });
  }
}
