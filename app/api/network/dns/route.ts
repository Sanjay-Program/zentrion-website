import { resolve4, resolve6, resolveMx, resolveNs, resolveTxt, resolveCname } from 'node:dns/promises';
import { NextResponse } from 'next/server';

function isValidDomain(domain: string) {
  return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain) && !domain.includes('..');
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query')?.trim() || '';

  if (!query || !isValidDomain(query)) {
    return NextResponse.json({ error: 'Please provide a valid domain.' }, { status: 400 });
  }

  const [a, aaaa, mx, ns, txt, cname] = await Promise.allSettled([
    resolve4(query),
    resolve6(query),
    resolveMx(query),
    resolveNs(query),
    resolveTxt(query),
    resolveCname(query),
  ]);

  const result = {
    domain: query,
    records: {
      A: a.status === 'fulfilled' ? a.value : [],
      AAAA: aaaa.status === 'fulfilled' ? aaaa.value : [],
      MX: mx.status === 'fulfilled' ? mx.value : [],
      NS: ns.status === 'fulfilled' ? ns.value : [],
      TXT: txt.status === 'fulfilled' ? txt.value.map((parts) => parts.join('')) : [],
      CNAME: cname.status === 'fulfilled' ? cname.value : [],
    },
  };

  return NextResponse.json(result);
}
