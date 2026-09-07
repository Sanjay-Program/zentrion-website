export async function onRequestGet({ request }: { request: Request }) {
  const urlParams = new URL(request.url).searchParams;
  let asn = urlParams.get('asn')?.trim();

  if (!asn) {
    return Response.json({ error: 'Please provide an ASN.' }, { status: 400 });
  }

  // Extract just the number if they prefixed with AS
  const cleanAsn = asn.replace(/^as/i, '');

  if (!/^\d+$/.test(cleanAsn)) {
    return Response.json({ error: 'Invalid ASN format. Must be a number.' }, { status: 400 });
  }

  // BGPView provides a free API for ASN data
  const apiUrl = `https://api.bgpview.io/asn/${cleanAsn}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Zentrion-Cyber-Suite/1.0 (ASN Lookup)'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 404 || res.status === 400) {
        return Response.json({ error: 'ASN not found in BGP database.' }, { status: 404 });
      }
      if (res.status === 429) {
         return Response.json({ error: 'Rate limit exceeded for BGP database. Try again later.' }, { status: 429 });
      }
      throw new Error(`API returned status ${res.status}`);
    }

    const data = await res.json();
    
    if (data.status !== 'ok' || !data.data) {
       return Response.json({ error: 'ASN data unavailable.' }, { status: 404 });
    }

    return Response.json(data.data);

  } catch (err: any) {
    if (err.name === 'AbortError') {
      return Response.json({ error: 'ASN lookup timed out.' }, { status: 504 });
    }
    return Response.json({ 
      error: 'Failed to fetch ASN data.',
      details: err.message
    }, { status: 500 });
  }
}
