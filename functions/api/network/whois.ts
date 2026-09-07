export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  let domain = urlParams.get('domain')?.trim();

  if (!domain) {
    return Response.json({ error: 'Please provide a domain.' }, { status: 400 });
  }

  // Basic sanitization
  domain = domain.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
  
  // RDAP is the modern successor to WHOIS. 
  // We use rdap.org which redirects to the correct authoritative registry.
  const rdapUrl = `https://rdap.org/domain/${domain}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(rdapUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rdap+json',
        'User-Agent': 'Zentrion-Cyber-Suite/1.0 (WHOIS Recon)'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 404) {
        return Response.json({ error: 'Domain not found or not registered.' }, { status: 404 });
      }
      throw new Error(`RDAP returned status ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);

  } catch (err: any) {
    if (err.name === 'AbortError') {
      return Response.json({ error: 'RDAP query timed out.' }, { status: 504 });
    }
    return Response.json({ 
      error: 'Failed to fetch domain registration data.',
      details: err.message
    }, { status: 500 });
  }
}
