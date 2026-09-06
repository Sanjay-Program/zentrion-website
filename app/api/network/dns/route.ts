import { NextResponse } from 'next/server';

function isValidDomain(domain: string) {
  return /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(domain);
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim().toLowerCase() || '';

  if (!query || !isValidDomain(query)) {
    return NextResponse.json({ error: 'Please provide a valid domain.' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(query)}&type=A`,
      {
        headers: { Accept: 'application/dns-json' },
        signal: AbortSignal.timeout(7000),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `DNS request failed with status ${response.status}.` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const records = Array.isArray(data.Answer)
      ? data.Answer.filter((record: { type?: number }) => record.type === 1).map(
          (record: { name: string; data: string; TTL: number }) => ({
            name: record.name,
            type: 'A',
            address: record.data,
            ttl: record.TTL,
          })
        )
      : [];

    if (records.length === 0) {
      return NextResponse.json(
        {
          domain: query,
          records: [],
          count: 0,
          timestamp: new Date().toISOString(),
          source: 'Cloudflare DNS-over-HTTPS',
          message: 'No IPv4 A records found.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      domain: query,
      records,
      count: records.length,
      timestamp: new Date().toISOString(),
      source: 'Cloudflare DNS-over-HTTPS',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to query DNS infrastructure. Please try again.' },
      { status: 502 }
    );
  }
}
